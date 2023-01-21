import Block from 'core/Block';

interface ProfileLinkProps {
	link: string;
	className: string;
	text: string;
	onClick: () => void;
}
export class ProfileLink extends Block<ProfileLinkProps> {
	static componentName = 'ProfileLink';

	constructor({ onClick, ...props }: ProfileLinkProps) {
		super({
			...props,
			events: {
				click: onClick,
			},
		});
	}

	render(): string {
		return `
			<div class="profile__link">
				<a href="{{link}}" class="{{className}}">{{text}}</a>
			</div>
		`;
	}
}
