import { UserDTO, ChatDTO, MessageDTO, ChatMessageDTO } from 'api';

export const transformUser = (data: UserDTO): User => {
	return {
		id: data.id,
		login: data.login,
		firstName: data.first_name,
		secondName: data.second_name,
		displayName: data.display_name,
		avatar: data.avatar,
		phone: data.phone,
		email: data.email,
	};
};

export const transformChat = (data: ChatDTO): Chat => {
	return {
		id: data.id,
		title: data.title,
		avatar: data.avatar,
		unreadCount: data.unread_count,
		lastMessage: transformMessage(data.last_message),
		createdBy: data.created_by,
	};
};

export const transformMessage = (data?: MessageDTO): Message | null => {
	return data
		? {
				user: transformUser(data.user),
				time: new Date(data.time),
				content: data.content,
		  }
		: null;
};

export const transformChatMessage = (data: ChatMessageDTO) => {
	return {
		id: data.id,
		chatId: data.chat_id,
		content: data.content,
		isRead: data.is_read,
		time: new Date(data.time),
		type: data.type,
		userId: data.user_id,
	};
};

export const transformChatId = (data: { id: number }) => {
	return {
		id: data.id,
	};
};
