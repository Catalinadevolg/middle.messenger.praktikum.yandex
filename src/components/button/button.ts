import { Block, BlockProps } from 'core';

type ButtonProps = BlockProps & {
	buttonClass?: string;
	textClass?: string;
	text?: string;
	type?: 'submit' | 'button';
	onClick?: () => void;
	dataTestId?: string;
};
export class Button extends Block<ButtonProps> {
	static componentName = 'Button';

	constructor({ onClick, ...props }: ButtonProps) {
		super({ ...props, events: { click: onClick } });
	}

	render(): string {
		return `
		<button class="{{buttonClass}}" type="{{type}}" {{#if dataTestId}}data-testid="{{dataTestId}}"{{/if}}>
			{{#if text}}<div class="{{textClass}}">{{text}}</div>{{/if}}
		</button>
		`;
	}
}
