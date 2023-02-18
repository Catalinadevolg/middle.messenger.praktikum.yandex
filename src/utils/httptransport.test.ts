import HTTPTransport from 'utils/httptransport';

const USER_LOGIN_MOCK = {
	login: 'ruslan',
	password: 'Ruslan1993',
};

describe('HTTPTransport', () => {
	it('should send POST request', async () => {
		const response = await HTTPTransport.post('/auth/signin', { data: USER_LOGIN_MOCK });

		expect(response).toEqual(null);
	});

	it('should send GET request', async () => {
		const response = await HTTPTransport.get('/auth/user');

		expect(response).toEqual({ userName: 'ruslan' });
	});

	it('should send PUT request', async () => {
		const response = await HTTPTransport.put('/user/profile', { data: { userName: 'ruslan24' } });

		expect(response).toEqual({ userName: 'ruslan24' });
	});
});
