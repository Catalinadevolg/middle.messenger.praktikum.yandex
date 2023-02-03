export type APIError = {
	reason: string;
};

export type UserDTO = {
	id: number;
	login: string;
	first_name: string;
	second_name: string;
	display_name: string;
	avatar: string;
	phone: string;
	email: string;
};

export type ChatDTO = {
	id: number;
	title: string;
	avatar: string;
	unread_count: number;
	last_message?: MessageDTO;
	created_by: number;
};

export type MessageDTO = {
	user: UserDTO;
	time: string;
	content: string;
};

export type ChatMessageDTO = {
	id: number;
	user_id: number;
	chat_id: number;
	time: string;
	type: string;
	content: string;
	is_read: boolean;
};
