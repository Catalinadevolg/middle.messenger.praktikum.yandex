import { Block } from 'core';

export function renderDOM(block: Block) {
	const root = document.querySelector('#app');

	root!.innerHTML = '';
	root!.appendChild(block.getContent());
}
