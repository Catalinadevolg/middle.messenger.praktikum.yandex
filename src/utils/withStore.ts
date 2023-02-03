import { BlockClass, Store } from 'core';
import { isEqual, PlainObject } from './isEqual';

type WithStateProps = { store: Store<AppState> };

type mapStateToProps<MappedProps> = (state: AppState) => MappedProps;

export function withStore<
	P extends WithStateProps,
	MappedProps extends PlainObject<any> = Partial<AppState>
>(WrappedBlock: BlockClass<P>, mapStateToProps?: mapStateToProps<MappedProps>) {
	// @ts-expect-error No base constructor has the specified
	return class extends WrappedBlock<P> {
		public static componentName = WrappedBlock.componentName || WrappedBlock.name;

		constructor(props: P) {
			super({ ...props, ...mapStateToProps!(window.store.getState()) });
		}

		__onChangeStoreCallback = (prevState: AppState, nextState: AppState) => {
			if (typeof mapStateToProps === 'function') {
				const prevPropsFromState = mapStateToProps(prevState);
				const nextPropsFromState = mapStateToProps(nextState);

				if (!isEqual(prevPropsFromState, nextPropsFromState)) {
					// @ts-expect-error this is not typed
					this.setProps(nextPropsFromState);
				}

				return;
			}
		};

		componentDidMount(props: P) {
			super.componentDidMount(props);
			window.store.on('changed', this.__onChangeStoreCallback);
		}

		componentWillUnmount() {
			super.componentWillUnmount();
			window.store.off('changed', this.__onChangeStoreCallback);
		}
	} as BlockClass<Omit<P, 'store'>>;
}
