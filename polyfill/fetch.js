import { fetch as native_fetch } from "../native/fetch";
import { AbortController as native_AbortController } from "../native/AbortController";
import { globalThis } from "../native/globalThis";
import { fetch } from "../impl/fetch";

if(!native_fetch) {
	window.fetch = fetch;
} else {
	if(!native_AbortController) {
		window.fetch = fetch;
	} else if(!globalThis) {// 大致判断是否默认携带 Cookie
		// 旧浏览器：代理并显式设置 credentials
		window.fetch = function(url) {
			var options = arguments[1] || {};
			// 如果用户没有手动设置 credentials，则添加 same-origin
			if(!options.credentials) {
				options.credentials = 'same-origin';
			}
			return native_fetch(url, options);
		};
	}
}