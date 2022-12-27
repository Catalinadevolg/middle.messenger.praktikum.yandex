import Block from 'core/Block';

export default class Error404 extends Block {
	render() {
		return `
		<div class="error-page">
			<p class="error-page__title">404</p>
			<p class="error-page__text">Не туда попали</p>
			<a href="messenger.html" class="error-page__link">Назад к чатам</a>
		</div>
		`;
	}
}
