import { getCurrentPathInit, getCurrentScriptByLast, getCurrentScript$ie } from "../../impl/document/currentScript";
import { accessor } from "../../support/accessor";

var getCurrentScript;
if(accessor && !('currentScript' in document)) {
	if("readyState" in document.scripts[0]) {
		getCurrentScript = getCurrentScript$ie;
	} else {
		getCurrentPathInit();
		getCurrentScript = getCurrentScriptByLast;
	}
	Object.defineProperty(document, "currentScript", {
		enumerable: true,
		get: getCurrentScript
	});
}
