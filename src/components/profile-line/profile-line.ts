import { Block, BlockProps } from 'core';
import { validateForm } from 'utils/validateForm';

type ProfileLineProps = BlockProps & {
	label: string;
	name: 'oldPassword' | 'newPassword' | 'confirmedPassword';
	value?: string;
	type?: 'text' | 'password';
	placeholder?: string;
	activeClass?: string;
	disabled?: boolean;
	onInput?: (e: FocusEvent) => void;
	onBlur?: (e: FocusEvent) => void;
	onFocus?: (e: FocusEvent) => void;
};
export class ProfileLine extends Block<ProfileLineProps> {
	static componentName = 'ProfileLine';

	constructor({ ...props }: ProfileLineProps) {
		super({ ...props, errorText: '' });

		this.setProps({
			onInput: (e: FocusEvent) => {
				const inputEl = e.target as HTMLInputElement;

				if (inputEl) {
					this.validate(e);
				}
			},

			onBlur: (e: FocusEvent) => {
				const inputEl = e.target as HTMLInputElement;

				if (inputEl) {
					this.validate(e);
				}
			},

			onFocus: (e: FocusEvent) => {
				const inputEl = e.target as HTMLInputElement;

				if (inputEl) {
					this.refs.errorRef.setProps({
						errorText: '',
					});
				}
			},
		});
	}

	validate(e: FocusEvent) {
		const inputEl = e.target as HTMLInputElement;

		const errorText = validateForm(inputEl.name, inputEl.value);

		this.refs.errorRef.setProps({
			errorText: errorText,
		});
	}

	protected render(): string {
		return `
		<div class="profile-line">
			<div class="profile-line__wrapper">
				<div class="profile__label">{{label}}</div>
				{{{InputForProfile
					ref="inputRef"
					name="{{name}}"
					value=value
					type="{{type}}"
					placeholder="{{placeholder}}"
					classname="profile__value"
					activeClass=activeClass
					disabled=disabled
					onInput=onInput
					onFocus=onFocus
					onBlur=onBlur
				}}}
			</div>
			{{{Error
				ref="errorRef"
				errorClass="profile__error"
			}}}
		</div>
		`;
	}
}
