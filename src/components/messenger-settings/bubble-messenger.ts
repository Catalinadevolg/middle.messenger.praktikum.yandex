import { Block, Store } from 'core';
import { validateForm, withStore } from 'utils';
import { addUser, deleteUser, deleteChat } from 'services';

type BubbleMessengerProps = Partial<AppState> & {
	store: Store<AppState>;
	activeBubble: string;
	activeModal: string;
	openModalAddUser?: () => void;
	openModalDeleteUser?: () => void;
	cancelСlick?: () => void;
	deleteChat?: () => void;
	addUser?: () => void;
	deleteUser?: (e: FocusEvent) => void;
	modalStatus: 'add' | 'remove';
};

class BubbleMessenger extends Block<BubbleMessengerProps> {
	static componentName = 'BubbleMessenger';

	constructor(props: BubbleMessengerProps) {
		super(props);

		this.setProps({
			activeBubble: '',
			activeModal: '',
			modalStatus: 'add',
			openModalAddUser: () => this.openModalAddUser(),
			openModalDeleteUser: () => this.openModalDeleteUser(),
			cancelСlick: () => this.cancelСlick(),
			deleteChat: () => this.deleteChat(),
			addUser: () => this.addUser(),
			deleteUser: (e: FocusEvent) => this.deleteUser(e),
		});
	}

	deleteChat() {
		const chatId = this.props.activeChat?.id;
		window.store.dispatch(deleteChat, { chatId });
	}

	openModalAddUser() {
		if (this.props.modalStatus !== 'add') {
			this.setProps({
				modalStatus: 'add',
			});
		}

		if (!this.props.activeModal) {
			this.setProps({
				activeModal: '_active',
				activeBubble: '',
			});
		} else {
			this.setProps({
				activeModal: '',
			});
		}
	}

	openModalDeleteUser() {
		if (this.props.modalStatus !== 'remove') {
			this.setProps({
				modalStatus: 'remove',
			});
		}

		if (!this.props.activeModal) {
			this.setProps({
				activeModal: '_active',
				activeBubble: '',
			});
		} else {
			this.setProps({
				activeModal: '',
			});
		}
	}

	addUser() {
		console.log('Добавляем пользователя');
		let errors = false;

		const inputRefs = this.refs.inputRef.getRefs();

		const inputEl = inputRefs.inputRef.getContent() as HTMLInputElement;
		const userId = inputEl.value;

		const errorText = validateForm(inputEl.name, userId);

		if (errors === false && errorText) {
			errors = true;
		}

		inputRefs.errorRef.setProps({
			errorText: errorText,
		});

		if (errors === false && userId) {
			// Проверяем по Id, состоит ли пользователь в чате
			const users = this.props.users;
			if (users) {
				const index = users!.findIndex((user) => user.id === +userId);

				// Если состоит, выводим ошибку
				if (index !== -1) {
					inputRefs.errorRef.setProps({
						errorText: 'Пользователь уже в чате',
					});
					return;
				}

				// Если не состоит, добавляем в чат
				if (index === -1) {
					const chatId = this.props.activeChat?.id;

					const data = {
						chatId,
						users: [userId],
					};

					window.store.dispatch(addUser, data);
				}
			}
		}
	}

	deleteUser(e: FocusEvent) {
		console.log('Удаляем пользователя');

		const target = e.target as HTMLElement;

		// e.target может быть на внешнем div
		const userDataId = target.getAttribute('data-id');
		const userId = userDataId!.split('-')[1];
		const chatId = this.props.activeChat?.id;

		const data = {
			chatId,
			users: [userId],
		};

		window.store.dispatch(deleteUser, data);
	}

	cancelСlick() {
		this.setProps({
			activeModal: '',
		});
	}

	render(): string {
		const users = this.props.users;

		return `
		<div>
			<div class="chat-menu__modal${this.props.activeBubble}">
				<div class="chat-menu__box">
					<div class="chat-menu__box-container">
						<div class="chat-menu__row">
							<div class="chat-menu__icon icon-add"></div>
							{{{Link
								linkClass="chat-menu__text"
								text="Добавить пользователя"
								onClick=openModalAddUser
							}}}
							</div>
						<div class="chat-menu__row">
							<div class="chat-menu__icon icon-delete"></div>
							{{{Link
								linkClass="chat-menu__text"
								text="Удалить пользователя"
								onClick=openModalDeleteUser
							}}}
						</div>
						${
							this.props.user!.id === this.props.activeChat?.createdBy
								? `<div class="chat-menu__row">
								<div class="chat-menu__icon icon-delete"></div>
								{{{Link
									linkClass="chat-menu__text"
									text="Удалить чат"
									onClick=deleteChat
								}}}
							</div>
						</div>`
								: ''
						}
				</div>
			</div>
			<div class="add-user__modal${this.props.activeModal}">
					<div class="add-user__box">
						<div class="add-user__box-container">
							<div class="add-user__title">
								${this.props.modalStatus === 'add' ? 'Добавить пользователя' : 'Удалить пользователя'}
							</div>
							<div class="add-user__form">
							${
								this.props.modalStatus === 'add'
									? `{{{ControlledInput
												ref="inputRef"
												label="ID"
												type="text"
												name="id"
												placeholder="ID пользователя"
												controlledInputClassName="controlled-input"
												addControlledInputClass="margin-bottom"
												inputClassName="input__input"
											}}}
											{{{Button
												buttonClass="button-wrapper"
												textClass="button"
												type="submit"
												text='Добавить'
												onClick=addUser
											}}}`
									: `${
											users
												? users
														.map((user: User) => {
															return `
										{{{UserListItem
											userId="${user.id}"
											userName="${user.displayName ? user.displayName : user.firstName}"
											onClick=deleteUser
										}}}`;
														})
														.join('')
												: ''
									  }`
							}
								{{{Link
									linkClass="add-user__link"
									text="Отмена"
									onClick=cancelСlick
								}}}
							</div>
						</div>
					</div>
				</div>
		</div>
		`;
	}
}

const ComposedBubbleMessenger = withStore<
	BubbleMessengerProps,
	{
		loginFormError: Nullable<string>;
		isLoading: boolean;
		activeChat: {
			id: Nullable<number>;
			title: Nullable<string>;
			avatar: Nullable<string>;
			createdBy: Nullable<number>;
		} | null;
		users: Nullable<User[]>;
		user: Nullable<User>;
	}
>(BubbleMessenger, (state: AppState) => ({
	isLoading: state.isLoading,
	loginFormError: state.loginFormError,
	activeChat: state.activeChat,
	users: state.users,
	user: state.user,
}));

export { ComposedBubbleMessenger as BubbleMessenger };
