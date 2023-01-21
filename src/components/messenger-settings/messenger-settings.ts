import { Block, BlockProps } from 'core';

type MessengerSettingsProps = BlockProps & {
	onClick?: () => void;
};

export class MessengerSettings extends Block<MessengerSettingsProps> {
	static componentName = 'MessengerSettings';

	constructor({ onClick }: MessengerSettingsProps) {
		super({ events: { click: onClick } });
	}

	render(): string {
		return `
			<button class="chat-box__settings-btn">
				<div class="settings-btn">
					<div class="btn-point"></div>
					<div class="btn-point btn-point_middle"></div>
					<div class="btn-point"></div>
				</div>
			</button>
		`;
	}
}
