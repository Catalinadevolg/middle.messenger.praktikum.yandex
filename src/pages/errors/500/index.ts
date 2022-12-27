import { renderDOM } from 'core/renderDOM';
import Error500 from './500';

document.addEventListener('DOMContentLoaded', () => {
	renderDOM(new Error500());
});
