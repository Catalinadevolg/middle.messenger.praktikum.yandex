import { Block, Store } from 'core';
import { withStore } from 'utils';

type LoaderProps = {
	store: Store<AppState>;
	isLoading: boolean;
};

class Loader extends Block<LoaderProps> {
	static componentName = 'Loader';

	constructor(props: LoaderProps) {
		super(props);
	}

	protected render(): string {
		return `
      <div class="{{#if isLoading}}page-loader{{/if}}"></div>
    `;
	}
}

const ComposedLoader = withStore<LoaderProps, { isLoading: boolean }>(
	Loader,
	(state: AppState) => ({ isLoading: state.isLoading })
);

export { ComposedLoader as Loader };
