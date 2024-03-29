import { Block, BlockProps } from 'core';
import { validateForm } from 'utils/validateForm';

type ControlledInputProps = BlockProps & {
	label: string;
	type?: 'text' | 'password';
	name: string;
	placeholder: string;
	inputClassName: string;
	controlledInputClassName: string;
	addControlledInputClass?: string;
	onInput?: (e: FocusEvent) => void;
	onBlur?: (e: FocusEvent) => void;
	onFocus?: (e: FocusEvent) => void;
};
export class ControlledInput extends Block<ControlledInputProps> {
	static componentName = 'ControlledInput';

	constructor(props: ControlledInputProps) {
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
		<div class="{{controlledInputClassName}} {{addControlledInputClass}}">
			<label for="login" class="input__label">{{label}}</label>
			{{{Input
				ref="inputRef"
				type="{{type}}"
				name="{{name}}"
				placeholder="{{placeholder}}"
				inputClassName="{{inputClassName}}"
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
