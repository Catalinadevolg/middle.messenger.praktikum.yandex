import HTTPTransport from 'utils/httptransport';

type SigninRequestData = {
	login: string;
	password: string;
};

type SignupRequestData = {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
};

export const authAPI = {
	signin: (data: SigninRequestData) => HTTPTransport.post('/auth/signin', { data }),

	signup: (data: SignupRequestData) => HTTPTransport.post('/auth/signup', { data }),

	me: () => HTTPTransport.get('/auth/user'),

	logout: () => HTTPTransport.post('/auth/logout'),
};
