import { BlockClass, Store } from 'core';
// import { store } from './../store';
// import { isEqual } from './isEqual';

type WithStateProps = { store: Store<AppState> };

export function withStore<P extends WithStateProps>(WrappedBlock: BlockClass<P>) {
	// @ts-expect-error No base constructor has the specified
	return class extends WrappedBlock<P> {
		public static componentName = WrappedBlock.componentName || WrappedBlock.name;

		constructor(props: P) {
			super({ ...props, store: window.store });
		}

		__onChangeStoreCallback = () => {
			/**
			 * TODO: проверить что стор реально обновлен (взять утилиту из теории)
			 * и прокидывать не целый стор, а необходимые поля
			 * с помощью метода mapStateToProps
			 */
			// @ts-expect-error this is not typed
			this.setProps({ ...this.props, store: window.store });
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

// Попытка # 2 сделать HOC с указанием пропсов

// export function withStore2<P extends WithStateProps>(
// 	mapStateToProps: (state: Partial<AppState>) => Partial<AppState>
// ) {
// 	return function (WrappedBlock: BlockClass<P>) {
// 		// @ts-expect-error No base constructor has the specified
// 		return class extends WrappedBlock<P> {
// 			public static componentName = WrappedBlock.componentName || WrappedBlock.name;

// 			constructor(props: P) {
// 				super({ ...props, ...mapStateToProps(window.store.getState()) });
// 			}

// 			__onChangeStoreCallback = () => {
// 				/**
// 				 * TODO: проверить что стор реально обновлен (взять утилиту из теории)
// 				 * и прокидывать не целый стор, а необходимые поля
// 				 * с помощью метода mapStateToProps
// 				 */
// 				// @ts-expect-error this is not typed
// 				this.setProps({ ...this.props, store: window.store });
// 			};

// 			componentDidMount(props: P) {
// 				super.componentDidMount(props);
// 				window.store.on('changed', this.__onChangeStoreCallback);
// 			}

// 			componentWillUnmount() {
// 				super.componentWillUnmount();
// 				window.store.off('changed', this.__onChangeStoreCallback);
// 			}
// 		};
// 	};
// }

// export const withUser = withStore2((state) => ({ user: state.user }));
// export const withStore = withStore2((state) => ({
// 	appIsInited: state.appIsInited,
// 	screen: state.screen,
// 	isLoading: state.isLoading,
// 	loginFormError: state.loginFormError,
// 	user: state.user,
// 	chats: state.chats,
// 	users: state.users,
// 	messages: state.messages,
// 	socket: state.socket,
// 	activeChat: state.activeChat,
// }));

// Попытка сделать HOC с указанием пропсов

// export function withStore<P extends WithStateProps>(
// 	mapStateToProps: (state: Partial<AppState>) => Partial<AppState>
// ) {
// 	return function (WrappedBlock: BlockClass<P>) {
// 		// @ts-expect-error No base constructor has the specified
// 		return class extends WrappedBlock<P> {
// 			constructor(props: P) {
// 				let oldState = mapStateToProps(store.getState());
// 				super({ ...props, ...mapStateToProps(store.getState()) });

// 				const __onChangeStoreCallback = () => {
// 					const newState = mapStateToProps(store.getState());

// 					if (!isEqual(oldState, newState)) {
// 						// @ts-expect-error this is not typed
// 						this.setProps({ ...this.props, newState });
// 					}

// 					oldState = newState;
// 				};
// 				store.on('change', __onChangeStoreCallback);

// 				// store.off('changed', __onChangeStoreCallback);
// 			}
// 		} as BlockClass<Omit<P, 'store'>>;
// 	};
// }

// export const withUser = withStore((state) => ({ user: state.user }));
// export const withIsLoading = withStore((state) => ({ isLoading: state.isLoading }));
// export const withAllState = withStore((state) => ({
// 	appIsInited: state.appIsInited,
// 	screen: state.screen,
// 	isLoading: state.isLoading,
// 	loginFormError: state.loginFormError,
// 	user: state.user,
// 	chats: state.chats,
// 	users: state.users,
// 	messages: state.messages,
// 	socket: state.socket,
// 	activeChat: state.activeChat,
// }));
