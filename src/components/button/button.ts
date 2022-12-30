import Block from 'core/Block';

interface ButtonProps {
	buttonClass?: string;
	textClass?: string;
	text: string;
	type?: 'submit' | 'button';
	onClick?: () => void;
}
export class Button extends Block<ButtonProps> {
	static componentName = 'Button';

	constructor({ onClick, ...props }: ButtonProps) {
		super({ ...props, events: { click: onClick } });
	}

	render() {
		return `
		<button class="{{buttonClass}}" type={{type}}>
			<div class="{{textClass}}">{{text}}</div>
		</button>
		`;
	}
}
