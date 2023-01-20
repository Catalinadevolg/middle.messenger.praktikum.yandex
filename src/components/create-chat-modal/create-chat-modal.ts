import { Block, BlockProps, Store } from 'core';
import { withStore } from 'utils';
import { createChat } from 'services';

type CreateChatModalProps = BlockProps & {
	store: Store<AppState>;
	modalClassName: string;
	createChat?: (e: Event) => void;
	cancelCreating?: () => void;
};
class CreateChatModal extends Block<CreateChatModalProps> {
	static componentName = 'CreateChatModal';

	constructor(props: CreateChatModalProps) {
		super(props);

		this.setProps({
			modalClassName: '',
			createChat: (e: Event) => this.createChat(e),
			cancelCreating: () => this.cancelCreating(),
		});
	}

	createChat(e: Event) {
		e.preventDefault();
		const input = this.refs.modalWindow_input.getContent() as HTMLInputElement;
		const chatTitle = input.value;

		const data = {
			title: `${chatTitle}`,
		};

		this.props.store.dispatch(createChat, data);

		this.props.modalClassName = '';
	}

	cancelCreating() {
		this.props.modalClassName = '';
	}

	render() {
		return `
			<div class="creating-chat__modal${this.props.modalClassName}">
				<div class="creating-chat__box">
					<div class="creating-chat__box-container">
						<form class="creating-chat__form">
							{{{Input
								ref="modalWindow_input"
								type="text"
								placeholder="Введите название чата"
								inputClassName="creating-chat__input"
							}}}
							{{{Button
								buttonClass="button-wrapper"
								textClass="button"
								type="submit"
								text='Создать новый чат'
								onClick=createChat
							}}}
							{{{Link
								linkClass="creating-chat__link"
								text="Отмена"
								onClick=cancelCreating
							}}}
						</form>
					</div>
				</div>
			</div>
		`;
	}
}

const ComposedCreateChatModal = withStore(CreateChatModal);

export { ComposedCreateChatModal as CreateChatModal };
