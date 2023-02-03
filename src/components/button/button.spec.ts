import { getByRole } from '@testing-library/dom';
import { renderBlock } from 'tests/renderUtils';
import { Button } from './button';

describe('components/Button', () => {
	// Unit-test на UI компонент
	it('should render button', () => {
		renderBlock({ Block: Button, props: { text: '123', onClick: () => {} } });

		const button = getByRole(document.body, 'button');

		expect(button).toBeInTheDocument();
	});

	// Unit-test на UI компонент с событием
	it('should call onClick wgen User press button', () => {
		// 1. Arrange
		const mock = jest.fn();

		renderBlock({
			Block: Button,
			props: { text: '123', onClick: mock },
		});

		// 2. Act
		getByRole(document.body, 'button').click();

		// 3. Assert
		expect(mock).toBeCalled();
	});
});
