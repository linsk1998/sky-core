
if(!this.console) {
	this.console = (function() {
		function log(data) {
			if(window.Debug) {
				Debug.writeln(data);
			}
		}
		function clear() {
		}
		return {
			log: log,
			info: log,
			error: log,
			warn: log,
			clear: clear
		};
	})();
}