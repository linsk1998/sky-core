if(!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(e) {
		var fromIndex = 0;
		if(arguments.length > 1) {
			fromIndex = 0 + arguments[1];
			if(fromIndex < 0) {
				fromIndex += this.length;
				if(fromIndex < 0) {
					fromIndex = 0;
				}
			}
		}
		for(var i = fromIndex; i < this.length; i++) {
			if(i in this && this[i] === e) { return i; }
		}
		return -1;
	};
}