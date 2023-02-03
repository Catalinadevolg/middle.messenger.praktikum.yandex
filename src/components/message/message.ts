import { Block, BlockProps } from 'core';

type MessageProps = BlockProps & {
	direction: string;
	message: string;
	time: Date;
};
export class Message extends Block<MessageProps> {
	static componentName = 'Message';

	constructor({ ...props }: MessageProps) {
		super({
			...props,
		});
	}

	render(): string {
		return `
		<div class="message__wrapper message__{{direction}}">
			<div class="message__message">{{message}}</div>
			<time class="message__time time__{{direction}}">{{time}}<time>
		</div>
		`;
	}
}
