import defineProperty from "sky-core/pure/Object/defineProperty";
import { accessor } from "../../support/accessor";
import { getCurrentScript as ie_getCurrentScript } from "../../utils-compat/getCurrentScript";
import { getCurrentPathInit, getCurrentScriptByLast } from "../../impl-modern/document/currentScript";

export default (function() {
	if('currentScript' in document) {
		return document;
	} else if(!accessor) {
		try {
			window.execScript([
				'Class VBDocument',
				'	Public Property Get [currentScript]',
				'		For Each script in document.getElementsByTagName("SCRIPT")',
				'			If script.readyState = "interactive" Then',
				'				Set [currentScript]=script',
				'				Exit Property',
				'			End If',
				'		Next',
				'		Set [currentScript] = Null',
				'	End Property',
				'End Class',
				'Function VBDocumentFactory()',
				'	Set VBDocumentFactory = New VBDocument',
				'End Function'
			].join('\n'), 'VBScript');
		} catch(e) {
			console.error("不支持 IE11 仿真模式");
		}
		return VBDocumentFactory();
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