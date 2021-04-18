if(!String.prototype.endsWith) {
	String.prototype.endsWith = function endsWith(prefix) {
		var position = arguments[1];
		prefix = String(prefix);
		var len = prefix.length;
		position = position < len ? position : this.length;
		if(position < 0) {
			position += this.length;
			if(position < 0) {
				position = 0;
			}
		}
		return this.slice(position - len, position) === prefix;
	};
}