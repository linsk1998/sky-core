if(!document.baseURI) {
	document.baseURI = (function() {
		var base = document.getElementsByName("BASE");
		if(base && base.length) {
			return base.href;
		}
		return location.href;
	})();
}