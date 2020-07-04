import {
	curry,
	flip,
	merge,
	ap,
	path,
	__ as placeholder,
	reduce,
	assoc,
	keys,
	zipObj,
	compose
} from 'ramda';

export const aliasProp = curry((prop, newProp, obj) => ({
	...obj,
	[newProp]: obj[prop]
}));

export const defaults = flip(merge);

export const propsPath = curry((paths, obj) =>
	ap([path(placeholder, obj)], paths)
);

export const renameKeys = curry((keysMap, obj) =>
	reduce(
		(acc, key) => assoc(keysMap[key] || key, obj[key], acc),
		{},
		keys(obj)
	)
);

export const deriveObjFromPaths = curry((paths, props) =>
	compose(zipObj(props), propsPath(paths))
);
