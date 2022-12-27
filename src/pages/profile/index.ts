import { renderDOM } from 'core/renderDOM';
import { registerComponent } from 'core/registerComponent';

import ProfilePage from './profile';
import InputForProfile from 'components/input-for-profile';
import Error from 'components/error';
import ProfileLine from 'components/profile-line';
import ProfileLink from 'components/profile-link';
import Avatar from 'components/avatar';

document.addEventListener('DOMContentLoaded', () => {
	registerComponent(InputForProfile);
	registerComponent(Error);
	registerComponent(ProfileLine);
	registerComponent(ProfileLink);
	registerComponent(Avatar);

	renderDOM(new ProfilePage());
});
