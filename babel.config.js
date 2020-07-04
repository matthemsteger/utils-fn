module.exports = function babelConfig(api) {
	api.cache.using(() => process.env.BABEL_ENV);

	const modules = process.env.BABEL_ENV === 'cjs' ? 'cjs' : false;
	const presets = [
		[
			'@babel/preset-env',
			{
				targets: {
					node: '12.14.1'
				},
				modules
			}
		]
	];
	const plugins = [
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-proposal-object-rest-spread'
	];

	return {
		presets,
		plugins
	};
};
