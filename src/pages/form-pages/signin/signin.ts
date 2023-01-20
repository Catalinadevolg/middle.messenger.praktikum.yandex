import { Block, CoreRouter, Store } from 'core';
import { validateForm, withRouter, withStore } from 'utils';
import { signin } from 'services';

type SigninPageProps = {
	router: CoreRouter;
	store: Store<AppState>;
	onSignin?: () => void;
	toSignup?: () => void;
	formError?: () => void;
};
class SigninPage extends Block<SigninPageProps> {
	static componentName = 'SigninPage';

	constructor(props: SigninPageProps) {
		super(props);

		this.setProps({
			onSignin: () => this.onSignin(),
			toSignup: () => this.toSignup(),
			// TODO:
			// 1. При переходе на signup formError не обновляется
			// 2. При ошибке 'User already in system' добавить кнопку для перехода в мессенджер
			formError: () => this.displayError(),
		});
	}

	onSignin() {
		const formData: any = {};
		let errors = false;

		Object.values(this.refs).forEach((ref: any) => {
			const inputEl = ref.refs.inputRef.getContent() as HTMLInputElement;

			formData[inputEl.name] = inputEl.value;

			const errorText = validateForm(inputEl.name, inputEl.value);

			if (errors === false && errorText) {
				errors = true;
			}

			ref.refs.errorRef.setProps({
				errorText: errorText,
			});
		});

		if (errors === false && formData) {
			this.props.store.dispatch(signin, formData);
			console.log(this.props.store.getState().loginFormError);
		}
	}

	toSignup() {
		this.props.router.go('/sign-up');
	}

	displayError() {
		const error = this.props.store.getState().loginFormError;
		if (error === 'User already in system') {
			return 'Вы уже вошли';
		}
		if (error === 'Login or password is incorrect') {
			return 'Неверный логин и/или пароль';
		}

		return error;
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
								controlledInputClassName='controlled-input'
								inputClassName='input__input'
							}}}
							{{{ControlledInput
								ref="oldPassword"
								label="Пароль"
								type="password"
								name="password"
								placeholder="Пароль"
								controlledInputClassName="controlled-input"
								inputClassName="input__input"
							}}}
						</div>
						{{{Error
							errorClass="form-page__error"
							errorText=formError
						}}}
						<div class='form-page__btns'>
							{{{Button
								buttonClass="button-wrapper"
								textClass="button"
								type="submit"
								text='Авторизоваться'
								onClick=onSignin
							}}}
							{{{Link
								linkClass="form-page__link"
								text="Нет аккаунта?"
								onClick=toSignup
							}}}
						</div>
					</form>
				</div>
			</main>
		`;
	}
}

const ComposedSignin = withRouter(withStore(SigninPage));

export { ComposedSignin as SigninPage };
