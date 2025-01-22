const polyfill = require("rollup-plugin-polyfill-inject");
const inject = require("@rollup/plugin-inject");

module.exports = [
	polyfill({
		modules: {
			'Event': "sky-core/polyfill/Event",
			'Error': "sky-core/polyfill/Error",
			//这个实现基于IE的userData功能，只在同目录的HTML有效，如果需要html跨目录，要使用flash版的polyfill
			//简易版的实现，仅适用于解析内容安全的json
			// IE8+ Chrome4+ Safari4+ Firfox3.5+ Opera11.5+
			"JSON": "sky-core/polyfill/JSON",
			//其他对象的自动转JSON
			"JSON.stringify": [
				// IE8+ Chrome4+ Safari4+ Firfox2+ Opera11.5+
				"sky-core/polyfill/Date/prototype/toJSON"
			],
			// IE8+ Chrome4+ Safari4+ Firfox3.5+ Opera11.5+
			"localStorage": "sky-core/polyfill/localStorage",
			"sessionStorage": "sky-core/polyfill/sessionStorage",
			// IE10+ Chrome4+ Safari3.1+ Firfox4+ Opera11.5+
			// "console": "sky-core/polyfill/console",
			// IE9+ Chrome4+ Safari5.1+ Firfox4+ Opera11.5+
			'document.head': "sky-core/polyfill/document/head",
			// Firfox9+ Opera12.1+
			'document.scripts': "sky-core/polyfill/document/scripts",
			// Edge12+ Safari4+ Chrome4+ Firfox4+ Opera11.5+
			'document.baseURI': "sky-core/polyfill/document/baseURI",
			// IE9+ Safari4+ Chrome4+ Firfox2+ Opera11.5+
			"Date.now": "sky-core/polyfill/Date/now",
			// IE9+ Safari5.1+ Chrome6+ Firfox4+ Opera11.5+
			// "Date": "sky-core/polyfill/Date/constructor",
			// "Date.parse": "sky-core/polyfill/Date/parse",
			/* IE9+ Firefox4+ Safari5+ Opera11.5+ */
			"Array.isArray": "sky-core/polyfill/Array/isArray",
			// breaking change
			// IE9+ Chrome23+ Safari6+ Firfox21+ Opera15+
			'parseInt': "sky-core/polyfill/parseInt",

			/* IE9+ Chrome6+ Firefox4+ Safari5.1+ Opera12.1+ */
			"Object.preventExtensions": "sky-core/polyfill/Object/preventExtensions",
			"Object.seal": "sky-core/polyfill/Object/seal",
			"Object.freeze": "sky-core/polyfill/Object/freeze",
			"Object.isExtensible": "sky-core/polyfill/Object/isExtensible",
			"Object.isSealed": "sky-core/polyfill/Object/isSealed",
			"Object.isFrozen": "sky-core/polyfill/Object/isFrozen",

			/* IE9+ Firefox3.5+ Safari5+ Opera12.1+ */
			"Object.getPrototypeOf": "sky-core/polyfill/Object/getPrototypeOf",
			/* IE9+ Firefox4+ Safari5+ Opera12.5+ */
			"Object.create": "sky-core/polyfill/Object/create",
			/* IE9+ Firefox4+ Safari5+ Opera12.1+ */
			"Object.keys": "sky-core/polyfill/Object/keys",
			/* IE9+ Firefox4+ Safari5+ Opera12.1+ */
			"Object.defineProperty": "sky-core/polyfill/Object/defineProperty",
			/* IE9+ Firefox4+ Safari5+ Opera12.1+ */
			"Object.getOwnPropertyDescriptor": "sky-core/polyfill/Object/getOwnPropertyDescriptor",
			/* IE9+ Firefox4+ Safari5+ Opera12.1+ */
			"Object.getOwnPropertyNames": "sky-core/polyfill/Object/getOwnPropertyNames",
			/* IE9+ Firefox4+ Safari5.1+ Opera12.1+ */
			"Object.defineProperties": "sky-core/polyfill/Object/defineProperties",
			/* IE11+ Chrome34+ Firefox31+ Safari9+ Opera12.1+ */
			"Object.setPrototypeOf": "sky-core/polyfill/Object/setPrototypeOf",
			/* Edge12+ Chrome19 Firefox22+ Safari9+ */
			"Object.is": "sky-core/polyfill/Object/is",

			// IE11+ Chrome8+ Safari5.1+ Firfox21+ Opera15+
			'location.origin': "sky-core/polyfill/location",

			// Chrome41+ Edge12 Safari9+ Firfox32+ Opera32+
			"Array.from": [
				"sky-core/polyfill/Array/from",
				"sky-core/polyfill/Array/prototype/@@iterator",
				"sky-core/polyfill/String/prototype/@@iterator"
			],
			"Symbol.iterator": [
				"sky-core/polyfill/Array/prototype/@@iterator",
				"sky-core/polyfill/String/prototype/@@iterator"
			],

			/* Edge12+ Chrome32 Firefox27+ Safari7+ */
			"Promise": "sky-core/polyfill/Promise",
			/* Edge12+ Chrome19+ Firefox16+ Safari9+ */
			"Number.isNaN": "sky-core/polyfill/Number/isNaN",
			"Number.isFinite": "sky-core/polyfill/Number/isFinite",
			/* Edge12+ Chrome34+ Firefox16+ Safari9+ */
			"Number.isInteger": "sky-core/polyfill/Number/isInteger",
			/* Edge12+ Chrome34+ Firefox25+ Safari9+ */
			"Number.EPSILON": "sky-core/polyfill/Number/EPSILON",
			"Number.parseFloat": "sky-core/polyfill/Number/parseFloat",
			"Number.parseInt": "sky-core/polyfill/Number/parseInt",
			/* Edge12+ Chrome34+ Firefox31+ Safari9+ */
			"Number.isSafeInteger": "sky-core/polyfill/Number/isSafeInteger",
			/* Edge12+ Chrome34+ Firefox32+ Safari9+ */
			"Number.MAX_SAFE_INTEGER": "sky-core/polyfill/Number/MAX_SAFE_INTEGER",
			"Number.MIN_SAFE_INTEGER": "sky-core/polyfill/Number/MIN_SAFE_INTEGER",
			/* IE11+ Chrome36 Firefox6+ Safari8+ */
			"WeakMap": "sky-core/polyfill/WeakMap",
			/* IE11+ Chrome36 Firefox34+ Safari9+ */
			"WeakSet": "sky-core/polyfill/WeakSet",
			/* IE11+ Chrome38 Firefox13+ Safari8+ */
			"Map": "sky-core/polyfill/Map",
			"Set": "sky-core/polyfill/Set",
			/* Edge12+ Chrome28 Firefox20+ Safari7+ */
			"Math.imul": "sky-core/polyfill/Math/imul",
			/* Edge12+ Chrome38 Firefox31+ Safari7+ */
			"Math.acosh": "sky-core/polyfill/Math/acosh",
			"Math.asinh": "sky-core/polyfill/Math/asinh",
			"Math.atanh": "sky-core/polyfill/Math/atanh",
			"Math.cbrt": "sky-core/polyfill/Math/cbrt",
			"Math.cosh": "sky-core/polyfill/Math/cosh",
			"Math.expm1": "sky-core/polyfill/Math/expm1",
			"Math.log10": "sky-core/polyfill/Math/log10",
			"Math.log1p": "sky-core/polyfill/Math/log1p",
			"Math.log2": "sky-core/polyfill/Math/log2",
			"Math.sinh": "sky-core/polyfill/Math/sinh",
			"Math.tanh": "sky-core/polyfill/Math/tanh",
			"Math.trunc": "sky-core/polyfill/Math/trunc",
			/* Edge12+ Chrome38 Firefox25+ Safari9+ */
			"Math.sign": "sky-core/polyfill/Math/sign",
			/* Edge12+ Chrome38 Firefox26+ Safari8+ */
			"Math.fround": "sky-core/polyfill/Math/fround",
			/* Edge12+ Chrome38 Firefox27+ Safari8+ */
			"Math.hypot": "sky-core/polyfill/Math/hypot",
			/* Edge12+ Chrome38 Firefox31+ Safari7+ */
			"Math.clz32": "sky-core/polyfill/Math/clz32",
			/* Edge12+ Chrome41 Firefox29+ Safari9+ */
			"String.fromCodePoint": "sky-core/polyfill/String/fromCodePoint",
			/* Edge12+ Chrome41 Firefox34+ Safari9+ */
			"String.raw": "sky-core/polyfill/String/raw",
			/* Edge12+ Chrome45 Firefox25+ Safari9+ */
			"Array.of": "sky-core/polyfill/Array/of",
			/* Edge12+ Chrome45 Firefox34+ Safari9+ */
			"Object.assign": "sky-core/polyfill/Object/assign",
			/* Edge12+ Chrome38+ Firefox36+ Safari9+ */
			"Object.getOwnPropertySymbols": "sky-core/polyfill/Object/getOwnPropertySymbols",
			//ES2017.Object
			/* Chrome54+ Firefox47+ Safari10.1+ Edge14+ */
			"Object.entries": "sky-core/polyfill/Object/entries",
			"Object.values": "sky-core/polyfill/Object/values",
			/* Chrome54+ Firefox50+ Safari10+ Edge15+ */
			"Object.getOwnPropertyDescriptors": "sky-core/polyfill/Object/getOwnPropertyDescriptors",
			//Web API
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