
/**
 * corejs 测试的三套构建配置（compat / modern / es2015）工厂。
 *
 * - rollup CLI（npm run test:corejs）：createConfigs() 保持原有行为，
 *   从 tests/corejs/index.js 构建到 tests/corejs/dest/。
 * - 编程式调用（npm run test:node / npm run test:local）：
 *   createConfig(tier, { entry, plugins, outputFile, babel })，
 *   entry 可为虚拟入口 id，配合虚拟入口插件使用；
 *   babel:false 时跳过语法降级（node 原生运行新语法）。
 */

const { babel } = require("@rollup/plugin-babel");
const importPlugin = require("rollup-plugin-import");
const nodeResolve = require("@rollup/plugin-node-resolve");
const createSkyPlugin = require("../../createRollupPlugin");

var babelRuntimePath = require.resolve("@babel/runtime/package.json", {
	paths: [process.cwd()]
});
var babelRuntimePackage = require(babelRuntimePath);
var babelRuntimeVersion = babelRuntimePackage.version;

// compat：完整降到 ES3，供 IE6-8
var COMPAT_MAIN_PLUGINS = [
	["@babel/plugin-transform-runtime", {
		absoluteRuntime: false,
		corejs: false,
		helpers: true,
		regenerator: true,
		useESModules: true,
		version: babelRuntimeVersion
	}],
	// ES2019
	"@babel/plugin-transform-optional-catch-binding",
	"@babel/plugin-transform-json-strings",
	// ES2018
	"@babel/plugin-transform-async-generator-functions",
	// "@babel/plugin-transform-dotall-regex"
	"@babel/plugin-transform-named-capturing-groups-regex",
	["@babel/plugin-transform-object-rest-spread", { loose: true, "useBuiltIns": true }],
	// "@babel/plugin-transform-unicode-property-regex"
	// ES2017
	// "@babel/plugin-transform-async-to-generator",
	// ES2016
	"@babel/plugin-transform-exponentiation-operator",
	// ES2015
	// "@babel/plugin-transform-regenerator",
	"@babel/plugin-transform-arrow-functions",
	// "@babel/plugin-transform-block-scoped-functions",
	"@babel/plugin-transform-block-scoping",
	["@babel/plugin-transform-classes", { loose: true }],
	["@babel/plugin-transform-computed-properties", { loose: true }],
	["@babel/plugin-transform-destructuring", { loose: true, "useBuiltIns": true }],
	"@babel/plugin-transform-duplicate-keys",
	["@babel/plugin-transform-for-of", { loose: true }],
	// "@babel/plugin-transform-instanceof",
	"@babel/plugin-transform-literals",
	"@babel/plugin-transform-new-target",
	// "@babel/plugin-transform-object-super",
	["@babel/plugin-transform-parameters", { loose: true }],
	"@babel/plugin-transform-shorthand-properties",
	["@babel/plugin-transform-spread", { loose: true }],
	// "@babel/plugin-transform-sticky-regex",
	["@babel/plugin-transform-template-literals", { loose: true }],
	"@babel/plugin-transform-typeof-symbol",
	// ES5
	// "@babel/plugin-transform-property-mutators",
	// ES3
	// "@babel/plugin-transform-member-expression-literals",
	// "@babel/plugin-transform-property-literals",
	// "@babel/plugin-transform-reserved-words",
	// "@babel/plugin-transform-jscript"
];
var COMPAT_TAIL_PLUGINS = [
	"@babel/plugin-transform-member-expression-literals",
	"@babel/plugin-transform-property-literals",
	"@babel/plugin-transform-reserved-words",
	"@babel/plugin-transform-jscript"
];

