import defineProperty from "sky-core/pure/Object/defineProperty";
import { getCurrentScript as ie_getCurrentScript } from "../../utils-compat/getCurrentScript";
import { getCurrentPathInit, getCurrentScriptByLast } from "../../impl-modern/document/currentScript";

export default (function() {
	if('currentScript' in document) {
		return document;
	} else {
		var getCurrentScript;
		if("readyState" in document.scripts[0]) {
			getCurrentScript = ie_getCurrentScript;
		} else {
			document.addEventListener('load', function(e) {
				if(e.target.tagName === "SCRIPT") {
					e.target.readyState = "complete";
				}
			}, true);
			getCurrentPathInit();
			getCurrentScript = getCurrentScriptByLast;
		}
		var o = new Object();
		defineProperty(o, "currentScript", {
			enumerable: true,
			get: getCurrentScript
		});
		return o;
	}
})();