import Block from 'core/Block';
import { renderDOM } from 'core/renderDOM';

import SigninPage from './form-pages/signin/signin';
import SignupPage from './form-pages/signup/signup';
import MessengerPage from './messenger/messenger';
import ProfilePage from './profile/profile';
import Error404 from './errors/404/404';
import Error500 from './errors/500/500';

interface OnBoardingProps {}
export default class OnBoarding extends Block<OnBoardingProps> {
	constructor() {
		super();
		this.setProps({
			toSignin: (e: FocusEvent) => {
				e.preventDefault();
				renderDOM(new SigninPage());
			},
			toSignup: (e: FocusEvent) => {
				e.preventDefault();
				renderDOM(new SignupPage());
			},
			toMessenger: (e: FocusEvent) => {
				e.preventDefault();
				renderDOM(new MessengerPage());
			},
			toProfile: (e: FocusEvent) => {
				e.preventDefault();
				renderDOM(new ProfilePage());
			},
			toError404: (e: FocusEvent) => {
				e.preventDefault();
				renderDOM(new Error404());
			},
			toError500: (e: FocusEvent) => {
				e.preventDefault();
				renderDOM(new Error500());
			},
		});
	}
	render() {
		return `
			<nav>
				<ul style="text-align: left; margin-left: 10px; margin-top: 10px;">
					<li style="margin-bottom: 5px; list-style: square inside;">
						{{{Link
							link="signin.html"
							text="Sign in"
							onClick=toSignin
						}}}
					</li>
					<li style="margin-bottom: 5px; list-style: square inside;">
					{{{Link
						link="signup.html"
						text="Sign up"
						onClick=toSignup
					}}}
					</li>
					<li style="margin-bottom: 5px; list-style: square inside;">
					{{{Link
						link="messenger.html"
						text="Messenger"
						onClick=toMessenger
					}}}
					</li>
					<li style="margin-bottom: 5px; list-style: square inside;">
					{{{Link
						link="profile.html"
						text="Profile"
						onClick=toProfile
					}}}
					</li>
					<li style="margin-bottom: 5px; list-style: square inside;">
					{{{Link
						link="404.html"
						text="Error 404"
						onClick=toError404
					}}}
					</li>
					<li style="margin-bottom: 5px; list-style: square inside;">
					{{{Link
						link="500.html"
						text="Error 500"
						onClick=toError500
					}}}
					</li>
				</ul>
			</nav>
		`;
	}
}
