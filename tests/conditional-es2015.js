const polyfill = require("rollup-plugin-polyfill-inject");
const inject = require("@rollup/plugin-inject");

module.exports = [
	polyfill({
		modules: {
			/* Chrome63+ Firefox34+ Safari10+ Edge12+ */
			"Proxy.revocable": "sky-core/polyfill/Proxy/revocable",
			/* Chrome71+ Firefox69+ Safari12.1+ */
			"queueMicrotask": "sky-core/polyfill/queueMicrotask",
			//ES2019
			/* Chrome73+ Firefox63+ Safari12.1+ */
			"Object.fromEntries": "sky-core/polyfill/Object/fromEntries",
			/* ES2020 */
			/* Chrome71+ Firefox65+ Safari12.1+*/
			'globalThis': "sky-core/polyfill/globalThis",
			//ES2021
			/* Chrome76+ Firefox71+ Safari13+*/
			'Promise.allSettled': "sky-core/polyfill/Promise/allSettled",
			/* Chrome85+ Firefox79+ Safari14+*/
			'Promise.any': "sky-core/polyfill/Promise/any",
			'AggregateError': "sky-core/polyfill/AggregateError",
			/* Chrome93+ Firefox92+ Safari15.4+*/
			"Object.hasOwn": "sky-core/polyfill/Object/hasOwn",
			/* Chrome98+ Firefox94+ Safari15.4+*/
			"structuredClone": "sky-core/polyfill/structuredClone",
			// ES2024
			/* Chrome117+ Firefox119+ Safari17.4+ */
			"Object.groupBy": "sky-core/polyfill/Object/groupBy",
			"Map.groupBy": "sky-core/polyfill/Map/groupBy",
			/* Chrome119+ Firefox121+ Safari17.4+ */
			"Promise.withResolvers": "sky-core/polyfill/Promise/withResolvers",

			// "console": "sky-core/polyfill/console",
			//这个实现基于IE的userData功能，只在同目录的HTML有效，如果需要html跨目录，要使用flash版的polyfill
			// "localStorage": "sky-core/polyfill/localStorage",
			// "sessionStorage": "sky-core/polyfill/sessionStorage",
			// 'Event': "sky-core/polyfill/Event",
		},
		exclude: [
			"tests/corejs/helpers/*"
		]
	}),
	//以下是prototype的修改
	polyfill({
		modules: {
			// breaking change
			'.toFixed': "sky-core/polyfill/Number/prototype/toFixed",
			".toJSON": [
				"sky-core/polyfill/Date/prototype/toJSON"
			],
			'.at': [
				/* Chrome41+ Firefox34+ Safari9.1+*/
				"sky-core/polyfill/String/prototype/at",
				/* Chrome92+ Firefox90+ Safari15.4+*/
				"sky-core/polyfill/Array/prototype/at",
			],
			'.includes': [
				/* Edge12+ Chrome41 Firefox40+ Safari9+ */
				"sky-core/polyfill/String/prototype/includes",
				/* Chrome47 Firefox43+ Safari9+ Edge14+ */
				"sky-core/polyfill/Array/prototype/includes",
			],
			//DOM
			".contains": "sky-core/polyfill/Element/prototype/contains",
			".children": "sky-core/polyfill/Element/prototype/children",
			".innerText": "sky-core/polyfill/Element/prototype/innerText",
			// toLocaleFormat 这个只有火狐支持，非标准
			".toLocaleFormat": "sky-core/polyfill/Date/prototype/toLocaleFormat",
			//toISOString的兼容性还过的去，可以不要
			".toISOString": "sky-core/polyfill/Date/prototype/toISOString",
			//部分版本chrome，toLocaleString只支持英文，这里给替换成了一个全球可读性都比较好的格式
			".toLocaleDateString": "sky-core/polyfill/Date/prototype/toLocaleDateString",
			".toLocaleString": "sky-core/polyfill/Date/prototype/toLocaleString",
			".toLocaleTimeString": "sky-core/polyfill/Date/prototype/toLocaleTimeString",
			/* IE9+ Firefox3+ Safari4+ Opera11.5+ */
			".reduce": "sky-core/polyfill/Array/prototype/reduce",
			".reduceRight": "sky-core/polyfill/Array/prototype/reduceRight",
			/* IE10+ Firefox3.5+ Safari5+ Opera11.5+ */
			".trim": "sky-core/polyfill/String/prototype/trim",
			/* IE11+ Firefox4+ Chrome7+ Safari5.1+ Opera12.1+ */
			".bind": "sky-core/polyfill/Function/prototype/bind",
			/* Edge15+ Chrome38+ Firefox28+ Safari8+ */
			".entries": "sky-core/polyfill/Array/prototype/entries",
			".keys": "sky-core/polyfill/Array/prototype/keys",
			/* Edge15+ Chrome41 Firefox17+ Safari9+ */
			".startsWith": "sky-core/polyfill/String/prototype/startsWith",
			".endsWith": "sky-core/polyfill/String/prototype/endsWith",
			/* Edge12+ Chrome41 Firefox24+ Safari9+ */
			".repeat": "sky-core/polyfill/String/prototype/repeat",
			/* Edge12+ Chrome41 Firefox34+ Safari9+ */
			".codePointAt": "sky-core/polyfill/String/prototype/codePointAt",
			/* Edge12+ Chrome45 Firefox25+ Safari7.1+ */
			".find": "sky-core/polyfill/Array/prototype/find",
			".findIndex": "sky-core/polyfill/Array/prototype/findIndex",
			/* Edge12+ Chrome45 Firefox32+ Safari9+ */
			".fill": "sky-core/polyfill/Array/prototype/fill",
			/* Edge12+ Chrome45 Firefox32+ Safari9+ */
			".copyWithin": "sky-core/polyfill/Array/prototype/copyWithin",
			/* Edge12+ Chrome46 Firefox34+ Safari9.1+ */
			".name": "sky-core/polyfill/Function/prototype/name",
			// ES2017.String
			/* Chrome57+ Firefox40+ Safari9+ Edge15+ */
			".padEnd": "sky-core/polyfill/String/prototype/padEnd",
			".padStart": "sky-core/polyfill/String/prototype/padStart",
			/* ES2018 */
			/* Chrome63+ Firefox58+ Safari11.1+ Edge18+ */
			".finally": "sky-core/polyfill/Promise/prototype/finally",
			/* ES2019 */
			/* Chrome66+ Firefox61+ Safari12+ */
			".trimEnd": "sky-core/polyfill/String/prototype/trimEnd",
			".trimStart": "sky-core/polyfill/String/prototype/trimStart",
			/* Chrome69+ Firefox62+ Safari12+*/
			".flat": "sky-core/polyfill/Array/prototype/flat",
			".flatMap": "sky-core/polyfill/Array/prototype/flatMap",
			/* Chrome70+ Firefox63+ Safari12+*/
			// ".description": "sky-core/polyfill/Symbol/prototype/description",
			//ES2020
			/* Chrome73+ Firefox67+ Safari13+*/
			".matchAll": "sky-core/polyfill/String/prototype/matchAll",
			//ES2021
			/* Chrome85+ Firefox77+ Safari13.1+*/
			".replaceAll": "sky-core/polyfill/String/prototype/replaceAll",
			/* ES2023 */
			/* Chrome97+ Firefox104+ Safari15.4+*/
			".findLastIndex": "sky-core/polyfill/Array/prototype/findLastIndex",
			/* Chrome97+ Firefox104+ Safari15.4+*/
			".findLast": "sky-core/polyfill/Array/prototype/findLast",
			/* Chrome110+ Firefox115+ Safari16+*/
			".toReversed": "sky-core/polyfill/Array/prototype/toReversed",
			".toSorted": "sky-core/polyfill/Array/prototype/toSorted",
			".toSpliced": "sky-core/polyfill/Array/prototype/toSpliced",
			".with": "sky-core/polyfill/Array/prototype/with",
			/* Chrome111+ Firefox119+ Safari16.4+ */
			".isWellFormed": "sky-core/polyfill/String/prototype/isWellFormed",
			".toWellFormed": "sky-core/polyfill/String/prototype/toWellFormed",
		},
		exclude: [
			"tests/corejs/helpers/*"
		]
	}),
	inject({
		modules: {
			"Object.defineProperty": "sky-core/pure/Object/defineProperty",
			"Object.defineProperties": "sky-core/pure/Object/defineProperties",
			"Symbol.asyncIterator": "sky-core/pure/Symbol/asyncIterator",
			"Symbol.hasInstance": "sky-core/pure/Symbol/hasInstance",
			"Symbol.iterator": "sky-core/pure/Symbol/iterator",
			"Symbol.for": "sky-core/pure/Symbol/for",
			"Symbol.keyFor": "sky-core/pure/Symbol/keyFor",
			"Symbol": "sky-core/pure/Symbol",
		},
		include: [
			"impl/**/*",
			"impl-*/**/*",
			"tests/corejs/es/*",
		]
	})
];