
if(!window.localStorage) {
	var ele = document.createElement("localStorage");
	if(ele.addBehavior) {
		ele.addBehavior("#default#userData");
		document.head.appendChild(ele);
		window.localStorage = {
			getItem: function(key) {
				ele.load("localStorage");
				return ele.getAttribute(key);
			},
			setItem: function(key, value) {
				ele.setAttribute(key, new String(value));
				ele.save("localStorage");
			},
			removeItem: function(key) {
				ele.removeAttribute(key);
				ele.save("localStorage");
			},
			sham: true
		};
	}
}