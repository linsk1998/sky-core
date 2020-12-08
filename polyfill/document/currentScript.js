
import { getCurrentScript as ie_getCurrentScript } from "../utils-compat/getCurrentScript";
import { getCurrentPathInit, getCurrentScriptByLast } from "../impl-modern/currentScript";
var getCurrentScript;
if(!('currentScript' in document)) {
	if("readyState" in document.scripts[0]) {
		getCurrentScript = ie_getCurrentScript;
	} else {
		getCurrentPathInit();
		getCurrentScript = getCurrentScriptByLast;
	}
	Object.defineProperty(document, "currentScript", {
		enumerable: true,
		get: getCurrentScript
	});
}