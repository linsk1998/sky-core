
import { getCurrentScript as getCurrentScript$compat } from "../utils-compat/getCurrentScript";
import { getCurrentScript as getCurrentScript$doc } from "../utils-es2015/getCurrentScript";
import { getCurrentPathInit, getCurrentScriptByLast, getCurrentScript$ie } from "../impl/document/currentScript";
import { accessor } from "../support/accessor";
var getCurrentScript;
if(accessor) {
	if('currentScript' in document) {
		getCurrentScript = getCurrentScript$doc;
	} else {
		if("readyState" in document.scripts[0]) {
			getCurrentScript = getCurrentScript$ie;
		} else {
			getCurrentPathInit();
			getCurrentScript = getCurrentScriptByLast;
		}
	}
} else {
	getCurrentScript = getCurrentScript$compat;
}
export { getCurrentScript };
