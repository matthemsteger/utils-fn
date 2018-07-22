import {describe, it} from 'mocha';
import {expect} from 'chai';
import tester from 'mocha-plugin-fluture';
import {after as futureAfter} from 'fluture';
import {range} from 'ramda';
import * as fns from './../src/index';

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
		it(
			'should run a number of futures',
			tester(() => {
				const tenFutures = Array.from(Array(10).keys()).map(
					futureAfter(5)
				);

				return unlimitedParallel(tenFutures).map((result) =>
					expect(result).to.have.ordered.members(range(0, 10))
				);
			})
		);
	});

	describe('parallelConverge', () => {
		it(
			'should allow for parallel futures as a voradic',
			tester(() => {
				const tenFutures = Array.from(Array(10).keys()).map(
					futureAfter(5)
				);

				return parallelConverge(...tenFutures).map((result) =>
					expect(result).to.have.ordered.members(range(0, 10))
				);
			})
		);
	});
});
