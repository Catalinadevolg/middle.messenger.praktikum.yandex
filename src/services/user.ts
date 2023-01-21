import { Dispatch } from 'core';
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

export const changeAvatar = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: UserPayload
) => {
	dispatch({ isLoading: true });

	const response = await userAPI.changeAvatar(action);

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
};

export const changeInfo = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: UserPayload
) => {
	dispatch({ isLoading: true });

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
};

export const changePassword = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: PasswordPayload
) => {
	dispatch({ isLoading: true });

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
};
