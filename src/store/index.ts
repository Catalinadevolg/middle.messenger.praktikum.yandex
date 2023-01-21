import { Store } from 'core';

export const defaultState: AppState = {
	appIsInited: false,
	screen: null,
	isLoading: false,
	loginFormError: null,
	user: null,
	chats: null,
	users: null,
	messages: null,
	socket: null,
	activeChat: null,
};

// export const store = new Store(defaultState);
