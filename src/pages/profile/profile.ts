import Block from 'core/Block';

import defaultAvatar from 'assets/empty-avatar.png';

interface ProfilePageProps {}
export default class ProfilePage extends Block<ProfilePageProps> {
	constructor() {
		super();

		this.setProps({
			userInfo: {
				userAvatar: defaultAvatar,
				email: 'pochta@yandex.ru',
				login: 'ivanivanov',
				first_name: 'Иван',
				second_name: 'Иванов',
				display_name: 'Иван',
				phone: '+79991234567',
			},
		});
	}

	render() {
		return `
			<div class="profile__container">
				<a href="messenger.html" class="profile__back-btn">
						<div class="back-btn"></div>
				</a>
				<main class="profile">
						{{{Avatar
							userAvatar=userInfo.userAvatar
							className="profile__avatar"
							textClassName="avatar__text"
						}}}
						<p class="profile__name">Иван</p>
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
										value=userInfo.email
									}}}
									{{{ProfileLine
										ref="login"
										label="Логин"
										name="login"
										type="text"
										placeholder="Введите логин"
										disabled=true
										activeClass=""
										value=userInfo.login
									}}}
									{{{ProfileLine
										ref="first_name"
										label="Имя"
										name="first_name"
										type="text"
										placeholder="Введите имя"
										disabled=true
										activeClass=""
										value=userInfo.first_name
									}}}
									{{{ProfileLine
										ref="second_name"
										label="Фамилия"
										name="second_name"
										type="text"
										placeholder="Введите фамилию"
										disabled=true
										activeClass=""
										value=userInfo.second_name
									}}}
									{{{ProfileLine
										ref="display_name"
										label="Имя в чате"
										name="display_name"
										type="text"
										placeholder="Укажите имя для чата"
										disabled=true
										activeClass=""
										value=userInfo.display_name
									}}}
									{{{ProfileLine
										ref="phone"
										label="Телефон"
										name="phone"
										type="text"
										placeholder="Укажите телефон"
										disabled=true
										activeClass=""
										value=userInfo.phone
									}}}
								</div>
						</div>
						{{{ProfileLink
							link="changeInfo.html"
							className="blue-link"
							text="Изменить данные"
						}}}
						{{{ProfileLink
							link="changePassword.html"
							className="blue-link"
							text="Изменить пароль"
						}}}
						{{{ProfileLink
							link="signin.html"
							className="red-link"
							text="Выйти"
						}}}
				</main>
			</div>
		`;
	}
}
