import {describe, it} from 'mocha';
import {expect} from 'chai';
import {after as _futureAfter, promise} from 'fluture';
import {range, curry} from 'ramda';
import * as fns from './../src';

const futureAfter = curry((wait, n) => _futureAfter(wait)(n));
const {unlimitedParallel, parallelConverge} = fns;

describe('src/index', () => {
	[
		'futurify',
		'futurifyAll',
		'unlimitedParallel',
		'parallelConverge'
	].forEach((fn) => {
		it(`should export a function ${fn}`, () => {
			expect(fns[fn]).to.be.a('function');
		});
	});

	describe('unlimitedParallel', () => {
		it('should run a number of futures', async () => {
			const tenFutures = Array.from(Array(10).keys()).map(futureAfter(5));

			const result = await promise(unlimitedParallel(tenFutures));
			expect(result).to.have.ordered.members(range(0, 10));
		});
	});

	describe('parallelConverge', () => {
		it('should allow for parallel futures as a voradic', async () => {
			const tenFutures = Array.from(Array(10).keys()).map(futureAfter(5));

			const result = await promise(parallelConverge(...tenFutures));
			expect(result).to.have.ordered.members(range(0, 10));
		});
	});
});
