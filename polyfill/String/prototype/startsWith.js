if(!String.prototype.startsWith) {
	String.prototype.startsWith = function startsWith(prefix) {
		var position = arguments[1];
		prefix = String(prefix);
		var len = prefix.length;
		position = position || 0;
		if(position < 0) {
			position += this.length;
			if(position < 0) {
				position = 0;
			}
		}
		return this.slice(position, len) === prefix;
	};
}