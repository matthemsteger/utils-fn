import {parallel} from 'fluture';
import {unapply} from 'ramda';

export const unlimitedParallel = parallel(Number.POSITIVE_INFINITY);
export const parallelConverge = unapply(unlimitedParallel);
export * from './futurify';
