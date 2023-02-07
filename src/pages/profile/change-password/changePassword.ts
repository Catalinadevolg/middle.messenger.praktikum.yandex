import { Block, CoreRouter, Store, BlockProps } from 'core';
import { changePassword } from 'services';
import { validateForm, withRouter, withStore } from 'utils';

type ChangePasswordPageProps = Partial<AppState> & {
	router: CoreRouter;
	store: Store<AppState>;
	toChats: () => void;
	savePassword?: (e: SubmitEvent) => void;
	cancelChangePassword?: () => void;
	formError?: () => void;
};

class ChangePasswordPage extends Block<ChangePasswordPageProps> {
	constructor(props: ChangePasswordPageProps) {
		super(props);

		this.setProps({
			toChats: () => this.toChats(),
			savePassword: (e: SubmitEvent) => this.savePassword(e),
			cancelChangePassword: () => this.cancelChangePassword(),
			formError: () => this.displayError(),
		});
	}

	componentDidUpdate() {
		return window.store.getState().screen === 'password';
	}

	toChats() {
		this.props.router.go('/messenger');
	}

	savePassword(e: SubmitEvent) {
		e.preventDefault();
		const formData: Record<string, unknown> = {};
		let errors = false;

		Object.values(this.refs).forEach((ref: Block<BlockProps>) => {
			const inputEl = ref.getRefs().inputRef.getContent() as HTMLInputElement;

			let errorText = validateForm(inputEl.name, inputEl.value);

			if (inputEl.name !== 'confirmedPassword') {
				formData[inputEl.name] = inputEl.value;
			} else {
				inputEl.value === formData['newPassword']
					? (errorText = '')
					: (errorText = 'Пароли не совпадают');
			}

			if (errors === false && errorText) {
				errors = true;
			}

			ref.getRefs().errorRef.setProps({
				errorText: errorText,
			});
		});

		if (errors === false && formData) {
			window.store.dispatch(changePassword, formData);
		}
	}

	displayError() {
		const error = this.props.loginFormError;
		if (error === 'Password is incorrect') {
			return 'Старый пароль введён некорректно';
		}

		return error;
	}

	cancelChangePassword() {
		this.props.router.go('/profile');
	}

	render() {
		const user = this.props.user;

		return `
			<div class="profile__container" data-testid="password-screen">
				{{{Loader}}}
				<div class="profile__back-btn">
					{{{Button
						buttonClass="back-btn"
						type="button"
						onClick=toChats
					}}}
				</div>
				<main class="profile">
					{{{Avatar
						className="profile__avatar"
						textClassName="avatar__text"
					}}}
					<p class="profile__id">ID: ${user ? user!.id : ''}</p>
					<form>
					<div class="profile__info">
							<div class="profile__info-conainer">
								{{{ProfileLine
									label="Старый пароль"
									name="oldPassword"
									type="password"
									placeholder="Пароль"
									disabled=false
									activeClass=""
									ref="oldPassword"
									onInput=onInput
									onBlur=onBlur
									onFocus=onFocus
								}}}
								{{{ProfileLine
									label="Новый пароль"
									name="newPassword"
									type="password"
									placeholder="Пароль"
									disabled=false
									activeClass=""
									ref="newPassword"
									onInput=onInput
									onBlur=onBlur
									onFocus=onFocus
								}}}
								{{{ProfileLine
									label="Повторите пароль"
									name="confirmedPassword"
									type="password"
									placeholder="Пароль"
									disabled=false
									activeClass=""
									ref="confirmedPassword"
									onInput=onInput
									onBlur=onBlur
									onFocus=onFocus
								}}}
							</div>
					</div>
					{{{Error
						errorClass="form-page__error"
						errorText=formError
					}}}
					<div class="profile__buttons">
						{{{Button
							buttonClass="button-wrapper"
							textClass="button"
							type="submit"
							text="Сохранить"
							onClick=savePassword
						}}}
						<div class="empty-box"></div>
						{{{ProfileLink
							className="blue-link"
							addClassName="centered"
							text="Отмена"
							onClick=cancelChangePassword
						}}}
					</div>
					</form>
				</main>
			</div>
		`;
	}
}

const ComposedChangePassword = withRouter(
	withStore<
		ChangePasswordPageProps,
		{
			user: Nullable<User>;
			loginFormError: Nullable<string>;
			appIsInited: boolean;
			screen: AppState;
		}
	>(ChangePasswordPage, (state: AppState) => ({
		appIsInited: state.appIsInited,
		screen: state.screen,
		user: state.user,
		loginFormError: state.loginFormError,
	}))
);

export { ComposedChangePassword as ChangePasswordPage };
