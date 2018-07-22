import {curry, flip} from 'ramda';

export const randomInt = curry((min, max) => {
	const validMin = Math.ceil(min);
	const validMax = Math.floor(max);

	return Math.floor(Math.random() * (validMax - validMin)) + validMin;
});

export const parseInteger = flip(curry(Number.parseInt));
export const parseBase10Int = parseInteger(10);
