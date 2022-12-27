import Block from 'core/Block';

interface ButtonProps {
	text: string;
	onSubmit?: () => void;
}
export class Button extends Block<ButtonProps> {
	static componentName = 'Button';

	constructor({ onSubmit, ...props }: ButtonProps) {
		super({ ...props, events: { click: onSubmit } });
	}

	render() {
		return `
		<button class="{{buttonClass}}" type="button">
			<div class="{{textClass}}">{{text}}</div>
		</button>
		`;
	}
}
