module.exports = function babelConfig(api) {
	api.cache(true);
	const presets = [
		[
			'@babel/preset-env',
			{
				targets: {
					node: '14.16.1'
				}
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
