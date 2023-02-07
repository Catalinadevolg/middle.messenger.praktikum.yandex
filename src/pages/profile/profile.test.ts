import { renderBlock, step } from 'tests/renderUtils';
import { ProfilePage } from './profile';
import { getByTestId, queryByTestId, waitFor } from '@testing-library/dom';

const USER_MOCK = {
	avatar: '',
	displayName: '',
	email: 'kate@kate.com',
	firstName: 'Kate',
	id: 1111,
	login: 'kate',
	phone: '89998765432',
	secondName: 'Etak',
};

describe('pages/Profile', () => {
	it('should logout from profile and redirect to SigninPage', async () => {
		await step('render profile page to dom', () => {
			renderBlock({
				Block: ProfilePage,
				props: {},
				state: {
					screen: 'profile',
					appIsInited: true,
					user: USER_MOCK,
				},
			});
		});

		await step('click to logout button', () => {
			const button = getByTestId(document.body, 'logout-btn');

			button.click();
		});

		await step('wait openning sigin page', async () => {
			await waitFor(() =>
				expect(queryByTestId(document.body, 'signin-screen')).toBeInTheDocument()
			);
		});

		await step('check state', async () => {
			expect(window.store.getState().screen).toEqual('sign-in');
			expect(window.store.getState().user).toEqual(null);
		});
	});

	it('should redirect on ChangePasswordPage', async () => {
		await step('render profile page to dom', () => {
			renderBlock({
				Block: ProfilePage,
				props: {},
				state: {
					screen: 'profile',
					appIsInited: true,
					user: USER_MOCK,
				},
			});
		});

		await step('click to button', () => {
			const button = getByTestId(document.body, 'to-password-btn');

			button.click();
		});

		await step('wait openning password page', async () => {
			await waitFor(() =>
				expect(queryByTestId(document.body, 'password-screen')).toBeInTheDocument()
			);
		});

		await step('check state', async () => {
			expect(window.store.getState().screen).toEqual('password');
		});
	});
});
