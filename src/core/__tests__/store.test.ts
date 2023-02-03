import { Store } from 'core/store';

describe('score/Store', () => {
	// Unit-test изменения state
	it('should set state', () => {
		// 1. Arrange
		const store = new Store({});

		// 2. Act
		store.set({ userId: 123 });

		// 3. Assert
		expect(store.getState()).toStrictEqual({ userId: 123 });
	});

	// Unit-test события
	it('should emit event after store was update', () => {
		// 1. Arrange
		const store = new Store({ userId: 123 });
		const mock = jest.fn();
		store.on('changed', mock);

		// 2. Act
		store.set({ userId: 321 });

		// 3. Assert
		expect(mock).toHaveBeenCalled();
		expect(mock).toHaveBeenCalledTimes(1);
		expect(mock).toHaveBeenCalledWith({ userId: 123 }, { userId: 321 });
	});

	// Unit-test вызова функции
	it('should call callback with store and dispatch when it is function', () => {
		// 1. Arrange
		const store = new Store({ userId: 123 });
		const mock = jest.fn();
		// 2. Act
		store.dispatch(mock, 'payload');
		// 3. Assert
		expect(mock).toHaveBeenCalled();
		expect(mock).toHaveBeenCalledTimes(1);
		expect(mock).toHaveBeenCalledWith(expect.anything(), store.getState(), 'payload');
	});
});
