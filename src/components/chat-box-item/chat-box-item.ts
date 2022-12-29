import Block from 'core/Block';

interface ChatBoxItemProps {
	userAvatar: string;
	userName: string;
}
export class ChatBoxItem extends Block<ChatBoxItemProps> {
	static componentName = 'ChatBoxItem';

	constructor({ ...props }: ChatBoxItemProps) {
		super({ ...props });

		this.setProps({
			listMessages: [
				{
					message:
						'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi repellat est quos dolor sunt eius eveniet eaque nemo illo ad cumque iure reiciendis, velit totam, optio inventore sint ipsum magnam.',
					direction: 'in',
					time: new Date().toLocaleTimeString(),
				},
				{
					message:
						'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi repellat est quos dolor sunt eius eveniet eaque nemo illo ad cumque iure reiciendis, velit totam, optio inventore sint ipsum magnam.',
					direction: 'out',
					time: new Date().toLocaleTimeString(),
				},
				{
					message: 'Здесь какой-то текст',
					direction: 'out',
					time: new Date().toLocaleTimeString(),
				},
				{
					message:
						'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi repellat est quos dolor sunt eius eveniet eaque nemo illo ad cumque iure reiciendis, velit totam, optio inventore sint ipsum magnam.',
					direction: 'in',
					time: new Date().toLocaleTimeString(),
				},
				{
					message:
						'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi repellat est quos dolor sunt eius eveniet eaque nemo illo ad cumque iure reiciendis, velit totam, optio inventore sint ipsum magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi repellat est quos dolor sunt eius eveniet eaque nemo illo ad cumque iure reiciendis, velit totam, optio inventore sint ipsum magnam.',
					direction: 'in',
					time: new Date().toLocaleTimeString(),
				},
			],
			activeChat: 1,
			onClick: () => {
				const formData: any = {};

				const inputEl = this.refs.inputRef.getContent() as HTMLInputElement;

				if (inputEl.value) {
					formData[inputEl.name] = inputEl.value;
					console.log(formData);
				}
			},
		});
	}

	render() {
		return `
			<div class="chat-box_active">
				<div class="chat-box__container">
					<div class="chat-box__header">
							<div class="chat-box__user-info">
									<div class="user-info__avatar">
											<img src="{{userAvatar}}" alt="avatar" class="user-info__img">
									</div>
									<p class="user-info__name">{{userName}}</p>
							</div>
							<button class="chat-box__settings-btn">
									<div class="settings-btn">
											<div class="btn-point"></div>
											<div class="btn-point btn-point_middle"></div>
											<div class="btn-point"></div>
									</div>
							</button>
					</div>
					<div class="chat-box__main">
							<!--<p class="chat-box__empty">Здесь ещё нет сообщений.</p>-->
							<div class="chat-box__date"><time>23 декабря</time></div>
							{{#each listMessages}}
								{{{Message
									message=this.message
									direction=this.direction
									time=this.time
								}}}
							{{/each}}
					</div>
					<div class="chat-box__footer">
							<form class="chat-box__form">
								{{{Input
									ref="inputRef"
									type="text"
									name="message"
									placeholder="Сообщение"
									className="chat-box__input"
								}}}
								{{{Button
									buttonClass="chat-box__btn"
									onClick=onClick
								}}}
							</form>
					</div>
				</div>
			</div>
		`;
	}
}
