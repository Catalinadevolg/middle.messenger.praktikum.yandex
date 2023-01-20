const checkAndErrorObject = {
	password: {
		regExp: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=^.{8,40}$).*$/,
		error: '8 - 40 символов: латиница, цифры (минимум одна заглавная буква и цифра)',
	},
	oldPassword: {
		regExp: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=^.{8,40}$).*$/,
		error: '8 - 40 символов: латиница, цифры (минимум одна заглавная буква и цифра)',
	},
	newPassword: {
		regExp: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=^.{8,40}$).*$/,
		error: '8 - 40 символов: латиница, цифры (минимум одна заглавная буква и цифра)',
	},
	confirmedPassword: {
		regExp: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=^.{8,40}$).*$/,
		error: '8 - 40 символов: латиница, цифры (минимум одна заглавная буква и цифра)',
	},
	email: {
		regExp: /^[-\w.]+@[A-z0-9]+\.+[A-z]{2,}$/,
		error: 'Email введён некорректно',
	},
	login: {
		regExp: /^[a-zA-Z0-9-_]{3,20}[a-zA-Z][a-zA-Z0-9-_]{0,2}$/,
		error: '3 - 20 символов: латиница (допустимы дефис и нижнее подчеркивание)',
	},
	first_name: {
		regExp: /^[A-ZА-Я]{1,1}[a-zа-я]{0,50}$/,
		error: 'Латиница/кириллица, первая буква заглавная (допустим дефис)',
	},
	second_name: {
		regExp: /^[A-ZА-Я]{1,1}[a-zа-я]{0,50}$/,
		error: 'Латиница/кириллица, первая буква заглавная (допустим дефис)',
	},
	phone: {
		regExp: /^[+]{0,1}[0-9]{11,15}$/,
		error: 'Телефон введён некорректно',
	},
	id: {
		regExp: /^[0-9]{0,15}$/,
		error: 'ID введён некорректно',
	},
};

export function validateForm(name: string, value: string): string {
	const checkAndErrorArr = Object.entries(checkAndErrorObject).filter(([key]) => key == name);

	if (checkAndErrorArr.length == 0) {
		return '';
	}
	const checkAndError = checkAndErrorArr[0][1];
	if (!checkAndError.regExp.test(value)) {
		return checkAndError.error;
	}
	return '';
}
