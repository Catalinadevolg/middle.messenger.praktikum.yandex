import { Block, CoreRouter, Store } from 'core';
import { withRouter, withStore } from 'utils';
import { getChats } from 'services';

import defaultAvatar from 'assets/empty-avatar.png';

// Поиск не реализован, в проектной работе не обязателен
// Добавить возможность изменять аватарку на общем чате

type MessengerPageProps = {
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
		if (!this.props.store.getState().chats) {
			await this.props.store.dispatch(getChats);
		}
	}

	toProfile() {
		this.props.router.go('/profile');
	}

	openModalWindow() {
		// @ts-ignore
		this.refs.createChatModal.props.modalClassName = '_active';
		console.log(this.props.store.getState());
	}

	render() {
		console.log('Рендер Messenger');
		const state = this.props.store.getState();

		return `
			<main class="messenger">
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
					state.activeChat
						? `
					{{{ChatBoxItem
						userAvatar="${state.activeChat.avatar ? state.activeChat.avatar : defaultAvatar}"
						userName="${state.activeChat.title}"
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

const ComposedMessenger = withRouter(withStore(MessengerPage));

export { ComposedMessenger as MessengerPage };
