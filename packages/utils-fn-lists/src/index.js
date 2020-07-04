import {compose, flatten, concat, nth, length, identity, converge} from 'ramda';
import {randomInt} from '@matthemsteger/utils-fn-numbers';

export {default as calculateAddsDeletesUpdates} from './addsDeletesUpdates';
export const concatAndFlatten = compose(flatten, concat);
export const sample = converge(nth, [compose(randomInt(0), length), identity]);
