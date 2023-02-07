import { chatsAPI, ChatMessageDTO } from 'api';
import { transformChatMessage } from 'utils';

class Socket {
	private socket: WebSocket | null = null;

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

				this.socket?.send(
					JSON.stringify({
						content: '0',
						type: 'get old',
					})
				);

				setInterval(() => {
					this.socket?.send(
						JSON.stringify({
							type: 'ping',
						})
					);
				}, 15000);
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

					if (Array.isArray(data)) {
						const messages = data
							.map((message) => transformChatMessage(message))
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
						const newMessage = transformChatMessage(data);
						const oldMessages = window.store.getState().messages as ChatMessage[];

						window.store.dispatch({
							messages: [...oldMessages, newMessage],
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
		});
	}

	public sendMessage(message: string) {
		console.log('Отправляем сообщение');
		this.socket?.send(
			JSON.stringify({
				content: message,
				type: 'message',
			})
		);
	}
}

export default new Socket();
