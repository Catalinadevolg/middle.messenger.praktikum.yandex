declare global {
	export type Nullable<T> = T | null;

	export type Keys<T extends Record<string, unknown>> = keyof T;
	export type Values<T extends Record<string, unknown>> = T[Keys<T>];

	export type Indexed = { (key: string): any };

	export type AppState = {
		appIsInited: boolean;
		screen: Screens | null;
		isLoading: boolean;
		loginFormError: Nullable<string>;
		user: Nullable<User>;
		chats: Nullable<Chat[]>;
		users: Nullable<User[]>;
		messages: Nullable<ChatMessage[]>;
		activeChat: {
			id: Nullable<number>;
			title: Nullable<string>;
			avatar: Nullable<string>;
			createdBy: Nullable<number>;
		} | null;
	};

	export type User = {
		id: number;
		login: string;
		firstName: string;
		secondName: string;
		displayName: string;
		avatar: string;
		phone: string;
		email: string;
	};

	export type Chat = {
		id: number;
		title: string;
		avatar: string;
		unreadCount: number;
		lastMessage?: Message | null;
		createdBy: number;
	};

	export type Message = {
		user: User<Omit<User, 'id'>>;
		time: Date;
		content: string;
	};

	export type ChatMessage = {
		id: number;
		userId: number;
		chatId: number;
		time: Date;
		type: string;
		content: string;
		isRead: boolean;
	};
}

export {};
