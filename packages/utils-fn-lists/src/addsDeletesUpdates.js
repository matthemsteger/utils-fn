import {
	prop,
	compose,
	assoc,
	objOf,
	curry,
	propEq,
	has,
	map,
	unless,
	indexBy,
	groupBy,
	values,
	mergeWithKey
} from 'ramda';

const unbox = prop('item');
const box = compose(assoc('__isBoxed', true), objOf('item'));
const boxAsType = (type) => compose(assoc('type', type), box);

const comparer = curry((updatedPredicate, key, older, newer) => {
	const isUpdated = updatedPredicate(older, newer);
	return isUpdated
		? boxAsType('update')([older, newer])
		: boxAsType('unchanged')(newer);
});

const grouper = curry((keySelector, older, newer, item) => {
	if (propEq('type', 'unchanged', item)) return 'unchanged';
	if (propEq('type', 'update', item)) return 'updates';

	const key = compose(keySelector, unbox)(item);
	if (has(key, older)) return 'deletes';
	if (has(key, newer)) return 'adds';

	return 'unknown';
});

const ensureBoxed = map(unless(propEq('__isBoxed', true), box));

export default curry((keySelector, updatedPredicate, older, newer) => {
	const indexedOlder = indexBy(keySelector, older);
	const indexedNewer = indexBy(keySelector, newer);

	// consolidate into an object where key is id, array represents an update from old -> new
	// and null represents an unchanged

	return compose(
		map(map(unbox)),
		groupBy(grouper(keySelector, indexedOlder, indexedNewer)),
		ensureBoxed,
		values,
		mergeWithKey(comparer(updatedPredicate))
	)(indexedOlder, indexedNewer);
});
