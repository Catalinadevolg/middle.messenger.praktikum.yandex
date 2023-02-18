import { setupServer } from 'msw/node';
import { rest } from 'msw';

const handlers = [
	rest.post('https://ya-praktikum.tech/api/v2/auth/logout', (_req, res, ctx) => {
		console.log('Call logout endpoind');

		return res(ctx.status(200));
	}),
	rest.post('https://ya-praktikum.tech/api/v2/auth/signin', (_req, res, ctx) => {
		console.log('Signin');

		sessionStorage.setItem('is-authenticated', 'true');

		return res(ctx.status(200));
	}),
	rest.get('https://ya-praktikum.tech/api/v2/auth/user', (_req, res, ctx) => {
		const isAuthenticated = sessionStorage.getItem('is-authenticated');
		if (!isAuthenticated) {
			return res(
				ctx.status(403),
				ctx.json({
					errorMessage: 'Not authorized',
				})
			);
		}

		return res(
			ctx.status(200),
			ctx.json({
				userName: 'ruslan',
			})
		);
	}),
	rest.put('https://ya-praktikum.tech/api/v2/user/profile', (_req, res, ctx) => {
		const isAuthenticated = sessionStorage.getItem('is-authenticated');
		if (!isAuthenticated) {
			return res(
				ctx.status(403),
				ctx.json({
					errorMessage: 'Not authorized',
				})
			);
		}

		return res(
			ctx.status(200),
			ctx.json({
				userName: 'ruslan24',
			})
		);
	}),
];

export const server = setupServer(...handlers);
