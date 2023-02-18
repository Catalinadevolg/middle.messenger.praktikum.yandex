import { BlockClass, renderDOM, registerComponent, Store } from 'core';
import { defaultState } from '../store';

import { MockedPathRouter } from 'tests/mockedPathRouter';
import { sleep } from 'utils/sleep';
import { initRouter } from '../router';
import * as components from 'components';

type RenderBlockParams<T extends Record<string, unknown>> = {
	Block: BlockClass<T>;
	props: T;
	state?: Partial<AppState>;
};

export async function renderBlock<T extends Record<string, unknown>>({
	Block,
	props,
	state = defaultState,
}: RenderBlockParams<T>) {
	Object.values(components).forEach((Component: any) => {
		registerComponent(Component);
	});

	const store = new Store<AppState>({ ...defaultState, ...state });
	const router = new MockedPathRouter();

	window.router = router;
	window.store = store;

	document.body.innerHTML = '<div id="app"></div>';

	// @ts-ignore
	renderDOM(new Block(props as T));

	initRouter(router, store);

	await sleep();
}

export async function step(name: string, callback: () => void) {
	console.log(`Step: ${name}`);
	await callback();
}
