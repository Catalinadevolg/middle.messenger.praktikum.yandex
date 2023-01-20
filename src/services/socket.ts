import { EventBus } from 'core';
import { chatsAPI, ChatMessageDTO } from 'api';
import { transformChatMessage } from 'utils';

class Socket extends EventBus {
	socket: WebSocket | null = null;

	public async connect(userID: number, chatID: number) {
		if (this.socket) {
			this.socket.close();
		}

		await chatsAPI.getToken(chatID).then((data: string | any) => {
			const { token } = data;

			this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userID}/${chatID}/${token}`);
			const socket = this.socket;

			socket.addEventListener('open', () => {
				console.log('Соединение установлено');

				setInterval(() => {
					this.socket?.send(
						JSON.stringify({
							type: 'ping',
						})
					);
				}, 5000);

				window.store.dispatch({ socket, messages: this.getMessages() });
			});

			socket.addEventListener('close', (e) => {
				if (e.wasClean) {
					console.log('Соединение закрыто чисто');
				} else {
					console.log('Обрыв соединения');
				}

				console.log(`Код: ${e.code} | Причина: ${e.reason}`);
			});

			socket.addEventListener('message', (e) => {
				try {
					const data: ChatMessageDTO[] | ChatMessageDTO = JSON.parse(e.data);
					console.log('Получены данные', data);

					// Переписать!
					if (Array.isArray(data)) {
						const filteredMessages = data.filter((message) => message.content) || [];
						const messages = filteredMessages
							.map((data) => transformChatMessage(data))
							.sort((a, b) => b.id - a.id);

						window.store.dispatch({
							messages,
						});
						return;
					}

					if (data.type === 'user connected' || data.type === 'pong' || !data.content) {
						return;
					}

					if (data.type === 'message' && data.content) {
						// const messageElem = document.createElement('div');

						// const el = this.printMessage(transformChatMessage(data));
						// messageElem.insertAdjacentHTML('afterbegin', el);

						// const mainDiv = document.querySelector('.chat-box__main');
						// mainDiv?.append(messageElem);

						// // Обновляем Store для перерендера компонента (очистки input)
						// window.store.dispatch({
						// 	isLoading: false,
						// });

						// Закомментирован вариант, в котором нужно доработать очистку инпута.
						// Оставлен - рабочий вариант, но времязатратный
						window.store.dispatch({
							messages: this.getMessages(),
						});
					}
				} catch (err) {
					if (err instanceof SyntaxError) {
						throw new Error(err.message);
					} else {
						throw new Error('Cant parse JSON data');
					}
				}
			});

			socket.addEventListener('error', (e) => {
				// @ts-ignore
				console.log('Ошибка', e.message);
			});
		});
	}

	// public send(data: unknown) {
	// 	if (!this.socket) {
	// 		throw new Error('Соединение с Websocket еще не установлено');
	// 	} else {
	// 		this.socket.send(JSON.stringify(data));
	// 	}
	// }

	private getMessages() {
		console.log('Загружаем сообщения');
		return this.socket?.send(
			JSON.stringify({
				content: '0',
				type: 'get old',
			})
		);
	}

	sendMessage(message: string) {
		console.log('Отправляем сообщение');
		this.socket?.send(
			JSON.stringify({
				content: message,
				type: 'message',
			})
		);
		// this.getMessages();
	}

	// private printMessage(message: ChatMessage) {
	// 	return `
	// 	<div class="message__wrapper message__${
	// 		message.userId === window.store.getState().user?.id ? 'out' : 'in'
	// 	}">
	// 		<div class="message__message">${message.content}</div>
	// 		<time class="message__time time__${
	// 			message.userId === window.store.getState().user?.id ? 'out' : 'in'
	// 		}">${message.time}<time>
	// 	</div>`;
	// }
}

export default new Socket();
