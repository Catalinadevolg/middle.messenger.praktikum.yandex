import Block from 'core/Block';

interface InputProps {
	type?: 'text' | 'password';
	name: string;
	placeholder: string;
	onInput?: () => void;
	onFocus?: () => void;
	onBlur?: () => void;
}
export class Input extends Block {
	static componentName = 'Input';

	constructor({ onInput, onFocus, onBlur, ...props }: InputProps) {
		super({
			...props,
			events: {
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
			class="{{className}}"
			required
		/>
		`;
	}
}
