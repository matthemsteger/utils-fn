import _fs from 'fs';
import _glob from 'glob';
import _md5File from 'md5-file';
import {futurifyAll} from '@matthemsteger/utils-fn-futures';
import {node} from 'fluture';
import {compose, curry} from 'ramda';

const fs = futurifyAll(_fs);
const glob = compose(compose(node, curry(_glob)));
const md5File = compose(node, curry(_md5File));

export {fs, glob, md5File};
