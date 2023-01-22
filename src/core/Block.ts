import { EventBus } from './EventBus';
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import { isEqual } from 'utils/isEqual';

type Events = Values<typeof Block.EVENTS>;

export type BlockProps = Record<string, unknown>;
export interface BlockClass<P extends Record<string, unknown>> extends Function {
	new (props: P): Block<P>;
	componentName?: string;
}

// @ts-ignore
export class Block<P extends BlockProps = BlockProps> {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_CWU: 'flow:component-will-unmount',
		FLOW_RENDER: 'flow:render',
	} as const;

	public id = nanoid(6);
	protected _element: Nullable<HTMLElement> = null;

	protected props: P;
	protected children: { [id: string]: Block } = {};
	private eventBus: () => EventBus<Events>;

	protected state: any = {};
	protected refs: { [key: string]: Block } = {};

	public static componentName?: string;

	/** JSDoc
	 * @param {string} tagName
	 * @param {Object} props
	 *
	 * @returns {void}
	 */
	public constructor(props?: P) {
		const eventBus = new EventBus<Events>();

		this.getStateFromProps(props);

		this.props = this._makePropsProxy(props || ({} as P));
		this.state = this._makePropsProxy(this.state);

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	/**
	 * Хелпер, который проверяет, находится ли элемент в DOM дереве
	 * И есть нет, триггерит событие COMPONENT_WILL_UNMOUNT
	 */
	_checkInDom() {
		const elementInDOM = document.body.contains(this._element);

		if (elementInDOM) {
			setTimeout(() => this._checkInDom(), 1000);
			return;
		}

		this.eventBus().emit(Block.EVENTS.FLOW_CWU);
	}

	_registerEvents(eventBus: EventBus<Events>) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	_createResources() {
		this._element = this._createDocumentElement('div');
	}

	protected getStateFromProps(_props: P | undefined): void {
		this.state = {};
	}

	init() {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	_componentDidMount(props: P) {
		this._checkInDom();

		this.componentDidMount(props);
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidMount(_props: P) {}

	_componentWillUnmount() {
		this.eventBus().destroy();
		this.componentWillUnmount();
	}

	componentWillUnmount() {}

	_componentDidUpdate(oldProps: P, newProps: P) {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (response) {
			return;
		}

		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidUpdate(oldProps: P, newProps: P) {
		return isEqual(oldProps, newProps);
	}

	setProps = (nextProps: Partial<P>) => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	getProps = () => this.props;

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

		const fragment = this.compile(templateString, { ...this.state, ...this.props });

		const newElement = fragment.firstElementChild as HTMLElement;

		this._removeEvents();

		if (this._element) {
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

	compile(templateString: string, context: any): DocumentFragment {
		const fragment = document.createElement('template');

		/**
		 * Рендерим шаблон
		 */
		const template = Handlebars.compile(templateString);

		const htmlString = template({
			...context,
			children: this.children,
			refs: this.refs,
		});

		fragment.innerHTML = htmlString;
		// console.log(fragment);
		/**
		 * Заменяем заглушки на компоненты
		 */
		Object.entries(this.children).forEach(([id, child]) => {
			/**
			 * Ищем заглушку по id
			 */
			const stub = fragment.content.querySelector(`[data-id="id-${id}"]`);

			if (!stub) {
				return;
			}

			/**
			 * Заменяем заглушку на component._element
			 */
			const content = child.getContent();
			stub.replaceWith(content);
		});

		/**
		 * Возвращаем фрагмент
		 */
		return fragment.content;
	}

	show() {
		this.getContent()!.style.display = 'block';
	}

	hide() {
		this.getContent()!.style.display = 'none';
	}
}
