var cssPromises = {};
export function loadCSS(href) {
	var p = cssPromises[href];
	if(p) {
		return p;
	}
	p = new Promise(function(resolve, reject) {
		var link = document.createElement('LINK');
		link.href = href;
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.onload = function() {
			var sheet = this.styleSheet;
			if(sheet) {
				var cssRules = sheet.rules;
				if(cssRules && cssRules.length) {
					resolve();
					return;
				}
			}
			reject(new URIError("Fail to load CSS:" + this.href));
		};
		link.onerror == function(e) {
			reject(new URIError("Fail to fetch CSS:" + this.href));
		};
		document.head.appendChild(link);
	});
	cssPromises[href] = p;
	return p;
}