import { Block } from 'core';

export class Error500Page extends Block {
	render() {
		return `
		<main class="error-page">
			<p class="error-page__title">500</p>
			<p class="error-page__text">Мы уже фиксим</p>
			<a href="messenger.html" class="error-page__link">Назад к чатам</a>
		</main>
		`;
	}
}
