import { Dispatch } from 'core';
import { DispatchStateHandler } from './types';
import { authAPI, UserDTO } from 'api';
import { apiHasError, transformUser } from 'utils';

type SigninPayload = {
	login: string;
	password: string;
};

type SignupPayload = {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
};

export const logout = async (dispatch: Dispatch<AppState>) => {
	dispatch({ isLoading: true });

	try {
		await authAPI.logout();

		dispatch({ isLoading: false, user: null });

		window.router.go('/sign-in');
	} catch (err) {
		dispatch({ isLoading: false });
		console.error(err);
	}
};

export const signin: DispatchStateHandler<SigninPayload> = async (dispatch, state, action) => {
	dispatch({ isLoading: true });

	try {
		const response = await authAPI.signin(action);

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

		dispatch({ user: transformUser(responseUser as UserDTO) });

		window.router.go('/messenger');
	} catch (err) {
		dispatch({ isLoading: false });
		console.error(err);
	}
};

export const signup: DispatchStateHandler<SignupPayload> = async (dispatch, state, action) => {
	dispatch({ isLoading: true });

	try {
		const response = await authAPI.signup(action);

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

		dispatch({ user: transformUser(responseUser as UserDTO) });

		window.router.go('/messenger');
	} catch (err) {
		dispatch({ isLoading: false });
		console.error(err);
	}
};
