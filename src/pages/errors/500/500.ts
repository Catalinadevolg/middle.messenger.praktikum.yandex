import Block from 'core/Block';

interface Error500Props {}

export default class Error500 extends Block<Error500Props> {
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
