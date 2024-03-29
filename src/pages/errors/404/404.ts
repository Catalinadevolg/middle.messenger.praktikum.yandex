import { Block, CoreRouter, Store } from 'core';
import { withRouter, withStore } from 'utils';

type Error404PageProps = {
	router: CoreRouter;
	store: Store<AppState>;
	toMessenger?: () => void;
};

class Error404Page extends Block<Error404PageProps> {
	static componentName = 'Error404Page';

	constructor(props: Error404PageProps) {
		super(props);

		this.setProps({
			toMessenger: () => this.toMessenger(),
		});
	}

	componentDidUpdate() {
		return window.store.getState().screen === 'error404';
	}

	toMessenger() {
		this.props.router.go('/messenger');
	}

	render() {
		return `
		<main class="error-page">
			<p class="error-page__title">404</p>
			<p class="error-page__text">Не туда попали</p>
			{{{Link
				linkClass="error-page__link"
				text="Назад к чатам"
				onClick=toMessenger
			}}}
		</main>
		`;
	}
}

const ComposedError404 = withRouter(
	withStore<Error404PageProps, { appIsInited: boolean; screen: AppState }>(
		Error404Page,
		(state: AppState) => ({
			appIsInited: state.appIsInited,
			screen: state.screen,
		})
	)
);

export { ComposedError404 as Error404Page };
