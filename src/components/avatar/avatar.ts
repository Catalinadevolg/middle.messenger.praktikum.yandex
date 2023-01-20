import { Block, BlockProps, Store } from 'core';
import { changeAvatar } from 'services';
import { withStore } from 'utils';

import defaultAvatar from 'assets/empty-avatar.png';

type AvatarProps = BlockProps & {
	store: Store<AppState>;
	userAvatar?: string;
	className?: string;
	onClick?: () => void;
	chooseNewAvatar?: () => void;
	changeAvatar?: () => void;
	modalClassName?: string;
	cancelingChange?: () => void;
	file?: File;
	selectedAvatar?: string;
	user: User | null;
};

class Avatar extends Block<AvatarProps> {
	static componentName = 'Avatar';

	constructor({ onClick, ...props }: AvatarProps) {
		super({ ...props, events: { click: onClick } });

		this.setProps({
			chooseNewAvatar: () => this.chooseNewAvatar(),
			changeAvatar: () => this.changeAvatar(),
			cancelingChange: () => this.cancelingChange(),
			modalClassName: '',
			selectedAvatar: '',
			file: undefined,
		});
	}

	chooseNewAvatar() {
		const input = document.querySelector('.hidden-input') as HTMLInputElement;
		const file = input.files![0];
		this.props.file = file;

		if (file) {
			// TODO: добавить валидацию и вывод error при размере файла >1Mb
			this.props.modalClassName = 'avatar__modal_active';
			const src = URL.createObjectURL(file);
			this.props.selectedAvatar = src;
		}
	}

	changeAvatar() {
		const file = this.props.file;

		this.props.store.dispatch(changeAvatar, file);
		this.props.modalClassName = '';
	}

	cancelingChange() {
		this.props.modalClassName = '';
	}

	render() {
		const user = this.props.store.getState().user;

		return `
		<div class="profile__avatar">
			<label class="avatar__label">
				{{{Input
					type="file"
					inputClassName="hidden-input"
					accept=".jpg, .png"
					onChange=chooseNewAvatar
				}}}
				<img src="${
					user && user!.avatar
						? `https://ya-praktikum.tech/api/v2/resources${user!.avatar}`
						: defaultAvatar
				}" alt="Аватар">
				<div class="avatar__text">Изменить</div>
			</label>
			<div class="avatar__modal {{modalClassName}}">
				<div class="avatar__box">
					<div class="avatar__box-container">
						<div class="avatar__img-box">
							<img src="${this.props.selectedAvatar}" alt="Фото">
						</div>
						<div class="avatar__buttons-box">
							{{{Button
								buttonClass="button-wrapper"
								textClass="button"
								type="submit"
								text="Сохранить изменения"
								onClick=changeAvatar
							}}}
							{{{Link
								linkClass="avatar-link"
								text="Отмена"
								onClick=cancelingChange
							}}}
						</div>
					</div>
				</div>
			</div>
		</div>
		`;
	}
}

const ComposedProfile = withStore(Avatar);

export { ComposedProfile as Avatar };
