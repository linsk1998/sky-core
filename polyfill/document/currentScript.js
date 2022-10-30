import { getCurrentPathInit, getCurrentScriptByLast, ie_getCurrentScript } from "../../impl-modern/document/currentScript";
import { accessor } from "../../support/accessor";

var getCurrentScript;
if(accessor && !('currentScript' in document)) {
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