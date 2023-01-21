import Block from 'core/Block';

interface LinkProps {
	link: string;
	text: string;
	onClick: () => void;
}
export class Link extends Block<LinkProps> {
	static componentName = 'Link';

	constructor({ onClick, ...props }: LinkProps) {
		super({ ...props, events: { click: onClick } });
	}

	render() {
		return `
			<a href="{{link}}">{{text}}</a>
		`;
	}
}
