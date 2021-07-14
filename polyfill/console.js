import { noop } from "../utils/noop";
if(!this.console) {
	this.console = {
		log: log,
		info: log,
		error: log,
		warn: log,
		clear: noop
	};
	function log(data) {
		if(window.Debug) {
			Debug.writeln(data);
		}
	}
}