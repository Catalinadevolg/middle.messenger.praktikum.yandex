import { Block, BlockProps } from 'core';

type ChatListItemProps = BlockProps & {
	blueClass: string;
	dataID: number;
	userAvatar?: string;
	userName?: string;
	lastMessage?: string;
	lastMessageDate?: Date;
	newMessagesCount?: number;
	onClick?: () => void;
};
export class ChatListItem extends Block<ChatListItemProps> {
	static componentName = 'ChatListItem';

	constructor({ onClick, ...props }: ChatListItemProps) {
		super({ ...props, events: { click: onClick } });
	}

	render() {
		return `
			<li class="chat-list-item {{blueClass}}" data-id="id-{{dataID}}">
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
