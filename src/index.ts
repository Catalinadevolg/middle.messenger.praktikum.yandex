import { renderDOM } from 'core/renderDOM';
import { registerComponent } from 'core/registerComponent';

import OnBoarding from './pages';
import Link from './components/link-for-onboarding';
import InputForProfile from './components/input-for-profile';
import Error from './components/error';
import ProfileLine from './components/profile-line';
import ProfileLink from './components/profile-link';
import Avatar from './components/avatar';
import ChatBoxItem from './components/chat-box-item';
import ChatListItem from './components/chat-list-item';
import ChatPlug from './components/chat-plug';
import Button from './components/button';
import ControlledInput from './components/controlled-input';
import Input from './components/input';
import Message from './components/message';

document.addEventListener('DOMContentLoaded', () => {
	registerComponent(Link);
	registerComponent(Avatar);
	registerComponent(Button);
	registerComponent(ChatBoxItem);
	registerComponent(ChatListItem);
	registerComponent(ChatPlug);
	registerComponent(ControlledInput);
	registerComponent(Error);
	registerComponent(Input);
	registerComponent(InputForProfile);
	registerComponent(Message);
	registerComponent(ProfileLine);
	registerComponent(ProfileLink);

	renderDOM(new OnBoarding());
});
