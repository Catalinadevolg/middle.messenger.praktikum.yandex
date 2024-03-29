import { Block, CoreRouter, Store, BlockProps } from 'core';
import { validateForm, withRouter, withStore } from 'utils';
import { signin } from 'services';

type SigninPageProps = Partial<AppState> & {
	router: CoreRouter;
	store: Store<AppState>;
	onSignin?: (e: SubmitEvent) => void;
	toSignup?: () => void;
	formError?: () => void;
};
class SigninPage extends Block<SigninPageProps> {
	static componentName = 'SigninPage';

	constructor(props: SigninPageProps) {
		super(props);

		this.setProps({
			onSignin: (e: SubmitEvent) => this.onSignin(e),
			toSignup: () => this.toSignup(),
			formError: () => this.displayError(),
		});
	}

	componentDidUpdate() {
		return window.store.getState().screen === 'sign-in';
	}

	onSignin(e: SubmitEvent) {
		e.preventDefault();
		const formData: Record<string, unknown> = {};
		let errors = false;

		Object.values(this.refs).forEach((ref: Block<BlockProps>) => {
			const inputEl = ref.getRefs().inputRef.getContent() as HTMLInputElement;

			formData[inputEl.name] = inputEl.value;

			const errorText = validateForm(inputEl.name, inputEl.value);

			if (errors === false && errorText) {
				errors = true;
			}

			ref.getRefs().errorRef.setProps({
				errorText: errorText,
			});
		});

		if (errors === false && formData) {
			window.store.dispatch(signin, formData);
		}
	}

	toSignup() {
		this.props.router.go('/sign-up');
	}

	displayError() {
		const error = this.props.loginFormError;
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
			<main class="form-page signin" data-testid="signin-screen">
				{{{Loader}}}
				<div class="form-page__container">
					<h1 class="form-page__title">Вход</h1>
					<form class="form-page__form">
						<div class="form-page__inputs">
							{{{ControlledInput
								ref="login"
								label="Логин"
								type="text"
								name="login"
								placeholder="Логин"
								controlledInputClassName="controlled-input"
								inputClassName="input__input"
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

const ComposedSignin = withRouter(
	withStore<
		SigninPageProps,
		{
			user: Nullable<User>;
			loginFormError: Nullable<string>;
			appIsInited: boolean;
			screen: AppState;
		}
	>(SigninPage, (state: AppState) => ({
		appIsInited: state.appIsInited,
		screen: state.screen,
		user: state.user,
		loginFormError: state.loginFormError,
	}))
);

export { ComposedSignin as SigninPage };
