import { renderDOM } from 'core/renderDOM';
import { registerComponent } from 'core/registerComponent';

import ProfilePage from './change-info';
import InputForProfile from 'components/input-for-profile';
import Error from 'components/error';
import ProfileLine from 'components/profile-line';
import Button from 'components/button';
import Avatar from 'components/avatar';

document.addEventListener('DOMContentLoaded', () => {
	registerComponent(InputForProfile);
	registerComponent(Error);
	registerComponent(ProfileLine);
	registerComponent(Button);
	registerComponent(Avatar);

	renderDOM(new ProfilePage());
});