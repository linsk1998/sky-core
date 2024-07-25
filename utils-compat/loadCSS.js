export function loadCSS(href, resolve, reject) {
	var link = document.createElement('LINK');
	link.href = href;
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.onload = function() {
		var sheet = this.styleSheet;
		if(sheet) {
			var cssRules = sheet.rules;
			if(cssRules && cssRules.length) {
				if(resolve) resolve();
				return;
			}
		}
		if(reject) reject(new Error("Fail to load CSS:" + this.href));
	};
	link.onerror = function(e) {
		if(reject) reject(new Error("Fail to fetch CSS:" + this.href));
	};
	document.head.appendChild(link);
	return link;
}