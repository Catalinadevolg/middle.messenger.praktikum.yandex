import { APIError } from 'api';

export function hasError(response: any): response is APIError {
	return response && response.reason;
}
