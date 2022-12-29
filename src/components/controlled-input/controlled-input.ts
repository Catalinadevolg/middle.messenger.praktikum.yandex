import Block from 'core/Block';
import { validateForm } from 'helpers/validateForm';

interface ControlledInputProps {
	label: string;
	type?: 'text' | 'password';
	name: string;
	placeholder: string;
	onInput?: () => void;
	onBlur?: () => void;
	onFocus?: () => void;
}
export class ControlledInput extends Block<ControlledInputProps> {
	static componentName = 'ControlledInput';

	constructor({ ...props }: ControlledInputProps) {
		super({ ...props });

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

	render(): string {
		return `
		<div class="controlled-input">
			<label for="login" class="input__label">{{label}}</label>
			{{{Input
				ref="inputRef"
				type="{{type}}"
				name="{{name}}"
				placeholder="{{placeholder}}"
				className="input__input"
				onInput=onInput
				onFocus=onFocus
				onBlur=onBlur
			}}}
			{{{Error
				ref="errorRef"
				errorClass="input__error"
			}}}
		</div>
		`;
	}
}
