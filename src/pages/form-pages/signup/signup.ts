import { Block, CoreRouter, Store, BlockProps } from 'core';
import { validateForm, withRouter, withStore } from 'utils';
import { signup } from 'services';

type SignupPageProps = {
	router: CoreRouter;
	store: Store<AppState>;
	onSignup?: () => void;
	toSignin?: () => void;
	formError?: () => void;
};

class SignupPage extends Block<SignupPageProps> {
	constructor(props: SignupPageProps) {
		super(props);

		this.setProps({
			onSignup: () => this.onSignup(),
			toSignin: () => this.toSignin(),
			formError: () => this.displayError(),
		});
	}

	displayError() {
		const error = this.props.store.getState().loginFormError;
		if (error === 'Login already exists') {
			return 'Логин уже существует';
		}
		if (error === 'Email already exists') {
			return 'Email уже используется';
		}

		return error;
	}

	onSignup() {
		const formData: Record<string, unknown> = {};
		let errors = false;

		Object.values(this.refs).forEach((ref: Block<BlockProps>) => {
			// @ts-ignore
			const inputEl = ref.refs.inputRef.getContent() as HTMLInputElement;

			formData[inputEl.name] = inputEl.value;

			const errorText = validateForm(inputEl.name, inputEl.value);

			if (errors === false && errorText) {
				errors = true;
			}

			// @ts-ignore
			ref.refs.errorRef.setProps({
				errorText: errorText,
			});
		});

		if (errors === false && formData) {
			this.props.store.dispatch(signup, formData);
		}
	}

	toSignin() {
		this.props.router.go('/sign-in');
	}

	render() {
		return `
		<main class="form-page signup">
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
							controlledInputClassName='controlled-input'
							inputClassName='input__input'
						}}}
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
							ref='first_name'
							label='Имя'
							type='text'
							name='first_name'
							placeholder='Имя'
							controlledInputClassName='controlled-input'
							inputClassName='input__input'
						}}}
						{{{ControlledInput
							ref='second_name'
							label='Фамилия'
							type='text'
							name='second_name'
							placeholder='Фамилия'
							controlledInputClassName='controlled-input'
							inputClassName='input__input'
						}}}
						{{{ControlledInput
							ref='phone'
							label='Телефон'
							type='text'
							name='phone'
							placeholder='Телефон'
							controlledInputClassName='controlled-input'
							inputClassName='input__input'
						}}}
						{{{ControlledInput
							ref='password'
							label='Пароль'
							type='password'
							name='password'
							placeholder='Пароль'
							controlledInputClassName='controlled-input'
							inputClassName='input__input'
						}}}
						{{{ControlledInput
							ref='confirmedPassword'
							label='Пароль (ещё раз)'
							type='password'
							name='confirmedPassword'
							placeholder='Пароль (ещё раз)'
							controlledInputClassName='controlled-input'
							inputClassName='input__input'
						}}}
					</div>
					{{{Error
						errorClass="form-page__error"
						errorText=formError
					}}}
					<div class="form-page__btns">
						{{{Button
							buttonClass="button-wrapper"
							textClass="button"
							type="submit"
							text='Зарегистрироваться'
							onClick=onSignup
						}}}
						{{{Link
							linkClass="form-page__link"
							text="Войти"
							onClick=toSignin
						}}}
					</div>
				</form>
			</div>
		</main>
		`;
	}
}

const ComposedSignup = withRouter(withStore(SignupPage));

export { ComposedSignup as SignupPage };
