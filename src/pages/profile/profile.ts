import { Block, CoreRouter, Store } from 'core';
import { validateForm, withRouter, withStore } from 'utils';
import { changeInfo, logout } from 'services';

type ProfilePageProps = {
	router: CoreRouter;
	store: Store<AppState>;
	user: User | null;
	toChats: () => void;
	changeInfo?: () => void;
	onChangePassword?: () => void;
	onSignin?: () => void;
	deactivatedChange: boolean;
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

	toChats() {
		this.props.router.go('/messenger');
	}

	changeInfo() {
		const allInputs = [];
		// const allLinks = [];

		for (const key in this.refs) {
			allInputs.push(key);
			// if (key === 'info-link' || key === 'password-link' || key === 'logout-link') {
			// 	allLinks.push(key);
			// } else {
			// 	allInputs.push(key);
			// }
		}

		this.props.deactivatedChange = false;

		allInputs.forEach((input) => {
			//@ts-ignore
			const arrProps = this.refs[input].props;
			arrProps.disabled = false;
			arrProps.activeClass = 'active-input';
		});

		// allLinks.forEach((link) => {
		// 	//@ts-ignore
		// 	const arrProps = this.refs[link].props;
		// 	arrProps.visibilityClass = 'invisible-item';
		// });

		// const allInputs = this.refs;
		// Object.values(allInputs).forEach((input) => {
		// 	//@ts-ignore
		// 	const arrProps = [input.props];
		// 	for (let i = 0; i < arrProps.length; i++) {
		// 		arrProps[i].disabled = false;
		// 		arrProps[i].activeClass = 'active-input';
		// 	}
		// });
	}

	onChangePassword() {
		this.props.router.go('/password');
	}
	onSignin() {
		this.props.store.dispatch({
			appIsInited: false,
			isLoading: false,
			loginFormError: null,
			user: null,
		});
		this.props.store.dispatch(logout);
	}

	saveInfo() {
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
			this.props.store.dispatch(changeInfo, formData);

			const allInputs = [];

			for (const key in this.refs) {
				allInputs.push(key);
			}
			allInputs.forEach((input) => {
				//@ts-ignore
				const arrProps = this.refs[input].props;
				arrProps.disabled = true;
				arrProps.activeClass = '';
			});

			this.props.deactivatedChange = true;
		}
	}

	cancelChangeInfo() {
		const allInputs = [];

		for (const key in this.refs) {
			allInputs.push(key);
		}
		allInputs.forEach((input) => {
			//@ts-ignore
			const arrProps = this.refs[input].props;
			arrProps.disabled = true;
			arrProps.activeClass = '';
		});

		this.props.deactivatedChange = true;
	}

	render() {
		const user = this.props.store.getState().user;

		return `
			<div class="profile__container">
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
							}}}
							{{{ProfileLink
								className="red-link"
								text="Выйти"
								onClick=onSignin
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

const ComposedProfile = withRouter(withStore(ProfilePage));

export { ComposedProfile as ProfilePage };
