const withImages = require('next-images');
const path = require('path');

module.exports = withImages({
	TrailingSlash: true,
	images: {
		disableStaticImages: true,
	},
	publicRuntimeConfig: {
		localeSubpaths:
			typeof process.env.LOCALE_SUBPATHS === 'string'
				? process.env.LOCALE_SUBPATHS
				: 'none',
	},
});
