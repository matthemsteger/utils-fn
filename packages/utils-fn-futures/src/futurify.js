import {node} from 'fluture';
import {
	compose,
	fromPairs,
	chain,
	when,
	is,
	last,
	head,
	of as arrayOf,
	toPairs,
	nAry
} from 'ramda';

/**
 * Futurify a nodeback function
 * @param {function} fn
 * @returns {function}
 */
export function futurify(fn) {
	const arity = Math.max(fn.length - 1, 0);
	function futurified(...args) {
		return node((callback) => {
			fn(...args, callback);
		});
	}

	/**
	 * nAry does not support arity of greater than 10
	 */
	if (arity > 10) {
		return futurified;
	}

	return nAry(arity, futurified);
}

/**
 * Futurify an object with values as functions
 * @param {Object.<string, function>} obj
 * @returns {Object.<string, function>}
 */
export const futurifyAll = compose(
	fromPairs,
	chain(
		compose(
			when(
				compose(
					is(Function),
					last,
					head
				),
				compose(
					([key, value]) => [
						[key, value],
						[`${key}Future`, futurify(value)]
					],
					head
				)
			),
			arrayOf
		)
	),
	toPairs
);
