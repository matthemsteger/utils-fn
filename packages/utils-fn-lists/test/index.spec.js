import {describe, it} from 'mocha';
import {expect} from 'chai';
import {calculateAddsDeletesUpdates, concatAndFlatten, sample} from './../src';

describe('src/index', () => {
	it('should export a function calculateAddsDeletesUpdates', () => {
		expect(calculateAddsDeletesUpdates)
			.to.be.a('function')
			.with.lengthOf(4);
	});

	it('should export a function concatAndFlatten', () => {
		expect(concatAndFlatten).to.be.a('function').with.lengthOf(2);
	});

	it('should export a function sample', () => {
		expect(sample).to.be.a('function').with.lengthOf(1);
	});
});
