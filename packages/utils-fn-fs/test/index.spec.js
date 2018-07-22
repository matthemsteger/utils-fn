import {describe, it} from 'mocha';
import {expect} from 'chai';
import * as fs from './../src';

describe('src/index', () => {
	[
		'fs',
		'glob',
		'md5File',
		'maybeDirHasFile',
		'ensureDirectory',
		'fileMeta',
		'readUtf8File',
		'readJSONFile'
	].forEach((prop) => {
		it(`should export ${prop}`, () => {
			expect(fs).to.have.property(prop);
		});
	});
});
