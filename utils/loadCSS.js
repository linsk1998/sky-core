export function loadCSS(href, resolve, reject) {
	var link = document.createElement('LINK');
	link.href = href;
	link.rel = 'stylesheet';
	link.type = 'text/css';
	var timer;
	if(resolve || reject) {
		if('onload' in link) {
			link.onload = function() {
				clearTimeout(timer);
				var sheet = this.sheet || this.styleSheet;
				if(sheet) {
					var cssRules = sheet.cssRules || sheet.rules;
					if(cssRules && cssRules.length) {
						if(resolve) resolve();
						return;
					}
				}
				if(reject) reject(new Error("Fail to load CSS:" + this.href));
			};
			if(resolve) {
				var t1 = Date.now();
				var checkLoaded = function() {
					var sheet = this.sheet;
					if(sheet && sheet.cssRules.length) {
						if(resolve) resolve();
					} else if(Date.now() - t1 < 1000) {
						timer = setTimeout(checkLoaded);
					} else {
						setTimeout(resolve);
					}
				};
				timer = setTimeout(checkLoaded);
			}
		} else {
			if(resolve) setTimeout(resolve);
		}
	}
	if(reject && 'onerror' in link) {
		link.onerror = function(e) {
			clearTimeout(timer);
			reject(new Error("Fail to fetch CSS:" + this.href));
		};
	}
	document.head.appendChild(link);
	return link;
}