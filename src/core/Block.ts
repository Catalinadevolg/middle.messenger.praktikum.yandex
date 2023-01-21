import EventBus from './EventBus';
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';

// @ts-ignore
class Block<P extends Record<string, any>> {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	};

	public id = nanoid(6);
	protected _element: Nullable<HTMLElement> = null;
	// @ts-ignore
	private _meta: { props: P };

	protected props: P;
	protected children: Record<string, Block<P>>;
	private eventBus: () => EventBus;

	protected state: any = {};
	protected refs: { [key: string]: Block<P> } = {};

	/** JSDoc
	 * @param {string} tagName
	 * @param {Object} props
	 *
	 * @returns {void}
	 */
	constructor(propsAndChildren: P = {} as P) {
		const eventBus = new EventBus();

		const { props, children } = this.getPropsAndChildren(propsAndChildren);

		this.children = children;

		this._meta = {
			props,
		};

		this.getStateFromProps(props);

		this.props = this._makePropsProxy(props);
		this.state = this._makePropsProxy(this.state);

		this.initChildren();

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	getPropsAndChildren(propsAndChildren: P) {
		const children: Record<Keys<P>, Block<P>> = {} as Record<Keys<P>, Block<P>>;
		const props: P = {} as P;

		(Object.entries(propsAndChildren) as Array<[Keys<P>, any]>).forEach(([key, value]) => {
			if (value instanceof Block) {
				children[key] = value;
			} else {
				props[key] = value;
			}
		});

		return { props, children };
	}

	protected initChildren() {}

	_registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	_createResources() {
		this._element = this._createDocumentElement('div');
	}

	protected getStateFromProps(_props: P): void {
		this.state = {};
	}

	init() {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	_componentDidMount() {
		this.componentDidMount();
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidMount() {}

	dispatchComponentDidMoun() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	_componentDidUpdate(oldProps: any, newProps: any) {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (response) {
			this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
		}
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidUpdate(_oldProps: any, _newProps: any) {
		return true;
	}

	setProps = (nextProps: P) => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	setState = (nextState: any) => {
		if (!nextState) {
			return;
		}

		Object.assign(this.state, nextState);
	};

	get element() {
		return this._element;
	}

	_render() {
		const templateString = this.render();

		const fragment = this.compile(templateString, { ...this.props });

		const newElement = fragment.firstElementChild as HTMLElement;

		if (this._element) {
			this._removeEvents();
			this._element.replaceWith(newElement);
		}

		this._element = newElement;

		this._addEvents();
	}

	// Может переопределять пользователь, необязательно трогать
	protected render(): string {
		return '';
	}

	getContent(): HTMLElement {
		// Хак, чтобы вызвать CDM только после добавления в DOM
		if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
			setTimeout(() => {
				if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
					this.eventBus().emit(Block.EVENTS.FLOW_CDM);
				}
			}, 100);
		}

		return this.element!;
	}

	_makePropsProxy(props: P): any {
		// Можно и так передать this
		// Такой способ больше не применяется с приходом ES6+
		const self = this;

		return new Proxy(props as unknown as object, {
			get(target: Record<string, unknown>, prop: string) {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target: Record<string, unknown>, prop: string, value: unknown) {
				const oldProps = { ...target };
				target[prop] = value;

				self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
				return true;
			},
			deleteProperty() {
				throw new Error('Нет доступа');
			},
		});
	}

	_createDocumentElement(tagName: string) {
		return document.createElement(tagName);
	}

	_removeEvents() {
		const events: Record<string, () => void> = (this.props as any).events;

		if (!events || !this._element) {
			return;
		}

		Object.entries(events).forEach(([event, listener]) => {
			this._element!.removeEventListener(event, listener);
		});
	}

	_addEvents() {
		const events: Record<string, () => void> = (this.props as any).events;

		if (!events || !this._element) {
			return;
		}

		Object.entries(events).forEach(([event, listener]) => {
			this._element!.addEventListener(event, listener);
		});
	}

	// _createDocumentElement(tagName: string): HTMLElement {
	// 	// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
	// 	return document.createElement(tagName);
	// }

	compile(templateString: string, context: any): DocumentFragment {
		const fragment = document.createElement('template');

		Object.entries(this.children).forEach(([key, child]) => {
			if (Array.isArray(child)) {
				context[key] = child.map((ch) => `<div data-id="id-${ch.id}"></div>`);

				return;
			}

			context[key] = `<div data-id="id-${child.id}"></div>`;
		});

		const template = Handlebars.compile(templateString);

		const htmlString = template({
			...context,
			children: this.children,
			refs: this.refs,
		});

		fragment.innerHTML = htmlString;

		Object.entries(this.children).forEach(([_key, child]) => {
			const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);

			if (!stub) {
				return;
			}

			stub.replaceWith(child.getContent()!);
		});

		return fragment.content;
	}

	show() {
		this.getContent()!.style.display = 'block';
	}

	hide() {
		this.getContent()!.style.display = 'none';
	}
}

export default Block;
