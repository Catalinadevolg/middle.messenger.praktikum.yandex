import { waitFor } from '@testing-library/dom';
import { PathRouter } from 'core/router/pathRouter';
import { step } from 'tests/renderUtils';

describe('PathRouter', () => {
	it('should move on history', async () => {
		const router = new PathRouter();
		const mock = jest.fn(() => console.log('push route to history'));
		const test = jest.fn(() => console.log('push route 2 to history'));

		await step('should init routes and push route to history', () => {
			router.use('/mock', mock);
			router.use('/test', test);

			router.go('/mock');

			expect(router.getRoutes()).toHaveProperty('/mock');
			expect(router.getRoutes()).toHaveProperty('/test');
			expect(window.history.length).toEqual(2);
			expect(mock).toBeCalledTimes(1);
		});

		await step('should go back', () => {
			router.go('/test');

			router.back();

			expect(window.history.length).toEqual(3);
			expect(test).toBeCalledTimes(1);
			waitFor(() => expect(document.location.pathname).toStrictEqual('/mock'));
		});

		await step('should go forward', () => {
			router.forward();

			expect(document.location.pathname).toStrictEqual('/test');
		});
	});
	it('should call * route s callback after user enter none exictend path', () => {
		const router = new PathRouter();
		const mock = jest.fn(() => console.log('this route is not in routes list'));

		router.use('*', mock);

		router.go('/test');

		expect(mock).toBeCalledTimes(1);
		expect(document.location.pathname).toStrictEqual('/test');
	});
});
