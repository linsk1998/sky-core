var XHRProgid = null;
var versions = ["Microsoft.XMLHTTP", "MSXML2.XMLHTTP", "Msxml2.XMLHTTP.5.0"];
export function XMLHttpRequest() {
	if(XHRProgid) {
		return new ActiveXObject(XHRProgid);
	}
	var i = versions.length;
	while(i--) {
		try {
			var progid = versions[i];
			var request = new ActiveXObject(progid);
			if(request) {
				XHRProgid = progid;
				return request;
			}
		} catch(e) { }
	}
};