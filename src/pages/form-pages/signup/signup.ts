import Block from 'core/Block';
import { validateForm } from 'helpers/validateForm';

export default class SignupPage extends Block {
	constructor() {
		super();

		this.setProps({
			onSubmit: () => {
				const formData: any = {};

				Object.values(this.refs).forEach((ref: any) => {
					const inputEl = ref.refs.inputRef.getContent() as HTMLInputElement;

					formData[inputEl.name] = inputEl.value;

					const errorText = validateForm(inputEl.name, inputEl.value);

					ref.refs.errorRef.setProps({
						errorText: errorText,
					});
				});

				console.log(formData);
			},
		});
	}

	render() {
		return `
		<div class="form-page signup">
			<div class="form-page__container">
				<h1 class="form-page__title">Регистрация</h1>
				<form class="form-page__form">
					<div class="form-page__inputs">
						{{{ControlledInput
							ref='email'
							label='Почта'
							type='text'
							name='email'
							placeholder='Почта'
						}}}
						{{{ControlledInput
							ref='login'
							label='Логин'
							type='text'
							name='login'
							placeholder='Логин'
						}}}
						{{{ControlledInput
							ref='first_name'
							label='Имя'
							type='text'
							name='first_name'
							placeholder='Имя'
						}}}
						{{{ControlledInput
							ref='second_name'
							label='Фамилия'
							type='text'
							name='second_name'
							placeholder='Фамилия'
						}}}
						{{{ControlledInput
							ref='phone'
							label='Телефон'
							type='text'
							name='phone'
							placeholder='Телефон'
						}}}
						{{{ControlledInput
							ref='newPassword'
							label='Пароль'
							type='password'
							name='newPassword'
							placeholder='Пароль'
						}}}
						{{{ControlledInput
							ref='confirmedPassword'
							label='Пароль (ещё раз)'
							type='password'
							name='confirmedPassword'
							placeholder='Пароль (ещё раз)'
						}}}
					</div>
					<div class="form-page__btns">
						{{{Button
							buttonClass="button-wrapper"
							textClass="button"
							text='Зарегистрироваться'
							onSubmit=onSubmit
						}}}
						<a href="signin.html" class="form-page__link">Войти</a>
					</div>
				</form>
			</div>
		</div>
		`;
	}
}
