import { isNotSymbolKey } from "../enum/isNotSymbolKey";

// 无 defineProperties 的环境（如 Chrome 4）符号模拟退化为裸字符串键，
// defineProperties 遍历时会把 @@ 前缀的符号键当普通属性名处理。
// 按库约定（@@ 开头表示 Symbol，枚举类函数中跳过）过滤后再交给底层实现。
export function fix_defineProperties(impl) {
	return function defineProperties(obj, properties) {
		var filtered = {};
		for(var key in properties) {
			if(isNotSymbolKey(key) && Object.hasOwn(properties, key)) {
				filtered[key] = properties[key];
			}
		}
		return impl(obj, filtered);
	};
}
