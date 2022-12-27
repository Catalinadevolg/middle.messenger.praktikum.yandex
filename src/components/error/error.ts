import Block from 'core/Block';

interface ErrorProps {
	errorClass?: string;
	errorText?: string;
}
export class Error extends Block<ErrorProps> {
	static componentName = 'Error';

	constructor({ ...props }: ErrorProps) {
		super({ ...props });
	}
	protected render(): string {
		return `
			<div class="{{errorClass}}">{{#if errorText}}{{errorText}}{{/if}}</div>
		`;
	}
}
