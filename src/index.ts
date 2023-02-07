import 'regenerator-runtime/runtime';

import { registerComponent } from 'core/registerComponent';
import { defaultState } from './store';
import { Store } from 'core/store';
import { PathRouter } from 'core/router/pathRouter';
import { CoreRouter } from 'core/router/coreRouter';
import { initRouter } from './router';
import { initApp } from './services/initApp';

import './styles/main.css';

import * as components from 'components';

Object.values(components).forEach((Component: any) => {
	registerComponent(Component);
});

declare global {
	interface Window {
		store: Store<AppState>;
		router: CoreRouter;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const store = new Store<AppState>(defaultState);
	const router = new PathRouter();

	/**
	 * Помещаем роутер и стор в глобальную область для доступа в хоках with*
	 * @warning Не использовать такой способ на реальный проектах
	 */
	window.router = router;
	window.store = store;

	/**
	 * Инициализируем роутер
	 */
	initRouter(router, store);

	/**
	 * Загружаем данные для приложения
	 */
	store.dispatch(initApp);
});
