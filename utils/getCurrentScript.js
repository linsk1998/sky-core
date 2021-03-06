
import { getCurrentScript as ie_getCurrentScript } from "../utils-compat/getCurrentScript";
import { getCurrentPathInit, getCurrentScriptByLast } from "../impl-modern/document/currentScript";
var getCurrentScript;
if('currentScript' in document) {
	getCurrentScript = function() {
		return document.currentScript;
	};
} else {
	if("readyState" in document.scripts[0]) {
		getCurrentScript = ie_getCurrentScript;
	} else {
		getCurrentPathInit();
		getCurrentScript = getCurrentScriptByLast;
	}
}
export { getCurrentScript };