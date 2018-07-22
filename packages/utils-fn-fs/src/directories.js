import {curry, compose, map, find, equals, ifElse, propEq, always} from 'ramda';
import Maybe from 'folktale/maybe';
import {chainRej, of as futureOf, reject} from 'fluture';
import {fs} from './external';

/**
 * Check if a directory has a file name, curried
 * @param {string} fileName
 * @param {string} directoryPath
 * @returns {Future<Maybe<string>>} Future that contains maybe filename
 */
export const maybeDirHasFile = curry((fileName, directoryPath) =>
	compose(
		map(
			compose(
				Maybe.fromNullable,
				find(equals(fileName))
			)
		),
		fs.readdirFuture
	)(directoryPath)
);

/**
 * Ensure a directory exists, if not create it
 * @param {string} directoryPath
 * @returns {Future<void>}
 */
export const ensureDirectory = compose(
	chainRej(ifElse(propEq('code', 'EEXIST'), always(futureOf()), reject)),
	(dirPath) => fs.mkdirFuture(dirPath)
);
