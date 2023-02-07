import { Block } from 'core';

import { CoreRouter } from 'core/router/coreRouter';
import { Store } from 'core/store';
import { withRouter, withStore } from 'utils';

type OnBoardingPageProps = {
	router: CoreRouter;
	store: Store<AppState>;
	toSignin?: () => void;
	toSignup?: () => void;
	toMessenger?: () => void;
	toProfile?: () => void;
	toError404?: () => void;
	toError500?: () => void;
};
class OnBoardingPage extends Block<OnBoardingPageProps> {
	static componentName = 'OnboardingPage';

	constructor(props: OnBoardingPageProps) {
		super(props);

		this.setProps({
			toSignin: () => this.toSignin(),
			toSignup: () => this.toSignup(),
			toMessenger: () => this.toMessenger(),
			toProfile: () => this.toProfile(),
			toError404: () => this.toError404(),
			toError500: () => this.toError500(),
		});
	}

	toSignin() {
		this.props.router.go('/sign-in');
	}
	toSignup() {
		this.props.router.go('/sign-up');
	}
	toMessenger() {
		this.props.router.go('/messenger');
	}
	toProfile() {
		this.props.router.go('/profile');
	}
	toError404() {
		this.props.router.go('/error404');
	}
	toError500() {
		this.props.router.go('/error500');
	}

	render() {
		return `
			<nav>
				<ul style="text-align: left; margin-left: 10px; margin-top: 10px;">
					<li style="margin-bottom: 5px; list-style: square inside;">
						{{{Button
							type="button"
							text="Sign in"
							onClick=toSignin
						}}}
					</li>
					<li style="margin-bottom: 5px; list-style: square inside;">
					{{{Button
						type="button"
						text="Sign up"
						onClick=toSignup
					}}}
					</li>
					<li style="margin-bottom: 5px; list-style: square inside;">
					{{{Button
						type="button"
						text="Messenger"
						onClick=toMessenger
					}}}
					</li>
					<li style="margin-bottom: 5px; list-style: square inside;">
					{{{Button
						type="button"
						text="Profile"
						onClick=toProfile
					}}}
					</li>
					<li style="margin-bottom: 5px; list-style: square inside;">
					{{{Button
						type="button"
						text="Error 404"
						onClick=toError404
					}}}
					</li>
					<li style="margin-bottom: 5px; list-style: square inside;">
					{{{Button
						type="button"
						text="Error 500"
						onClick=toError500
					}}}
					</li>
				</ul>
			</nav>
		`;
	}
}

export default withRouter(
	withStore<OnBoardingPageProps, { appIsInited: boolean; screen: AppState; isLoading: boolean }>(
		OnBoardingPage,
		(state: AppState) => ({
			appIsInited: state.appIsInited,
			screen: state.screen,
			isLoading: state.isLoading,
		})
	)
);
