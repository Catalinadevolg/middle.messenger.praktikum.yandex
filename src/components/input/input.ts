import { Block, BlockProps } from 'core';

type InputProps = BlockProps & {
	type?: 'text' | 'password' | 'file';
	name: string;
	placeholder: string;
	inputClassName: string;
	accept?: string;
	onChange?: () => void;
	onInput?: () => void;
	onFocus?: () => void;
	onBlur?: () => void;
};
export class Input extends Block<InputProps> {
	static componentName = 'Input';

	constructor({ onClick, onChange, onInput, onFocus, onBlur, ...props }: InputProps) {
		super({
			...props,
			events: {
				change: onChange,
				input: onInput,
				focus: onFocus,
				blur: onBlur,
			},
		});
	}

	render(): string {
		return `
		<input
			type="{{type}}"
			name="{{name}}"
			placeholder="{{placeholder}}"
			class="{{inputClassName}}"
			accept="{{accept}}"
			required
		/>
		`;
	}
}
