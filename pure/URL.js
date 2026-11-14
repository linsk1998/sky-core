import { URL } from "../native/URL";
import { URL as modern_URL, URLProperties, getSearchParams } from "../impl/URL/URL";
import { URL$vb, initURL } from "../impl/URL/URL$vb";
import { accessor } from "../support/accessor";
export default (function() {
	if(!URL) {
		if(accessor) {
			Object.defineProperties(modern_URL.prototype, URLProperties);
			return modern_URL;
		} else {
			initURL();
			return URL$vb;
		}
	} else {
		var url;
		var portQuirk = false;
		try {
			url = new URL(location.href);
			url.port = "";
			portQuirk = url.port === "0";
		} catch(e) {
			url = null;
		}
		if(!url || !('href' in url) || portQuirk) {
			modern_URL.createObjectURL = URL.createObjectURL;
			modern_URL.revokeObjectURL = URL.revokeObjectURL;
			Object.defineProperties(modern_URL.prototype, URLProperties);
			return modern_URL;
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
			return URL;
		}
	}
})();
