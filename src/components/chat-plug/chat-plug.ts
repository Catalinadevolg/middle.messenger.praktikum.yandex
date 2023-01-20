import { Block } from 'core';

export class ChatPlug extends Block {
	static componentName = 'ChatPlug';

	protected render(): string {
		return `
		<div class="chat-box">
			<p>Выберите чат чтобы отправить сообщение</p>
		</div>
		`;
	}
}
