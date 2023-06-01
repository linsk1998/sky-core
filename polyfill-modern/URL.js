import { URL } from "../native/URL";
import { URL as modern_URL, URLProperties, getSearchParams } from "../impl-modern/URL";
if(!URL) {
	Object.defineProperties(modern_URL.prototype, URLProperties);
	window.URL = modern_URL;
} else {
	var url;
	try {
		url = new URL(location.href);
	} catch(e) {
	}
	if(!url || !('href' in url)) {
		modern_URL.createObjectURL = URL.createObjectURL;
		modern_URL.revokeObjectURL = URL.revokeObjectURL;
		Object.defineProperties(modern_URL.prototype, URLProperties);
		window.URL = modern_URL;
	} else {
		if(!('origin' in url)) {
			Object.defineProperty(URL.prototype, "origin", URLProperties.origin);
		}
		if(!('searchParams' in url)) {
			Object.defineProperty(URL.prototype, "searchParams", {
				enumerable: true, configurable: true,
				get: getSearchParams
			});
		}
		if(!('toJSON' in url)) {
			URL.prototype.toJSON = function() {
				return this.href;
			};
		}
		if(!('toString' in url) || url.toString() != url.href) {
			URL.prototype.toString = URL.prototype.toJSON;
		}
	}
}