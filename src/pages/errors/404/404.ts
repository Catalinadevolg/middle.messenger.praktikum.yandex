import { Block } from 'core';

export class Error404Page extends Block {
	render() {
		return `
		<main class="error-page">
			<p class="error-page__title">404</p>
			<p class="error-page__text">Не туда попали</p>
			<a href="messenger.html" class="error-page__link">Назад к чатам</a>
		</main>
		`;
	}
}
