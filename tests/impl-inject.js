
/**
 * 纯算法测试的注入配置（npm run test:node）。
 *
 * 与 conditional-*.js 的区别：
 *  - 没有 tier 分层，直接映射到 impl/ 目录的算法实现
 *  - 用 pure 方式劫持：把测试代码里对原生 API 的引用替换为 impl 函数，
 *    而不是安装全局 polyfill——这样测的一定是我们的实现而非 node 自带的
 *
 * 新增纯算法功能时，在这里登记映射，测试代码即可直接用裸名引用。
 * 目前 Math.sumPrecise 的测试仍用显式 import（sky-core/pure/...），
 * 后续新功能建议改为裸名引用 + 在此登记。
 */
const polyfill = require("rollup-plugin-polyfill-inject");

module.exports = [
	polyfill({
		pure: {
			// ES2025 Math.sumPrecise（ES2027 规范）
			// node 22 尚无原生实现，pure/Math/sumPrecise 已回退到 impl
			// 如需强制测 impl（绕过 pure 的 native||impl 回退），取消注释：
			// "Math.sumPrecise": "sky-core/impl/Math/sumPrecise",
		},
		exclude: [
			"tests/corejs/helpers/*",
			"native/**/*",
			"polyfill/**/*",
			"polyfill-*/**/*"
		]
	})
];
