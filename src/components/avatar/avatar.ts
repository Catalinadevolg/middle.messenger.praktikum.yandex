import Block from 'core/Block';

interface AvatarProps {
	userAvatar?: string;
	className?: string;
}
export class Avatar extends Block<AvatarProps> {
	static componentName = 'Avatar';

	constructor({ ...props }: AvatarProps) {
		super({ ...props });
	}

	render() {
		return `
		<div class="{{className}}">
				<img src="{{userAvatar}}" alt="Аватар">
				<div class="{{textClassName}}">Поменять аватар</div>
		</div>
		`;
	}
}
