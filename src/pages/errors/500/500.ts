import { Block, CoreRouter, Store } from 'core';
import { withRouter, withStore } from 'utils';

type Error500PageProps = {
	router: CoreRouter;
	store: Store<AppState>;
	toMessenger?: () => void;
};

class Error500Page extends Block<Error500PageProps> {
	static componentName = 'Error500Page';

	constructor(props: Error500PageProps) {
		super(props);

		this.setProps({
			toMessenger: () => this.toMessenger(),
		});
	}

	componentDidUpdate() {
		return window.store.getState().screen === 'error404';
	}

	toMessenger() {
		this.props.router.go('/error500');
	}

	render() {
		return `
		<main class="error-page">
			<p class="error-page__title">500</p>
			<p class="error-page__text">Мы уже фиксим</p>
			{{{Link
				linkClass="error-page__link"
				text="Назад к чатам"
				onClick=toMessenger
			}}}
		</main>
		`;
	}
}

const ComposedError500 = withRouter(
	withStore<Error500PageProps, { appIsInited: boolean; screen: AppState }>(
		Error500Page,
		(state: AppState) => ({
			appIsInited: state.appIsInited,
			screen: state.screen,
		})
	)
);

export { ComposedError500 as Error500Page };
