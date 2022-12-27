import { renderDOM } from 'core/renderDOM';
import { registerComponent } from 'core/registerComponent';

import MessengerPage from './messenger';
import ChatListItem from 'components/chat-list-item';
import ChatPlug from 'components/chat-plug';
import ChatBoxItem from 'components/chat-box-item';
import Message from 'components/message';
import Input from 'components/input';
import Button from 'components/button';

document.addEventListener('DOMContentLoaded', () => {
	registerComponent(ChatListItem);
	registerComponent(ChatPlug);
	registerComponent(ChatBoxItem);
	registerComponent(Message);
	registerComponent(Input);
	registerComponent(Button);

	renderDOM(new MessengerPage());
});
