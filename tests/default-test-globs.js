
/**
 * 各测试脚本的默认测试文件范围。
 *
 * 相对项目根目录的路径，支持 * / ** / ? 通配。
 * 命令行传了测试文件参数时，这里的配置会被忽略。
 */
module.exports = {
	/**
	 * npm run test:node（纯 node）默认范围：纯算法类测试。
	 * 这类测试不依赖浏览器环境，逐个文件维护在这里。
	 */
	node: [
		"tests/corejs/es/es.math.sum-precise.js",
		"tests/mdn/Math/sumPrecise.js",
	],

	/**
	 * npm run test:local（本机浏览器）默认范围：需要跨浏览器验证的测试。
	 */
	local: [
		"tests/corejs/es/*.js",
		"tests/mdn/**/*.js",
	],
};
