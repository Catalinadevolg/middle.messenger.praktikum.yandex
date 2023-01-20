import HTTPTransport from 'utils/httptransport';

type NewChatRequestData = {
	title: string;
};

type ActionWithUserRequestData = {
	users: Array<string>;
	chatId: number;
};

export const chatsAPI = {
	getChats: () => HTTPTransport.get('/chats'),

	createChat: (data: NewChatRequestData) => HTTPTransport.post('/chats', { data }),

	getChatUsers: (data: number) => HTTPTransport.get(`/chats/${data}/users`),

	getToken: (chatID: number) => HTTPTransport.post(`/chats/token/${chatID}`),

	addUser: (data: ActionWithUserRequestData) => HTTPTransport.put('/chats/users', { data }),

	deleteUser: (data: ActionWithUserRequestData) => HTTPTransport.delete('/chats/users', { data }),

	searchUser: (data: string) => HTTPTransport.post('/user/search', { data }),
};
