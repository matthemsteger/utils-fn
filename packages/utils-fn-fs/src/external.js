import _fs from 'fs';
import _glob from 'glob';
import _md5File from 'md5-file';
import {futurifyAll} from '@matthemsteger/utils-fn-futures';
import {encaseN, encaseN2} from 'fluture';

const fs = futurifyAll(_fs);
const glob = encaseN2(_glob);
const md5File = encaseN(_md5File);

export {fs, glob, md5File};
