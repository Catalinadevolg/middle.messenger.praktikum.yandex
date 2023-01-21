import { renderDOM } from 'core/renderDOM';
import { registerComponent } from 'core/registerComponent';

import SigninPage from './signin';
import Button from 'components/button';
import Input from 'components/input';
import Error from 'components/error';
import ControlledInput from 'components/controlled-input';

document.addEventListener('DOMContentLoaded', () => {
	registerComponent(Button);
	registerComponent(Input);
	registerComponent(Error);
	registerComponent(ControlledInput);

	renderDOM(new SigninPage());
});
