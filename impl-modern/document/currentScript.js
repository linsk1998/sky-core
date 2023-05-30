export { Error } from "../../native/Error";

export function ie_getCurrentScript() {
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

var stackResultName, stackResultPattern, supportStack;
export function getCurrentPathInit() {
	if(supportStack != undefined) {
		return supportStack;
	}
	document.addEventListener('load', function(e) {
		if(e.target.tagName === "SCRIPT") {
			e.target.readyState = "complete";
		}
	}, true);
	try {
		throw new Error('get stack');
	} catch(e) {
		var stackHandler = {
			'stack': [
				/^@(.*):\d+$/,// Firefox
				/^\s+at (.*):\d+:\d+$/,//Chrome
				/^\s+at [^\(]*\((.*):\d+:\d+\)$/ //IE11
			],
			'stacktrace': [
				/\(\) in\s+(.*?\:\/\/\S+)/m//opera
			]
		};
		for(var name in stackHandler) {
			var stacks = e[name];
			if(stacks) {
				var patterns = stackHandler[name];
				var stack = getLastStack(stacks);
				var i = patterns.length;
				while(i--) {
					var pattern = patterns[i];
					if(pattern.test(stack)) {
						stackResultName = name;
						stackResultPattern = pattern;
						supportStack = true;
						return true;
					}
				}
			}
		}
	}
	return false;
}
export function getStackSupport() {
	return supportStack;
}
export function getCurrentPathByStack() {
	try {
		throw new Error('get stack');
	} catch(e) {
		var arr = getLastStack(e[stackResultName]).match(stackResultPattern);
		if(arr) {
			if(arr[1] != location.href && arr[1] != location.origin + location.pathname + location.search) {
				return arr[1];
			}
		}
	}
}
function getLastStack(stack) {
	var stacks = stack.trim().split("\n");
	return stacks[stacks.length - 1];
}

export function getCurrentScriptByLast() {
	var path = supportStack ? getCurrentPathByStack() : null;
	var nodes = document.getElementsByTagName('SCRIPT');
	var arr = [];
	for(var i = 0; i < nodes.length; i++) {
		var node = nodes[i];
		if(node.readyState === "complete") {
			continue;
		}
		if(node.src) {
			if(path !== new URL(node.src, location).href) {
				continue;
			}
		} else if(path) {
			continue;
		}
		arr.push(node);
	}
	nodes = null;
	if(arr.length) {
		return arr[arr.length - 1];
	}
	return null;
}