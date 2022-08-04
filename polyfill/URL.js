import { accessor } from "../support/accessor";
import { URL } from "../native/URL";
import { URL as modern_URL, URLProperties, getSearchParams } from "../impl-modern/URL";
import { URL as compat_URL, initURL } from "../impl-compat/URL";
if(!this.URL) {
	if(accessor) {
		Object.defineProperties(modern_URL.prototype, URLProperties);
		this.URL = modern_URL;
	} else {
		initURL();
		this.URL = compat_URL;
	}
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
		this.URL = modern_URL;
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
	}
}