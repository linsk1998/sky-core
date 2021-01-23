export function getCurrentScript() {
	var node = document.currentScript;
	if(node && node.readyState === "interactive") {
		return node;
	}
	var nodes = document.scripts;
	var i = nodes.length;
	while(i--) {
		node = nodes[i];
		if(node.readyState === "interactive") {
			return node;
		}
	}
	return null;
};