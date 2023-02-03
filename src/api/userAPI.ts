import HTTPTransport from 'utils/httptransport';

type UserRequestData = {
	avatar?: string;
	display_name?: string;
	email?: string;
	first_name?: string;
	id?: number;
	login?: string;
	phone?: string;
	second_name?: string;
};

type PasswordRequestData = {
	oldPassword: string;
	newPassword: string;
};
const options = {
	headers: {
		Accept: 'application/json',
	},
};

export const userAPI = {
	changeInfo: (data: UserRequestData) => HTTPTransport.put('/user/profile', { data }),

	changePassword: (data: PasswordRequestData) => HTTPTransport.put('/user/password', { data }),

	changeAvatar: (data: File) => HTTPTransport.put('/user/profile/avatar', { ...options, data }),
};
