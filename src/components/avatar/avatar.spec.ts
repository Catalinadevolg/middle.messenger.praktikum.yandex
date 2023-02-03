import { getByTestId } from '@testing-library/dom';
import { renderBlock } from 'tests/renderUtils';
import { Avatar } from './avatar';

describe('components/Button', () => {
	it('should render avatar', () => {
		renderBlock({ Block: Avatar, props: { onClick: () => {} } });

		const avatar = getByTestId(document.body, 'avatar');

		expect(avatar).toBeInTheDocument();
	});
});
