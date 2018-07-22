import {curry} from 'ramda';

// eslint-disable-next-line import/prefer-default-export
export const pad = curry((padStr, str) => `${padStr}${str}${padStr}`);
