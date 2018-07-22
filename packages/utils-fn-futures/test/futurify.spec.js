import {describe, it} from 'mocha';
import {expect} from 'chai';
import tester from 'mocha-plugin-fluture';
import * as fns from './../src/futurify';

const {futurify, futurifyAll} = fns;

describe('src/futurify', () => {
	['futurify', 'futurifyAll'].forEach((fn) => {
		it(`should export a function ${fn}`, () => {
			expect(fns[fn]).to.be.a('function');
		});
	});

	const error = new Error('blah');
	function createNodeback(errored) {
		return function nodeback(blah, cb) {
			if (errored) {
				cb(error, null);
			} else {
				cb(null, blah);
			}
		};
	}

	describe('futurify', () => {
		it('should be a function that takes a single argument', () => {
			expect(futurify)
				.to.be.a('function')
				.with.lengthOf(1);
		});

		it('should return a function that takes the same args as passed in nodeback', () => {
			const nodeback = createNodeback(false);
			const fn = futurify(nodeback);

			expect(fn)
				.to.be.a('function')
				.with.lengthOf(1);
		});

		it(
			'should futurify a nodeback',
			tester(() => {
				const nodeback = createNodeback(false);
				const fn = futurify(nodeback);

				return fn(3).map((result) => expect(result).to.equal(3));
			})
		);

		it(
			'should futurify a nodeback that returns an error',
			tester(() => {
				const nodeback = createNodeback(true);
				const fn = futurify(nodeback);

				return fn(3)
					.swap()
					.map((err) =>
						expect(err)
							.to.an('error')
							.with.property('message', 'blah')
					);
			})
		);
	});

	describe('futurifyAll', () => {
		it('should take an object and add future versions of fns', () => {
			const obj = {
				one: createNodeback(false),
				two: createNodeback(false)
			};

			const result = futurifyAll(obj);

			expect(result)
				.to.have.property('oneFuture')
				.that.is.a('function');
			expect(result)
				.to.have.property('twoFuture')
				.that.is.a('function');
			expect(result)
				.to.have.property('one')
				.that.is.a('function');
		});
	});
});
