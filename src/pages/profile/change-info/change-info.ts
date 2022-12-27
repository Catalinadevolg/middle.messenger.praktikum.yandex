import Block from 'core/Block';
import { validateForm } from 'helpers/validateForm';

import defaultAvatar from 'assets/empty-avatar.png';

export default class ProfilePage extends Block {
	constructor() {
		super({
			userInfo: {
				email: 'pochta@yandex.ru',
				login: 'ivanivanov',
				first_name: 'Иван',
				second_name: 'Иванов',
				display_name: 'Иван',
				phone: '+79991234567',
			},
		});

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
			<div class="profile__container">
				<a href="messenger.html" class="profile__back-btn">
						<div class="back-btn"></div>
				</a>
				<div class="profile">
						{{{Avatar
							userAvatar="${defaultAvatar}"
							className="profile__avatar"
							textClassName="avatar__text"
						}}}
						<p class="profile__name">Иван</p>
						<div class="profile__info">
								<div class="profile__info-conainer">
								  {{{ProfileLine
										label="Почта"
										name="email"
										type="text"
										placeholder="Укажите почту"
										disabled=false
										activeClass="active-input"
										ref="email"
										value=userInfo.email
									}}}
									{{{ProfileLine
										label="Логин"
										name="login"
										type="text"
										placeholder="Введите логин"
										disabled=false
										activeClass="active-input"
										ref="login"
										value=userInfo.login
									}}}
									{{{ProfileLine
										label="Имя"
										name="first_name"
										type="text"
										placeholder="Введите имя"
										disabled=false
										activeClass="active-input"
										ref="first_name"
										value=userInfo.first_name
									}}}
									{{{ProfileLine
										label="Фамилия"
										name="second_name"
										type="text"
										placeholder="Введите фамилию"
										disabled=false
										activeClass="active-input"
										ref="second_name"
										value=userInfo.second_name
									}}}
									{{{ProfileLine
										label="Имя в чате"
										name="display_name"
										type="text"
										placeholder="Укажите имя для чата"
										disabled=false
										activeClass="active-input"
										ref="display_name"
										value=userInfo.display_name
									}}}
									{{{ProfileLine
										label="Телефон"
										name="phone"
										type="text"
										placeholder="Укажите телефон"
										disabled=false
										activeClass="active-input"
										ref="phone"
										value=userInfo.phone
									}}}
								</div>
						</div>
						{{{Button
							buttonClass="button-wrapper"
							textClass="button"
							text="Сохранить"
							onSubmit=onSubmit
						}}}
				</div>
			</div>
		`;
	}
}
