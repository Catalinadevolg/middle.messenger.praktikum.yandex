import Block from 'core/Block';

import defaultAvatar from 'assets/empty-avatar.png';

export default class MessengerPage extends Block {
	constructor() {
		super();

		this.setProps({
			listItems: [
				{
					userName: 'Игорь',
					userAvatar: defaultAvatar,
					lastMessage: 'Some text',
					lastMessageDate: new Date().toLocaleTimeString(),
					newMessagesCount: 2,
				},
				{
					userName: 'Петя',
					userAvatar: defaultAvatar,
					lastMessage: 'Some text',
					lastMessageDate: new Date().toLocaleDateString(),
					active: true,
				},
				{
					userName: 'Игорь',
					userAvatar: defaultAvatar,
					lastMessage: 'Some text',
					lastMessageDate: new Date().toLocaleTimeString(),
					newMessagesCount: 2,
				},
				{
					userName: 'Игорь',
					userAvatar: defaultAvatar,
					lastMessage: 'Some text',
					lastMessageDate: new Date().toLocaleTimeString(),
					newMessagesCount: 2,
				},
				{
					userName: 'Игорь',
					userAvatar: defaultAvatar,
					lastMessage: 'Some text',
					lastMessageDate: new Date().toLocaleTimeString(),
					newMessagesCount: 2,
				},
				{
					userName: 'Игорь',
					userAvatar: defaultAvatar,
					lastMessage: 'Some text',
					lastMessageDate: new Date().toLocaleTimeString(),
					newMessagesCount: 2,
				},
				{
					userName: 'Игорь',
					userAvatar: defaultAvatar,
					lastMessage: 'Some text',
					lastMessageDate: new Date().toLocaleTimeString(),
					newMessagesCount: 2,
				},
				{
					userName: 'Игорь',
					userAvatar: defaultAvatar,
					lastMessage: 'Some text',
					lastMessageDate: new Date().toLocaleTimeString(),
					newMessagesCount: 2,
				},
				{
					userName: 'Игорь',
					userAvatar: defaultAvatar,
					lastMessage: 'Some text',
					lastMessageDate: new Date().toLocaleTimeString(),
					newMessagesCount: 2,
				},
			],
			activeChat: 1,
		});
	}

	render() {
		return `
			<div class="messenger">
				<div class="chat-list">
					<div class="chat-list__header">
						<div class="chat-list__profile-link">
							<a href="profile.html" class="profile-link">Профиль</a>
						</div>
						<div class="chat-list__search">
							<input type="search" name="search" placeholder="Поиск" class="search__input">
						</div>
					</div>
					<div class="chat-list__list">
						{{#each listItems}}
							{{#if active }}
								{{{ChatListItem
									className='item_active'
									userName=this.userName
									userAvatar=this.userAvatar
									lastMessage=this.lastMessage
									lastMessageDate=this.lastMessageDate
									newMessagesCount=this.newMessagesCount
								}}}
							{{else}}
								{{{ChatListItem
									userName=this.userName
									userAvatar=this.userAvatar
									lastMessage=this.lastMessage
									lastMessageDate=this.lastMessageDate
									newMessagesCount=this.newMessagesCount
								}}}
							{{/if}}
						{{/each}}
						<div class="chat-list__line"></div>
					</div>
				</div>
				{{#if activeChat }}
					{{{ChatBoxItem
						activeChat=this.activeChat
						userAvatar='${defaultAvatar}'
						userName='Петя'
					}}}
				{{else}}
					{{{ ChatPlug }}}
				{{/if}}
			</div>
		`;
	}
}
