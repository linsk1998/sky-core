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
		document.head.appendChild(link);
		resolve();
	});
	cssPromises[href] = p;
	return p;
}