export function getScript(src, resolve, reject) {
	var script = document.createElement('script');
	script.src = src;
	script.async = true;
	if(resolve) script.onload = resolve;
	if(reject) script.onerror = reject;
	document.head.appendChild(script);
	return script;
};