import { Block, BlockProps } from 'core';

type LinkProps = BlockProps & {
	linkClass?: string;
	text: string;
	onClick?: () => void;
};
export class Link extends Block<LinkProps> {
	static componentName = 'Link';

	constructor({ onClick, ...props }: LinkProps) {
		super({ ...props, events: { click: onClick } });
	}

	render() {
		return `
		<button class="{{linkClass}}" type="button">
			{{text}}
		</button>
		`;
	}
}
