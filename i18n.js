const NextI18Next = require('next-i18next').default;
const path = require('path');

module.exports = new NextI18Next({
	localePath: typeof window === 'undefined' ? 'public/locales' : 'locales',
	localeSubpaths: {
		es: 'es',
		en: 'en',
	},
	defaultLanguage: 'es',
	otherLanguages: ['en'],
	initImmediate: false,
	fallbackLng: false,
	react: {
		useSuspense: false,
	},
});
