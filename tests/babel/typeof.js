// babel 的 typeof helper 分层测试。
// 通过 "@babel/runtime/helpers/esm/typeof" 引入，让 createRollupPlugin 按 tier 替换：
// compat / modern → helpers-modern，legacy → helpers-legacy，es2015 → babel 原生实现。
import _typeof from "@babel/runtime/helpers/esm/typeof";
import Symbol from "sky-core/pure/Symbol";

QUnit.test('babel typeof', function(assert) {
	// 旧版 WebKit 等 legacy 浏览器原生 typeof 正则得到 "function"，需要 helpers-legacy 修正
	assert.same(_typeof(/a/), 'object', 'RegExp');
	// 无原生 Symbol 时，Symbol polyfill 的对象需要被识别为 "symbol"
	assert.same(_typeof(Symbol('a')), 'symbol', 'Symbol');
});
