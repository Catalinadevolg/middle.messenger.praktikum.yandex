import { Store } from 'core/store';
import { renderDOM } from 'core/renderDOM';
import { CoreRouter } from 'core/router/coreRouter';
import { getScreenComponent, Screens } from './utils/screenList';

const routes = [
	{
		path: '/',
		block: Screens.Messenger,
		shouldAuthorized: true,
	},
	{
		path: '/sign-in',
		block: Screens.SignIn,
		shouldAuthorized: false,
	},
	{
		path: '/sign-up',
		block: Screens.SignUp,
		shouldAuthorized: false,
	},
	{
		path: '/error404',
		block: Screens.Error404,
		shouldAuthorized: false,
	},
	{
		path: '/error500',
		block: Screens.Error500,
		shouldAuthorized: true,
	},
	{
		path: '/profile',
		block: Screens.Profile,
		shouldAuthorized: true,
	},
	{
		path: '/password',
		block: Screens.Password,
		shouldAuthorized: true,
	},
	{
		path: '/messenger',
		block: Screens.Messenger,
		shouldAuthorized: true,
	},
	{
		path: '*',
		block: Screens.Error404,
		shouldAuthorized: false,
	},
];

export function initRouter(router: CoreRouter, store: Store<AppState>) {
	routes.forEach((route) => {
		router.use(route.path, () => {
			const isAuthorized = Boolean(store.getState().user);
			const currentScreen = Boolean(store.getState().screen);

			if (isAuthorized || !route.shouldAuthorized) {
				store.dispatch({ screen: route.block });
				return;
			}

			if (!currentScreen) {
				store.dispatch({ screen: Screens.SignIn });
			}
		});
	});

	/**
	 * Глобальный слушатель изменений в сторе
	 * для переключения активного экрана
	 */
	store.on('changed', (prevState, nextState) => {
		if (!prevState.appIsInited && nextState.appIsInited) {
			router.start();
		}

		if (prevState.screen !== nextState.screen) {
			const Page = getScreenComponent(nextState.screen);
			renderDOM(new Page({}));
			document.title = `App / ${Page.componentName}`;
		}
	});
}
