import Block from '../../core/Block';

interface InputForProfileProps {
	type?: 'text' | 'password';
	name: string;
	placeholder?: string;
	classname?: string;
	value?: string;
	disabled?: boolean;
	onInput?: () => void;
	onFocus?: () => void;
	onBlur?: () => void;
}
export class InputForProfile extends Block {
	static componentName = 'InputForProfile';

	constructor({ onInput, onFocus, onBlur, ...props }: InputForProfileProps) {
		super({
			...props,
			events: {
				input: onInput,
				focus: onFocus,
				blur: onBlur,
			},
		});
	}

	protected render(): string {
		return `
			<input
				type="{{type}}"
				name="{{name}}"
				placeholder="{{placeholder}}"
				class="{{classname}} {{#if activeClass}}{{activeClass}}{{/if}}"
				value="{{#if value}}{{value}}{{/if}}"
				{{#if disabled}} disabled {{/if}}
			/>
		`;
	}
}
