export function loadCSS(href, resolve, reject) {
	var link = document.createElement('LINK');
	link.href = href;
	link.rel = 'stylesheet';
	link.type = 'text/css';
	if(resolve || reject) {
		link.onload = function() {
			var sheet = this.sheet;
			if(sheet) {
				var cssRules = sheet.cssRules;
				if(cssRules && cssRules.length) {
					if(resolve) resolve();
					return;
				}
			}
			if(reject) reject(new Error("Fail to load CSS:" + this.href));
		};
	}
	if(reject) {
		link.onerror = function(e) {
			reject(new Error("Fail to fetch CSS:" + this.href));
		};
	}
	document.head.appendChild(link);
	return link;
}