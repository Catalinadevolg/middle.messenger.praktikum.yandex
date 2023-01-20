import { Block, BlockProps } from 'core';

type LinkForOnboardingProps = BlockProps & {
	link: string;
	text: string;
	onClick?: () => void;
};
export class LinkForOnboarding extends Block<LinkForOnboardingProps> {
	static componentName = 'LinkForOnboarding';

	constructor({ onClick, ...props }: LinkForOnboardingProps) {
		super({ ...props, events: { click: onClick } });
	}

	render() {
		return `
			<a href="{{link}}">{{text}}</a>
		`;
	}
}
