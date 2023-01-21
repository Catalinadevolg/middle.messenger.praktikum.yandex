import { Block, BlockProps } from 'core';

type UserListItemProps = BlockProps & {
	userId: number;
	userName: string;
	onClick?: () => void;
};

export class UserListItem extends Block<UserListItemProps> {
	static componentName = 'UserListItem';

	constructor({ onClick, ...props }: UserListItemProps) {
		super({ ...props, events: { click: onClick } });
	}

	render(): string {
		return `
			<div class="user-list__row">
				<div class="user-list__name" data-id="id-{{userId}}">ID: {{userId}} ({{userName}})</div>
			</div>
		`;
	}
}
