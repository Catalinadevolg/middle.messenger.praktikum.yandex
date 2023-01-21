import { SigninPage } from 'pages/form-pages/signin';
import { SignupPage } from 'pages/form-pages/signup';
import { MessengerPage } from 'pages/messenger';
import { ProfilePage } from 'pages/profile';
import { ChangePasswordPage } from 'pages/profile/change-password';
import { Error404Page } from 'pages/errors/404';
import { Error500Page } from 'pages/errors/500';
import OnboardingPage from 'pages/onboarding';
import { BlockClass } from 'core';

export enum Screens {
	SignIn = 'sign-in',
	SignUp = 'sign-up',
	Error404 = 'error404',
	Error500 = 'error500',
	Profile = 'profile',
	Password = 'password',
	Messenger = 'messenger',
	Onboarding = 'onboadring',
}

const map: Record<Screens, BlockClass<any>> = {
	[Screens.SignIn]: SigninPage,
	[Screens.SignUp]: SignupPage,
	[Screens.Error404]: Error404Page,
	[Screens.Error500]: Error500Page,
	[Screens.Profile]: ProfilePage,
	[Screens.Password]: ChangePasswordPage,
	[Screens.Messenger]: MessengerPage,
	[Screens.Onboarding]: OnboardingPage,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
	return map[screen];
};
