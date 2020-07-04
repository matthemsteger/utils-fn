import {
	compose,
	map,
	always,
	converge,
	identity,
	chain,
	assoc,
	objOf
} from 'ramda';
import {encase} from 'fluture';
import {md5File, fs} from './external';

/**
 * @typedef FileMeta
 * @property {string} filePath
 * @property {string} hash
 */

/**
 * Get the file metadata from a file path
 * @param {string} filePath
 * @returns {Future<FileMeta>}
 */
export function fileMeta(filePath) {
	return compose(
		map(compose(assoc('filePath', filePath), objOf('hash'))),
		md5File
	)(filePath);
}

/**
 * Read a utf8 file given a path
 * @param {string} filePath
 * @returns {Future<string>}
 */
export const readUtf8File = converge(fs.readFileFuture, [
	identity,
	always('utf8')
]);

/**
 * @template T
 * Read a utf8 json file given a path
 * @param {string} filePath
 * @returns {Future<T>}
 */
export const readJSONFile = compose(chain(encase(JSON.parse)), readUtf8File);
