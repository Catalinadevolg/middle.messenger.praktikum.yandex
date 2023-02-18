import { queryStringify } from 'utils/querystringify';

enum METHODS {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

type Options = {
	data?: unknown;
	headers?: Record<string, string>;
	timeout?: number;
};

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

export class HTTPTransport {
	BaseURL = 'https://ya-praktikum.tech/api/v2';

	get: HTTPMethod = (url, options = {}) => {
		return this.request(this.BaseURL + url, { ...options }, METHODS.GET);
	};

	post: HTTPMethod = (url, options = {}) => {
		return this.request(this.BaseURL + url, { ...options }, METHODS.POST);
	};

	put: HTTPMethod = (url, options = {}) => {
		return this.request(this.BaseURL + url, { ...options }, METHODS.PUT);
	};

	delete: HTTPMethod = (url, options = {}) => {
		return this.request(this.BaseURL + url, { ...options }, METHODS.DELETE);
	};

	request = (url: string, options: Options, method: METHODS, timeout = 5000) => {
		const { data } = options;

		if (method === METHODS.GET && !!data) {
			url = `{url}${queryStringify(data)}`;
		}

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			const formData = new FormData();

			xhr.open(method, url);

			if (!(data instanceof File)) {
				xhr.setRequestHeader('Content-Type', 'application/json');
			}
			if (data instanceof File) {
				formData.append('avatar', data);
			}

			xhr.onload = () => {
				const { response, status } = xhr;

				let responseData;
				try {
					responseData = JSON.parse(response);
				} catch (err) {
					responseData = response;
				}

				if (status === 200 || (status >= 400 && status < 500)) {
					resolve(responseData);
				} else {
					reject(responseData);
				}
			};

			xhr.onabort = reject;
			xhr.onerror = reject;

			xhr.timeout = timeout;
			xhr.ontimeout = reject;
			xhr.withCredentials = true;

			xhr.responseType = 'json';

			if (method === METHODS.GET || !data) {
				xhr.send();
			} else if (data instanceof File) {
				xhr.send(formData);
			} else {
				xhr.send(JSON.stringify(data));
			}
		});
	};
}

export default new HTTPTransport();
