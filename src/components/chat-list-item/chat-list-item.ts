import Block from 'core/Block';

interface ChatListItemProps {
	className?: string;
	userAvatar: string;
	userName: string;
	lastMessage: string;
	lastMessageDate: Date;
	newMessagesCount?: number;
}
export class ChatListItem extends Block {
	static componentName = 'ChatListItem';

	constructor({ ...props }: ChatListItemProps) {
		super({ ...props });
	}

	render() {
		return `
			<li class="chat-list-item {{className}}">
				<div class="chat-list-item__photo">
						<img src="{{userAvatar}}" alt="avatar" class="photo-img">
				</div>
				<div class="chat-list-item__info">
						<p class="info-name">{{userName}}</p>
						<p class="info-last-message"><span class="last-message">{{lastMessage}}</span></p>
				</div>
				<div class="chat-list-item__data">
						<time class="data-date">{{lastMessageDate}}</time>
						{{#if newMessagesCount }}
							<p class="data-count">{{newMessagesCount}}</p>
						{{/if}}
				</div>
			</li>
		`;
	}
}