// modern：降到 ES5，供 IE9+
var MODERN_MAIN_PLUGINS = [
	["@babel/plugin-transform-runtime", {
		absoluteRuntime: false,
		corejs: false,
		helpers: true,
		regenerator: true,
		useESModules: true,
		version: babelRuntimeVersion
	}],
	// ES2019
	"@babel/plugin-transform-optional-catch-binding",
	"@babel/plugin-transform-json-strings",
	// ES2018
	"@babel/plugin-transform-async-generator-functions",
	// "@babel/plugin-transform-dotall-regex"
	"@babel/plugin-transform-named-capturing-groups-regex",
	["@babel/plugin-transform-object-rest-spread", { loose: true, "useBuiltIns": true }],
	// "@babel/plugin-transform-unicode-property-regex"
	// ES2017
	// "@babel/plugin-transform-async-to-generator",
	// ES2016
	"@babel/plugin-transform-exponentiation-operator",
	// ES2015
	// "@babel/plugin-transform-regenerator",
	"@babel/plugin-transform-arrow-functions",
	// "@babel/plugin-transform-block-scoped-functions",
	"@babel/plugin-transform-block-scoping",
	["@babel/plugin-transform-classes", { loose: true }],
	["@babel/plugin-transform-computed-properties", { loose: true }],
	["@babel/plugin-transform-destructuring", { loose: true, "useBuiltIns": true }],
	"@babel/plugin-transform-duplicate-keys",
	["@babel/plugin-transform-for-of", { loose: true }],
	// "@babel/plugin-transform-instanceof",
	"@babel/plugin-transform-literals",
	"@babel/plugin-transform-new-target",
	// "@babel/plugin-transform-object-super",
	["@babel/plugin-transform-parameters", { loose: true }],
	"@babel/plugin-transform-shorthand-properties",
	["@babel/plugin-transform-spread", { loose: true }],
	// "@babel/plugin-transform-sticky-regex",
	["@babel/plugin-transform-template-literals", { loose: true }],
	// "@babel/plugin-transform-typeof-symbol",
	// ES5
	// "@babel/plugin-transform-property-mutators"
];
var MODERN_TAIL_PLUGINS = [
	"@babel/plugin-transform-member-expression-literals",
	"@babel/plugin-transform-property-literals",
	"@babel/plugin-transform-reserved-words"
];

// es2015：仅去 ES2019+ 语法，供支持 <script type="module"> 的浏览器
var ES2015_MAIN_PLUGINS = [
	["@babel/plugin-transform-runtime", {
		absoluteRuntime: false,
		corejs: false,
		helpers: true,
		regenerator: true,
		useESModules: true,
		version: babelRuntimeVersion
	}],
	// ES2019
	"@babel/plugin-transform-optional-catch-binding"
];

var TIER_BABEL = {
	compat: { main: COMPAT_MAIN_PLUGINS, tail: COMPAT_TAIL_PLUGINS },
	modern: { main: MODERN_MAIN_PLUGINS, tail: MODERN_TAIL_PLUGINS },
	es2015: { main: ES2015_MAIN_PLUGINS }
};

var DEFAULT_OUTPUT_FILES = {
	compat: "tests/corejs/dest/compat.js",
	modern: "tests/corejs/dest/modern.js",
	es2015: "tests/corejs/dest/es2015.js"
};

function createBabelPlugins(tier) {
	var conf = TIER_BABEL[tier];
	var plugins = [
		babel({
			babelHelpers: 'runtime',
			babelrc: false,
			compact: false,
			plugins: conf.main,
			include: [
				"tests/corejs/**/*",
			]
		})
	];
	if(conf.tail) {
		plugins.push(babel({
			babelHelpers: 'bundled',
			babelrc: false,
			compact: false,
			plugins: conf.tail
		}));
	}
	return plugins;
}

/**
 * @param {"compat"|"modern"|"es2015"} tier
 * @param {object} [options]
 * @param {string}  [options.entry="tests/corejs/index.js"]
 * @param {Array}   [options.plugins] 追加到最前面的插件（如虚拟入口）
 * @param {string}  [options.outputFile]
 * @param {boolean} [options.babel=true] 为 false 时跳过 babel（node 内存构建）
 */
function createConfig(tier, options) {
	options = options || {};
	var plugins = [];
	if(options.plugins) {
		plugins = plugins.concat(options.plugins);
	}
	plugins.push(
		createSkyPlugin(tier),
		nodeResolve(),
		importPlugin({
			libraryName: "sky-core",
			libraryDirectory: "utils"
		}),
		...require("../conditional-" + tier)
	);
	if(options.babel !== false) {
		plugins = plugins.concat(createBabelPlugins(tier));
	}
	return {
		tier: tier,
		inputOptions: {
			input: options.entry || 'tests/corejs/index.js',
			treeshake: false,
			plugins: plugins
		},
		outputOptions: {
			strict: false,
			file: options.outputFile || DEFAULT_OUTPUT_FILES[tier],
			format: 'iife'
		}
	};
}

/** 三套配置（rollup CLI 默认行为） */
function createConfigs(options) {
	return ["compat", "modern", "es2015"].map(function(tier) {
		return toRollupCliConfig(createConfig(tier, options));
	});
}

function toRollupCliConfig(config) {
	return {
		input: config.inputOptions.input,
		treeshake: config.inputOptions.treeshake,
		plugins: config.inputOptions.plugins,
		output: config.outputOptions
	};
}

exports.createConfig = createConfig;
exports.createConfigs = createConfigs;
