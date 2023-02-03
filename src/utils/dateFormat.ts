function deleteSeconds(date: string) {
	return date.split(':').slice(0, -1).join(':');
}

function isToday(date: Date, currentDate: Date) {
	if (
		currentDate.getDate() === date.getDate() &&
		currentDate.getMonth() === date.getMonth() &&
		currentDate.getFullYear() === date.getFullYear()
	) {
		return true;
	}
	return false;
}

function isDayFromLastWeek(date: Date, currentDate: Date) {
	return (+currentDate - +date) / 86400000 < 7;
}

function getWeekdayName(index: number) {
	const weekDays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
	return weekDays[index];
}

function isDayFromThisYear(date: Date, currentDate: Date) {
	return currentDate.getFullYear() === date.getFullYear();
}

export function dateFormat(date: Date, type: string) {
	const currentDate = new Date();

	if (isToday(date, currentDate)) {
		return deleteSeconds(date.toLocaleTimeString());
	}

	if (isDayFromLastWeek(date, currentDate) && type === 'lastMessage') {
		return getWeekdayName(date.getDay());
	}

	if (isDayFromThisYear(date, currentDate)) {
		if (type === 'lastMessage') {
			return date.toLocaleDateString('ru', { month: 'long', day: 'numeric' });
		}
		if (type === 'message') {
			return date.toLocaleDateString('ru', {
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
			});
		}
	}

	if (type === 'message') {
		return date.toLocaleDateString('ru', {
			year: '2-digit',
			month: '2-digit',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		});
	}

	return date.toLocaleDateString('ru', { year: 'numeric', month: 'long', day: 'numeric' });
}
