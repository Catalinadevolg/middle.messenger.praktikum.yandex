import { DispatchStateHandler } from './types';
import { logout } from 'services';
import { authAPI, UserDTO, userAPI } from 'api';
import { apiHasError, transformUser } from 'utils';

type UserPayload = {
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
};

type PasswordPayload = {
	oldPassword: string;
	newPassword: string;
};

export const changeAvatar: DispatchStateHandler<File> = async (dispatch, _state, action) => {
	dispatch({ isLoading: true });

	try {
		const response = await userAPI.changeAvatar(action);

		if (apiHasError(response)) {
			dispatch({ isLoading: false, loginFormError: response.reason });
			return;
		}

		dispatch({ isLoading: false, user: transformUser(response as UserDTO) });
	} catch (err) {
		dispatch({ isLoading: false });
		if (err instanceof ProgressEvent) {
			window.router.go('/error500');
		}
		console.error(err);
	}
};

export const changeInfo: DispatchStateHandler<UserPayload> = async (dispatch, _state, action) => {
	dispatch({ isLoading: true });

	try {
		const response = await userAPI.changeInfo(action);

		if (apiHasError(response)) {
			dispatch({ isLoading: false, loginFormError: response.reason });
			return;
		}

		const responseUser = await authAPI.me();

		dispatch({ isLoading: false, loginFormError: null });

		if (apiHasError(responseUser)) {
			dispatch(logout);
			return;
		}

		dispatch({ isLoading: false, user: transformUser(responseUser as UserDTO) });
	} catch (err) {
		dispatch({ isLoading: false });
		if (err instanceof ProgressEvent) {
			window.router.go('/error500');
		}
		console.error(err);
	}
};

export const changePassword: DispatchStateHandler<PasswordPayload> = async (
	dispatch,
	_state,
	action
) => {
	dispatch({ isLoading: true });

	try {
		const response = await userAPI.changePassword(action);

		if (apiHasError(response)) {
			dispatch({ isLoading: false, loginFormError: response.reason });
			return;
		}

		const responseUser = await authAPI.me();

		dispatch({ isLoading: false, loginFormError: null });

		if (apiHasError(responseUser)) {
			dispatch(logout);
			return;
		}

		dispatch({
			isLoading: false,
			user: transformUser(responseUser as UserDTO),
			loginFormError: 'Пароль успешно изменён',
		});

		setTimeout(() => {
			dispatch({ loginFormError: null });
			window.router.go('/profile');
		}, 1000);
	} catch (err) {
		dispatch({ isLoading: false });
		if (err instanceof ProgressEvent) {
			window.router.go('/error500');
		}
		console.error(err);
	}
};
