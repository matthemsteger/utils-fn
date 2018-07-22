import {describe, it} from 'mocha';
import {expect} from 'chai';
import {pad} from './../src';

describe('src/index', () => {
	it('should export a function pad', () => {
		expect(pad)
			.to.be.a('function')
			.with.lengthOf(2);
	});

	describe('pad', () => {
		it('should pad a string on both sides', () => {
			const result = pad('_', 'blah');
			expect(result).to.equal('_blah_');
		});

		it('should be curried', () => {
			const result = pad('_')('blah');
			expect(result).to.equal('_blah_');
		});
	});
});
