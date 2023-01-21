import { Dispatch } from 'core';
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
};

export const createChat = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: NewChatPayload
) => {
	dispatch({ isLoading: true });

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

	dispatch({
		isLoading: false,
		loginFormError: null,
		chats: chatList,
		activeChat: {
			id: transformChatId(response as { id: number }).id,
			title: action.title,
			avatar: null,
		},
	});
};

export const getChatUsers = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: number
) => {
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
};

export const addUser = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: ActionWithUserPayload
) => {
	dispatch({ isLoading: true });

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
};

export const deleteUser = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: ActionWithUserPayload
) => {
	dispatch({ isLoading: true });

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
};
