import {describe, it} from 'mocha';
import {expect} from 'chai';
import {randomInt} from './../src';

describe('src/index', () => {
	it('should export a function randomInt', () => {
		expect(randomInt)
			.to.be.a('function')
			.with.lengthOf(2);
	});

	describe('randomInt', () => {
		it('should return a integer between a min and max', () => {
			const result = randomInt(1, 3);
			expect(result)
				.to.be.a('number')
				.at.least(1)
				.and.at.most(3);
		});
	});
});
