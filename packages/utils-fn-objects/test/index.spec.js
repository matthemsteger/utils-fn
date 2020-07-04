import {describe, it} from 'mocha';
import {expect} from 'chai';
import {curry} from 'ramda';
import {
	aliasProp,
	defaults,
	propsPath,
	renameKeys,
	deriveObjFromPaths
} from './../src';

const testFnExport = curry((name, fn, length) =>
	it(`should export a function ${name}`, () => {
		expect(fn).to.be.a('function').with.lengthOf(length);
	})
);

describe('src/index', () => {
	testFnExport('aliasProp', aliasProp, 3);
	testFnExport('defaults', defaults, 2);
	testFnExport('propsPath', propsPath, 2);
	testFnExport('renameKeys', renameKeys, 2);
	testFnExport('deriveObjFromPaths', deriveObjFromPaths, 2);
});
