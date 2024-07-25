import polyfill from "rollup-plugin-polyfill-inject";
import inject from "@rollup/plugin-inject";
export default [
	polyfill({
		modules: {
			// breaking change
			'parseInt': "sky-core/polyfill/parseInt",
			// ES5
			"JSON.stringify": "sky-core/polyfill/Date/prototype/toJSON",
			//简易版的实现，仅适用于解析内容安全的json
			"JSON": "sky-core/polyfill/JSON",
			// ES5 Date
			"Date.now": "sky-core/polyfill/Date/now",
			// "Date": "sky-core/polyfill/Date/constructor",
			// "Date.parse": "sky-core/polyfill/Date/parse",

			'globalThis': "sky-core/polyfill/globalThis",
			// "Symbol.for": "sky-core/polyfill/Symbol/for",
			// "Symbol.keyFor": "sky-core/polyfill/Symbol/keyFor",
			// "Symbol.hasInstance": "sky-core/polyfill/Function/prototype/@@hasInstance",
			// "Symbol.iterator": [
			// 	"sky-core/polyfill/Array/prototype/@@iterator",
			// 	"sky-core/polyfill/String/prototype/@@iterator"
			// ],
			// "Symbol": "sky-core/polyfill/Symbol",
			"Array.from": [
				"sky-core/polyfill/Array/from",
				"sky-core/polyfill/Array/prototype/@@iterator",
				"sky-core/polyfill/String/prototype/@@iterator"
			],
			"Array.isArray": "sky-core/polyfill/Array/isArray",
			"Array.of": "sky-core/polyfill/Array/of",
			// Math
			"Math.acosh": "sky-core/polyfill/Math/acosh",
			"Math.asinh": "sky-core/polyfill/Math/asinh",
			"Math.atanh": "sky-core/polyfill/Math/atanh",
			"Math.cbrt": "sky-core/polyfill/Math/cbrt",
			"Math.clz32": "sky-core/polyfill/Math/clz32",
			"Math.cosh": "sky-core/polyfill/Math/cosh",
			"Math.expm1": "sky-core/polyfill/Math/expm1",
			"Math.fround": "sky-core/polyfill/Math/fround",
			"Math.hypot": "sky-core/polyfill/Math/hypot",
			"Math.imul": "sky-core/polyfill/Math/imul",
			"Math.log1p": "sky-core/polyfill/Math/log1p",
			"Math.log2": "sky-core/polyfill/Math/log2",
			"Math.log10": "sky-core/polyfill/Math/log10",
			"Math.sign": "sky-core/polyfill/Math/sign",
			"Math.sinh": "sky-core/polyfill/Math/sinh",
			"Math.tanh": "sky-core/polyfill/Math/tanh",
			"Math.trunc": "sky-core/polyfill/Math/trunc",
			//ES2015.Core Number
			"Number.EPSILON": "sky-core/polyfill/Number/EPSILON",
			"Number.isFinite": "sky-core/polyfill/Number/isFinite",
			"Number.isInteger": "sky-core/polyfill/Number/isInteger",
			"Number.isNaN": "sky-core/polyfill/Number/isNaN",
			"Number.isSafeInteger": "sky-core/polyfill/Number/isSafeInteger",
			"Number.MAX_SAFE_INTEGER": "sky-core/polyfill/Number/MAX_SAFE_INTEGER",
			"Number.MIN_SAFE_INTEGER": "sky-core/polyfill/Number/MIN_SAFE_INTEGER",
			"Number.parseFloat": "sky-core/polyfill/Number/parseFloat",
			"Number.parseInt": "sky-core/polyfill/Number/parseInt",
			// Object 遍历
			"Object.assign": "sky-core/polyfill/Object/assign",
			"Object.keys": "sky-core/polyfill/Object/keys",
			"Object.values": "sky-core/polyfill/Object/values",
			"Object.entries": "sky-core/polyfill/Object/entries",
			"Object.fromEntries": "sky-core/polyfill/Object/fromEntries",
			"Object.getOwnPropertySymbols": "sky-core/polyfill/Object/getOwnPropertySymbols",
			// Object property
			//由于ES3不支持 accessor，但是许多工具会生成defineProperty，且defineProperty不能判断是否支持支持accessor，可以污染全局的Object
			// 使用前应使用sham判断
			"Object.defineProperty": "sky-core/polyfill/Object/defineProperty",
			// 使用前应使用sham判断
			"Object.defineProperties": "sky-core/polyfill/Object/defineProperties",
			"Object.getOwnPropertyDescriptor": "sky-core/polyfill/Object/getOwnPropertyDescriptor",
			"Object.getOwnPropertyDescriptors": "sky-core/polyfill/Object/getOwnPropertyDescriptors",
			"Object.getOwnPropertyNames": "sky-core/polyfill/Object/getOwnPropertyNames",
			"Object.hasOwn": "sky-core/polyfill/Object/hasOwn",
			//Object 原型相关
			"Object.create": "sky-core/polyfill/Object/create",
			"Object.getPrototypeOf": "sky-core/polyfill/Object/getPrototypeOf",
			//ES3不能真正实现setPrototypeOf，只允许在继承时使用
			"Object.setPrototypeOf": "sky-core/polyfill/Object/setPrototypeOf",
			//Object 动态相关
			"Object.preventExtensions": "sky-core/polyfill/Object/preventExtensions",
			"Object.seal": "sky-core/polyfill/Object/seal",
			"Object.freeze": "sky-core/polyfill/Object/freeze",
			"Object.isExtensible": "sky-core/polyfill/Object/isExtensible",
			"Object.isSealed": "sky-core/polyfill/Object/isSealed",
			"Object.isFrozen": "sky-core/polyfill/Object/isFrozen",
			"Object.is": "sky-core/polyfill/Object/is",
			//Reflect
			// "Reflect.apply": "sky-core/polyfill/Reflect/apply",
			// "Reflect.construct": "sky-core/polyfill/Reflect/construct",
			// "Reflect.defineProperty": "sky-core/polyfill/Reflect/defineProperty",
			// "Reflect.deleteProperty": "sky-core/polyfill/Reflect/deleteProperty",
			// "Reflect.get": "sky-core/polyfill/Reflect/get",
			// "Reflect.set": "sky-core/polyfill/Reflect/set",
			// "Reflect.getOwnPropertyDescriptor": "sky-core/polyfill/Reflect/getOwnPropertyDescriptor",
			// "Reflect.getPrototypeOf": "sky-core/polyfill/Reflect/getPrototypeOf",
			//Promise
			"Promise": "sky-core/polyfill/Promise",
			"Promise": "sky-core/polyfill/Promise/prototype/finally",
			// ESNext.Promise
			"Promise.allSettled": "sky-core/polyfill/Promise/allSettled",
			"Promise.any": "sky-core/polyfill/Promise/any",
			"AggregateError": "sky-core/polyfill/AggregateError",
			"queueMicrotask": "sky-core/polyfill/queueMicrotask",
			//ES2015.String
			"String.fromCodePoint": "sky-core/polyfill/String/fromCodePoint",
			"String.raw": "sky-core/polyfill/String/raw",
			//ES2015.Collection
			"Map": "sky-core/polyfill/Map",
			"Set": "sky-core/polyfill/Set",
			"WeakMap": "sky-core/polyfill/WeakMap",
			"WeakSet": "sky-core/polyfill/WeakSet",
			/* ES2022 */
			"Object.hasOwn": "sky-core/polyfill/Object/hasOwn",
			//URL 这个polyfil支持accessor，但不支持自动转string和JSON，需要用.href获取
			"URL": "sky-core/polyfill/URL",
			"URLSearchParams": "sky-core/polyfill/URLSearchParams",

			'location.origin': "sky-core/polyfill/location",
			'document.head': "sky-core/polyfill/document/head",
			'document.contains': "sky-core/polyfill/document/contains",
			// "console": "sky-core/polyfill/console",
			//这个实现基于IE的userData功能，只在同目录的HTML有效，如果需要html跨目录，要使用flash版的polyfill
			"localStorage": "sky-core/polyfill/localStorage",
			"sessionStorage": "sky-core/polyfill/sessionStorage",
			// 'Event': "sky-core/polyfill/Event",
		},
		exclude: [
			"qunit/helpers/*"
		]
	}),
	//以下是prototype的修改
	polyfill({
		modules: {
			// breaking change
			'.toFixed': "sky-core/polyfill/Number/prototype/toFixed",
			//ES5 Date
			//toLocaleFormat 这个只有火狐支持，非标准
			".toLocaleFormat": "sky-core/polyfill/Date/prototype/toLocaleFormat",
			".toISOString": "sky-core/polyfill/Date/prototype/toISOString",
			".toJSON": "sky-core/polyfill/Date/prototype/toJSON",
			//ES5 Function
			".bind": "sky-core/polyfill/Function/prototype/bind",
			// ".name": "sky-core/polyfill/Function/prototype/name",
			//ES5 Array
			".every": "sky-core/polyfill/Array/prototype/every",
			".filter": "sky-core/polyfill/Array/prototype/filter",
			".forEach": "sky-core/polyfill/Array/prototype/forEach",
			".indexOf": "sky-core/polyfill/Array/prototype/indexOf",
			".lastIndexOf": "sky-core/polyfill/Array/prototype/lastIndexOf",
			".map": "sky-core/polyfill/Array/prototype/map",
			".reduce": "sky-core/polyfill/Array/prototype/reduce",
			".reduceRight": "sky-core/polyfill/Array/prototype/reduceRight",
			".some": "sky-core/polyfill/Array/prototype/some",
			//String/Array includes
			'.includes': [
				"sky-core/polyfill/Array/prototype/includes",
				"sky-core/polyfill/String/prototype/includes",
			],
			//ES6 Array
			".copyWithin": "sky-core/polyfill/Array/prototype/copyWithin",
			".fill": "sky-core/polyfill/Array/prototype/fill",
			".find": "sky-core/polyfill/Array/prototype/find",
			".findIndex": "sky-core/polyfill/Array/prototype/findIndex",
			".entries": "sky-core/polyfill/Array/prototype/entries",
			".keys": "sky-core/polyfill/Array/prototype/keys",
			".values": "sky-core/polyfill/Array/prototype/values",
			//ES2019 Array
			".flat": "sky-core/polyfill/Array/prototype/flat",
			".flatMap": "sky-core/polyfill/Array/prototype/flatMap",
			//ES5 String
			".trim": "sky-core/polyfill/String/prototype/trim",
			//ES6 String
			".startsWith": "sky-core/polyfill/String/prototype/startsWith",
			".endsWith": "sky-core/polyfill/String/prototype/endsWith",
			".repeat": "sky-core/polyfill/String/prototype/repeat",
			".codePointAt": "sky-core/polyfill/String/prototype/codePointAt",
			//ES2017.String
			".padStart": "sky-core/polyfill/String/prototype/padStart",
			".padEnd": "sky-core/polyfill/String/prototype/padEnd",
			//ES2019.String
			".trimStart": "sky-core/polyfill/String/prototype/trimStart",
			".trimEnd": "sky-core/polyfill/String/prototype/trimEnd",
			// ".trimLeft": "sky-core/polyfill/String/prototype/trimLeft",
			// ".trimRight": "sky-core/polyfill/String/prototype/trimRight",
			//ES2020.String
			".matchAll": "sky-core/polyfill/String/prototype/matchAll",
			//ES2021
			".replaceAll": "sky-core/polyfill/String/prototype/replaceAll",
			//ES2022
			".at": [
				"sky-core/polyfill/Array/prototype/at",
				"sky-core/polyfill/String/prototype/at"
			],
			// ES2023
			".findLast": "sky-core/polyfill/Array/prototype/findLast",
			".findLastIndex": "sky-core/polyfill/Array/prototype/findLastIndex",
			".toReversed": "sky-core/polyfill/Array/prototype/toReversed",
			".toSpliced": "sky-core/polyfill/Array/prototype/toSpliced",
			".toSorted": "sky-core/polyfill/Array/prototype/toSorted",
			".with": "sky-core/polyfill/Array/prototype/with",
		},
		exclude: [
			"polyfill/**/*",
			"polyfill-*/**/*",
			"qunit/helpers/*"
		]
	}),
	inject({
		modules: {
			"Symbol.asyncIterator": "sky-core/pure/Symbol/asyncIterator",
			"Symbol.hasInstance": "sky-core/pure/Symbol/hasInstance",
			"Symbol.iterator": "sky-core/pure/Symbol/iterator",
			"Symbol.for": "sky-core/pure/Symbol/for",
			"Symbol.keyFor": "sky-core/pure/Symbol/keyFor",
			"Symbol": "sky-core/pure/Symbol",
			// 由于有比较多的库使用XMLHttpRequest来判断浏览器版本，污染全局变量会导致判断错误，因此建议只在需要用的地方注入
			"XMLHttpRequest": "sky-core/pure/XMLHttpRequest"
		},
		exclude: [
		]
	})
];