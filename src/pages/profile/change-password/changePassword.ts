import Block from 'core/Block';
import { validateForm } from 'helpers/validateForm';

import defaultAvatar from 'assets/empty-avatar.png';

export default class ChangePasswordPage extends Block {
	constructor() {
		super();

		Object.values(this.refs).forEach((ref: any) => {
			ref.refs.inputRef.setProps({
				value: '',
			});
		});

		console.log(this.refs);

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
			<div class="profile__container">
				<a href="messenger.html" class="profile__back-btn">
						<div class="back-btn"></div>
				</a>
				<main class="profile">
						{{{Avatar userAvatar="${defaultAvatar}" className="profile__avatar" textClassName="avatar__text"}}}
						<p class="profile__name">Иван</p>
						<div class="profile__info">
								<div class="profile__info-conainer">
									{{{ProfileLine
										label="Старый пароль"
										name="oldPassword"
										type="password"
										placeholder="Введите старый пароль"
										disabled=false
										activeClass=""
										ref="oldPassword"
										onInput=onInput
										onBlur=onBlur
										onFocus=onFocus
										value=""
									}}}
									{{{ProfileLine
										label="Новый пароль"
										name="newPassword"
										type="password"
										placeholder="Придумайте пароль"
										disabled=false
										activeClass=""
										ref="newPassword"
										onInput=onInput
										onBlur=onBlur
										onFocus=onFocus
									}}}
									{{{ProfileLine
										label="Повторите новый пароль"
										name="confirmedPassword"
										type="password"
										placeholder="Повторите пароль"
										disabled=false
										activeClass=""
										ref="confirmedPassword"
										onInput=onInput
										onBlur=onBlur
										onFocus=onFocus
									}}}
								</div>
						</div>
						<div class="profile__button">
							{{{Button
								buttonClass="button-wrapper"
								textClass="button"
								text="Сохранить"
								onClick=onClick
							}}}
						</div>
				</main>
			</div>
		`;
	}
}
