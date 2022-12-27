import Block from 'core/Block';

export default class Error500 extends Block {
	render() {
		return `
		<div class="error-page">
			<p class="error-page__title">500</p>
			<p class="error-page__text">Мы уже фиксим</p>
			<a href="messenger.html" class="error-page__link">Назад к чатам</a>
		</div>
		`;
	}
}
