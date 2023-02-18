import { Block, CoreRouter, Store } from 'core';
import { withRouter, withStore } from 'utils';
import { getChats } from 'services';

import defaultAvatar from 'assets/empty-avatar.png';

type MessengerPageProps = Partial<AppState> & {
	router: CoreRouter;
	store: Store<AppState>;
	toProfile?: () => void;
	openModalWindow?: () => void;
};

class MessengerPage extends Block<MessengerPageProps> {
	static componentName = 'MessengerPage';

	constructor(props: MessengerPageProps) {
		super(props);

		this.setProps({
			toProfile: () => this.toProfile(),
			openModalWindow: () => this.openModalWindow(),
		});
	}

	async componentDidMount() {
		console.log('Загружаем чаты');
		if (!this.props.chats) {
			await window.store.dispatch(getChats);
		}
	}

	componentDidUpdate() {
		return window.store.getState().screen === 'messenger';
	}

	toProfile() {
		this.props.router.go('/profile');
	}

	openModalWindow() {
		this.refs.createChatModal.setProps({
			modalClassName: '_active',
		});
	}

	render() {
		const activeChat = this.props.activeChat;

		return `
			<main class="messenger">
				{{{Loader}}}
				<div class="chat-list">
					<div class="chat-list__header">
						<div class="chat-list__profile-link">
							{{{Link
								linkClass="profile-link"
								text="Профиль"
								onClick=toProfile
							}}}
						</div>
						{{{Button
							ref="button"
							buttonClass="button-wrapper"
							textClass="button"
							type="button"
							text='Создать новый чат'
							onClick=openModalWindow
						}}}
						<div class="chat-list__search">
							<input type="search" name="search" placeholder="Поиск" class="search__input">
						</div>
					</div>
					{{{ChatList}}}
				</div>
				${
					activeChat
						? `
					{{{ChatBoxItem
						userAvatar="${activeChat.avatar ? activeChat.avatar : defaultAvatar}"
						userName="${activeChat.title}"
					}}}
				`
						: `{{{ ChatPlug }}}`
				}
				{{{CreateChatModal
					ref="createChatModal"
				}}}
			</main>
		`;
	}
}

const ComposedMessenger = withRouter(
	withStore<
		MessengerPageProps,
		{
			user: Nullable<User>;
			loginFormError: Nullable<string>;
			appIsInited: boolean;
			screen: AppState;
			activeChat: {
				id: Nullable<number>;
				title: Nullable<string>;
				avatar: Nullable<string>;
				createdBy: Nullable<number>;
			} | null;
			chats: Nullable<Chat[]>;
		}
	>(MessengerPage, (state: AppState) => ({
		appIsInited: state.appIsInited,
		screen: state.screen,
		user: state.user,
		loginFormError: state.loginFormError,
		activeChat: state.activeChat,
		chats: state.chats,
	}))
);

export { ComposedMessenger as MessengerPage };
