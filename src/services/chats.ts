import type { Dispatch } from 'core';
import { DispatchStateHandler } from './types';
import { ChatDTO, chatsAPI, UserDTO } from 'api';
import { apiHasError, transformChat, transformUser, transformChatId } from 'utils';

type NewChatPayload = {
	title: string;
};

type ActionWithUserPayload = {
	users: string[];
	chatId: number;
};

export const getChats = async (dispatch: Dispatch<AppState>) => {
	dispatch({ isLoading: true });

	try {
		const response = await chatsAPI.getChats();

		if (apiHasError(response)) {
			dispatch({ isLoading: false, loginFormError: response.reason });
			return;
		}

		const chatList: Chat[] = [];
		(response as ChatDTO[]).forEach((chat) => {
			return chatList.push(transformChat(chat));
		});

		dispatch({
			isLoading: false,
			loginFormError: null,
			chats: chatList,
		});
	} catch (err) {
		dispatch({ isLoading: false });
		if (err instanceof ProgressEvent) {
			window.router.go('/error500');
		}
		console.error(err);
	}
};

export const createChat: DispatchStateHandler<NewChatPayload> = async (dispatch, state, action) => {
	dispatch({ isLoading: true });

	try {
		const response = await chatsAPI.createChat(action);

		if (apiHasError(response)) {
			dispatch({ isLoading: false, loginFormError: response.reason });
			return;
		}

		const responseChats = await chatsAPI.getChats();

		if (apiHasError(responseChats)) {
			dispatch({ isLoading: false, loginFormError: responseChats.reason });
			return;
		}

		const chatList: Chat[] = [];
		(responseChats as ChatDTO[]).forEach((chat) => {
			chatList.push(transformChat(chat));
		});

		const chatIndex = chatList.findIndex((chat) => chat.title === action.title);
		const createdBy = chatList[chatIndex].createdBy;

		dispatch({
			isLoading: false,
			loginFormError: null,
			chats: chatList,
			activeChat: {
				id: transformChatId(response as { id: number }).id,
				title: action.title,
				avatar: null,
				createdBy: createdBy,
			},
		});
	} catch (err) {
		dispatch({ isLoading: false });
		if (err instanceof ProgressEvent) {
			window.router.go('/error500');
		}
		console.error(err);
	}
};

export const deleteChat: DispatchStateHandler<number> = async (dispatch, state, action) => {
	dispatch({ isLoading: true });

	try {
		const response = await chatsAPI.deleteChat(action);
		console.log(response);

		if (apiHasError(response)) {
			dispatch({ isLoading: false, loginFormError: response.reason });
			return;
		}

		const responseChats = await chatsAPI.getChats();

		if (apiHasError(responseChats)) {
			dispatch({ isLoading: false, loginFormError: responseChats.reason });
			return;
		}

		const chatList: Chat[] = [];
		(responseChats as ChatDTO[]).forEach((chat) => {
			chatList.push(transformChat(chat));
		});

		dispatch({
			isLoading: false,
			loginFormError: null,
			chats: chatList,
			activeChat: null,
		});
	} catch (err) {
		dispatch({ isLoading: false });
		if (err instanceof ProgressEvent) {
			window.router.go('/error500');
		}
		console.error(err);
	}
};

export const getChatUsers: DispatchStateHandler<number> = async (dispatch, state, action) => {
	try {
		const response = await chatsAPI.getChatUsers(action);

		if (apiHasError(response)) {
			dispatch({ loginFormError: response.reason });
			return;
		}

		const userList: User[] = [];
		(response as UserDTO[]).forEach((user) => {
			userList.push(transformUser(user));
		});

		dispatch({
			loginFormError: null,
			users: userList,
		});
	} catch (err) {
		if (err instanceof ProgressEvent) {
			window.router.go('/error500');
		}
		console.error(err);
	}
};

export const addUser: DispatchStateHandler<ActionWithUserPayload> = async (
	dispatch,
	state,
	action
) => {
	dispatch({ isLoading: true });

	try {
		const response = await chatsAPI.addUser(action);

		if (apiHasError(response)) {
			dispatch({ isLoading: false, loginFormError: response.reason });
			return;
		}

		const responseUsers = await chatsAPI.getChatUsers(action.chatId);

		if (apiHasError(response)) {
			dispatch({ loginFormError: response.reason });
			return;
		}

		const userList: User[] = [];
		(responseUsers as UserDTO[]).forEach((user) => {
			userList.push(transformUser(user));
		});

		dispatch({
			isLoading: false,
			loginFormError: null,
			users: userList,
		});
	} catch (err) {
		dispatch({ isLoading: false });
		if (err instanceof ProgressEvent) {
			window.router.go('/error500');
		}
		console.error(err);
	}
};

export const deleteUser: DispatchStateHandler<ActionWithUserPayload> = async (
	dispatch,
	state,
	action
) => {
	dispatch({ isLoading: true });

	try {
		const response = await chatsAPI.deleteUser(action);

		if (apiHasError(response)) {
			dispatch({ isLoading: false, loginFormError: response.reason });
			return;
		}

		const responseUsers = await chatsAPI.getChatUsers(action.chatId);

		if (apiHasError(response)) {
			dispatch({ loginFormError: response.reason });
			return;
		}

		const userList: User[] = [];
		(responseUsers as UserDTO[]).forEach((user) => {
			userList.push(transformUser(user));
		});

		dispatch({
			isLoading: false,
			loginFormError: null,
			users: userList,
		});
	} catch (err) {
		dispatch({ isLoading: false });
		if (err instanceof ProgressEvent) {
			window.router.go('/error500');
		}
		console.error(err);
	}
};
