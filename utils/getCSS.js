export function getCSS(href, resolve, reject) {
	var link = document.createElement('LINK');
	link.href = href;
	link.rel = 'stylesheet';
	link.type = 'text/css';
	if(resolve) {
		setTimeout(resolve);
	}
	document.head.appendChild(link);
	return link;
}