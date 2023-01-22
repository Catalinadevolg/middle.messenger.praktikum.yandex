import { Dispatch } from 'core';

export type DispatchStateHandler<TAction> = (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: TAction
) => Promise<void>;
