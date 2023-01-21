import Block from 'core/Block';
import { validateForm } from 'helpers/validateForm';

interface SigninPageProps {}
export default class SigninPage extends Block<SigninPageProps> {
	constructor() {
		super();

		this.setProps({
			onClick: () => {
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
			<main class='form-page signin'>
				<div class='form-page__container'>
					<h1 class='form-page__title'>Вход</h1>
					<form class='form-page__form'>
						<div class="form-page__inputs">
							{{{ControlledInput
								ref='login'
								label='Логин'
								type='text'
								name='login'
								placeholder='Логин'
							}}}
							{{{ControlledInput
								ref='oldPassword'
								label='Пароль'
								type='password'
								name='oldPassword'
								placeholder='Пароль'
							}}}
						</div>
						<div class='form-page__btns'>
							{{{Button
								buttonClass="button-wrapper"
								textClass="button"
								type="submit"
								text='Авторизоваться'
								onClick=onClick
							}}}
							<a href='signup.html' class='form-page__link'>Нет аккаунта?</a>
						</div>
					</form>
				</div>
			</main>
		`;
	}
}
