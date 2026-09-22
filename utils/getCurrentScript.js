
import { getCurrentScript as compat_getCurrentScript } from "../utils-compat/getCurrentScript";
import { getCurrentPathInit, getCurrentScriptByLast, ie_getCurrentScript } from "../impl-modern/document/currentScript";
import { accessor } from "../support/accessor";
var getCurrentScript;
if(accessor) {
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
} else {
	getCurrentScript = compat_getCurrentScript;
}
export { getCurrentScript };