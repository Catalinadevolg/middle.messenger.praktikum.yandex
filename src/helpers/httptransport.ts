import queryStringify from './querystringify';

enum METHODS {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

type Options = {
	method: string;
	data: unknown;
	headers: Record<string, string>;
};

class HTTPTransport {
	get = (url: string, options: Options) => {
		return this.request(url, { ...options, method: METHODS.GET });
	};

	post = (url: string, options: Options) => {
		return this.request(url, { ...options, method: METHODS.POST });
	};

	put = (url: string, options: Options) => {
		return this.request(url, { ...options, method: METHODS.PUT });
	};

	delete = (url: string, options: Options) => {
		return this.request(url, { ...options, method: METHODS.DELETE });
	};

	request = (url: string, options: Options, timeout = 5000) => {
		const { headers = {}, method, data } = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open(method, method === METHODS.GET && !!data ? `${url}${queryStringify(data)}` : url);

			if (headers) {
				Object.keys(headers).forEach((key) => {
					xhr.setRequestHeader(key, headers[key]);
				});
			}

			xhr.onload = function () {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;

			xhr.timeout = timeout;
			xhr.ontimeout = reject;

			if (method === METHODS.GET || !data) {
				xhr.send();
			} else {
				xhr.send(data as any);
			}
		});
	};
}

export default new HTTPTransport();
