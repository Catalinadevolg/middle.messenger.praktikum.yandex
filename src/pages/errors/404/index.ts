import { renderDOM } from 'core/renderDOM';
import Error404 from './404';

document.addEventListener('DOMContentLoaded', () => {
	renderDOM(new Error404());
});
