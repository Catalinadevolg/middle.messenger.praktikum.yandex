import Block from 'core/Block';

interface ButtonProps {
	text: string;
	onClick?: () => void;
}
export class Button extends Block<ButtonProps> {
	static componentName = 'Button';

	constructor({ onClick, ...props }: ButtonProps) {
		super({ ...props, events: { click: onClick } });
	}

	render() {
		return `
		<button class="{{buttonClass}}" type="button">
			<div class="{{textClass}}">{{text}}</div>
		</button>
		`;
	}
}
