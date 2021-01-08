import { noop } from "../utils/noop";
if(!this.console) {
	this.console = {};
	console.stack = [];
	console.log = console.info = console.error = console.warn = function(data) {
		if(window.Debug) {
			Debug.writeln(data);
		}
	};
	console.clear = noop;
}