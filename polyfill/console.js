
if(!this.console) {
	this.console = {
		log: function(data) {
			if(window.Debug) {
				Debug.writeln(data);
			}
		},
		clear: function() { }
	};
	console.info = console.error = console.warn = console.log;
}