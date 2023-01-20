import { Block, BlockProps, Store } from 'core';
import Socket from 'services/socket';
import { withStore } from 'utils';

type ChatBoxItemProps = BlockProps & {
	store: Store<AppState>;
	userAvatar: string;
	userName: string;
	sendMessage: (e: SubmitEvent) => void;
	openSettings: () => void;
	activeModal: string;
};
class ChatBoxItem extends Block<ChatBoxItemProps> {
	static componentName = 'ChatBoxItem';

	constructor({ ...props }: ChatBoxItemProps) {
		super({ ...props });

		this.setProps({
			activeModal: '',
			openSettings: () => this.openSettings(),
			activeChat: 1,
			sendMessage: (e: SubmitEvent) => this.sendMessage(e),
		});
	}

	openSettings() {
		// @ts-ignore
		const props = this.refs.bubbleMessenger.props;
		if (!props.activeBubble) {
			props.activeBubble = 'chat-menu__modal_active';
		} else {
			props.activeBubble = '';
		}
		// @ts-ignore
		console.log(this.refs.bubbleMessenger.props);
	}

	// TODO:
	// Добавить async сюда или к sendMessage in Socket?
	// Обновлять lastMesaage в chatListItem после отправки сообщения
	// Стилизовать buble-rows при наведении
	sendMessage(e: SubmitEvent) {
		e.preventDefault();

		const inputComponent: any = this.refs.inputRef;
		const inputEl = inputComponent.refs.inputRef.getContent() as HTMLInputElement;

		if (inputEl.value) {
			Socket.sendMessage(inputEl.value);
		}
	}

	render() {
		const state = this.props.store.getState();
		const messages = state.messages;
		// console.log('Перерендер ЧатБокса');

		return `
			<div class="chat-box_active">
				<div class="chat-box__container">
					<div class="chat-box__header">
							<div class="chat-box__user-info">
									<div class="user-info__avatar">
											<img src="{{userAvatar}}" alt="avatar" class="user-info__img">
									</div>
									<p class="user-info__name">{{userName}}</p>
							</div>
							{{{MessengerSettings
								ref="messengerSettings"
								activeModalClass=""
								onClick=openSettings
							}}}
					</div>
					<div class="chat-box__main">
							<div class="chat-box__date"><time>Вывести дату!</time></div>
								${
									messages && messages.length > 0
										? messages
												.map((message: ChatMessage) => {
													return `
														{{{Message
															message="${message.content}"
															direction="${message.userId === state.user?.id ? 'out' : 'in'}"
															time="${message.time}"
														}}}`;
												})
												.join('')
										: '<p class="chat-box__empty">Здесь ещё нет сообщений.</p>'
								}
					</div>
					<div class="chat-box__footer">
							<form class="chat-box__form">
								{{{ControlledInput
									ref="inputRef"
									type="text"
									name="message"
									placeholder="Сообщение"
									controlledInputClassName="chat-box__controlled-input"
									inputClassName="chat-box__input"
								}}}
								{{{Button
									buttonClass="chat-box__btn"
									type="submit"
									onClick=sendMessage
								}}}
							</form>
					</div>
				</div>
				{{{BubbleMessenger
					ref="bubbleMessenger"
				}}}
			</div>
		`;
	}
}

const ComposedChatBoxItem = withStore(ChatBoxItem);

export { ComposedChatBoxItem as ChatBoxItem };
