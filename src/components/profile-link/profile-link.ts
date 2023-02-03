import { Block, BlockProps } from 'core';

type ProfileLinkProps = BlockProps & {
	className: string;
	text: string;
	addClassName?: string;
	onClick?: () => void;
	dataTestId?: string;
};
export class ProfileLink extends Block<ProfileLinkProps> {
	static componentName = 'ProfileLink';

	constructor({ onClick, ...props }: ProfileLinkProps) {
		super({ ...props, events: { click: onClick } });
	}

	render(): string {
		return `
			<div class="profile__link {{#if visibilityClass}}{{visibilityClass}}{{/if}} {{addClassName}}">
				<button class="{{className}}" type="button" {{#if dataTestId}}data-testid="{{dataTestId}}"{{/if}}>{{text}}</button>
			</div>
		`;
	}
}
