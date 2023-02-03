import { Block, CoreRouter, Store, BlockProps } from 'core';
import { validateForm, withRouter, withStore } from 'utils';
import { changeInfo, logout } from 'services';

type ProfilePageProps = Partial<AppState> & {
	router: CoreRouter;
	store: Store<AppState>;
	toChats?: () => void;
	changeInfo?: () => void;
	onChangePassword?: () => void;
	onSignin?: () => void;
	deactivatedChange?: boolean;
	saveInfo?: () => void;
	cancelChangeInfo?: () => void;
};

class ProfilePage extends Block<ProfilePageProps> {
	constructor(props: ProfilePageProps) {
		super(props);

		this.setProps({
			toChats: () => this.toChats(),
			deactivatedChange: true,
			changeInfo: () => this.changeInfo(),
			onChangePassword: () => this.onChangePassword(),
			onSignin: () => this.onSignin(),
			saveInfo: () => this.saveInfo(),
			cancelChangeInfo: () => this.cancelChangeInfo(),
		});
	}

	componentDidUpdate() {
		return window.store.getState().screen === 'profile';
	}

	toChats() {
		this.props.router.go('/messenger');
	}

	changeInfo() {
		const allInputs = [];

		for (const key in this.refs) {
			allInputs.push(key);
		}

		this.setProps({
			deactivatedChange: false,
		});

		allInputs.forEach((input) => {
			this.refs[input].setProps({
				disabled: false,
				activeClass: 'active-input',
			});
		});
	}

	onChangePassword() {
		this.props.router.go('/password');
	}
	onSignin() {
		window.store.dispatch({
			isLoading: false,
			loginFormError: null,
			user: null,
		});
		window.store.dispatch(logout);
	}

	saveInfo() {
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
			window.store.dispatch(changeInfo, formData);

			for (const key in this.refs) {
				this.refs[key].setProps({
					disabled: true,
					activeClass: '',
				});
			}

			this.setProps({
				deactivatedChange: true,
			});
		}
	}

	cancelChangeInfo() {
		for (const key in this.refs) {
			this.refs[key].setProps({
				disabled: true,
				activeClass: '',
			});
		}

		this.setProps({
			deactivatedChange: true,
		});
	}

	render() {
		const user = this.props.user;

		return `
			<div class="profile__container" data-testid="profile-screen">
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
						<div class="profile__info">
								<div class="profile__info-conainer">
								  {{{ProfileLine
										ref="email"
										label="Почта"
										name="email"
										type="text"
										placeholder="Укажите почту"
										disabled=true
										activeClass=""
										value="${user ? user!.email : ''}"
									}}}
									{{{ProfileLine
										ref="login"
										label="Логин"
										name="login"
										type="text"
										placeholder="Введите логин"
										disabled=true
										activeClass=""
										value="${user ? user!.login : ''}"
									}}}
									{{{ProfileLine
										ref="first_name"
										label="Имя"
										name="first_name"
										type="text"
										placeholder="Введите имя"
										disabled=true
										activeClass=""
										value="${user ? user!.firstName : ''}"
									}}}
									{{{ProfileLine
										ref="second_name"
										label="Фамилия"
										name="second_name"
										type="text"
										placeholder="Введите фамилию"
										disabled=true
										activeClass=""
										value="${user ? user!.secondName : ''}"
									}}}
									{{{ProfileLine
										ref="display_name"
										label="Имя в чате"
										name="display_name"
										type="text"
										placeholder="Укажите имя для чата"
										disabled=true
										activeClass=""
										value="${user ? (user!.displayName ? user!.displayName : user!.firstName) : ''}"
									}}}
									{{{ProfileLine
										ref="phone"
										label="Телефон"
										name="phone"
										type="text"
										placeholder="Укажите телефон"
										disabled=true
										activeClass=""
										value="${user ? user!.phone : ''}"
									}}}
								</div>
						</div>
						{{#if deactivatedChange}}
							{{{ProfileLink
								className="blue-link"
								text="Изменить данные"
								onClick=changeInfo
							}}}
							{{{ProfileLink
								className="blue-link"
								text="Изменить пароль"
								onClick=onChangePassword
								dataTestId="to-password-btn"
							}}}
							{{{ProfileLink
								className="red-link"
								text="Выйти"
								onClick=onSignin
								dataTestId="logout-btn"
							}}}
						{{else}}
							{{{Button
								buttonClass="button-wrapper"
								textClass="button"
								type="submit"
								text="Сохранить"
								onClick=saveInfo
							}}}
							{{{ProfileLink
								className="blue-link"
								addClassName="centered"
								text="Отмена"
								onClick=cancelChangeInfo
							}}}
						{{/if}}
				</main>
			</div>
		`;
	}
}

const ComposedProfile = withRouter(
	withStore<ProfilePageProps, { user: Nullable<User>; appIsInited: boolean; screen: AppState }>(
		ProfilePage,
		(state: AppState) => ({
			appIsInited: state.appIsInited,
			screen: state.screen,
			user: state.user,
		})
	)
);

export { ComposedProfile as ProfilePage };
