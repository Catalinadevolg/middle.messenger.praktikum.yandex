import { Block, BlockProps, Store } from 'core';
import { withStore } from 'utils';
import { getChatUsers } from 'services';
import Socket from 'services/socket';

import defaultAvatar from 'assets/empty-avatar.png';

type ChatListProps = BlockProps & {
	store: Store<AppState>;
	onClickChat?: (e: FocusEvent) => void;
};
class ChatList extends Block<ChatListProps> {
	static componentName = 'ChatList';

	constructor(props: ChatListProps) {
		super(props);

		this.setProps({
			onClickChat: (e: FocusEvent) => this.onClickChat(e),
		});
	}

	async onClickChat(e: FocusEvent) {
		const target = e.target as HTMLElement;
		const selectedChat = target.closest('li');

		if (selectedChat) {
			// Передаём в Store (далее в chat-box) информацию об открывающемся чате
			const chatDataId = selectedChat.getAttribute('data-id');
			const chatID = Number(chatDataId!.split('-')[1]);

			const chats = this.props.store.getState().chats;
			const index = chats?.findIndex((chat) => chat.id === chatID);
			const chatInfo = chats![index!];

			const chatTitle = chatInfo.title;
			const avatar = chatInfo.avatar;
			const createdBy = chatInfo.createdBy;

			console.log('Загружаем чат');
			this.props.store.dispatch({
				activeChat: {
					id: chatID,
					title: chatTitle,
					avatar: avatar,
					createdBy: createdBy,
				},
			});

			console.log('Загружаем пользователей');
			this.props.store.dispatch(getChatUsers, chatID);

			// Подключаемся к Socket
			const userID = this.props.store.getState().user!.id;
			await Socket.connect(userID, chatID);
		}
	}

	render() {
		const state = this.props.store.getState();
		const chats = state.chats;

		return `
			<div class="chat-list__list">
				${
					chats
						? (chats as Chat[])
								.map((chat: Chat) => {
									return `
										{{{ChatListItem
											blueClass="${chat.id === state.activeChat?.id ? 'item_active' : ''}"
											dataID="${chat.id}"
											userName="${chat.title}"
											userAvatar="${chat.avatar ? chat.avatar : defaultAvatar}"
											lastMessage="${chat.lastMessage ? chat.lastMessage.content : ''}"
											lastMessageDate="${chat.lastMessage ? chat.lastMessage.time.toLocaleTimeString() : ''}"
											newMessagesCount="${chat.unreadCount ? chat.unreadCount : ''}"
											onClick=onClickChat
										}}}`;
								})
								.join('')
						: ''
				}
				<div class="chat-list__line"></div>
			</div>
		`;
	}
}

const ComposedChatList = withStore(ChatList);

export { ComposedChatList as ChatList };
