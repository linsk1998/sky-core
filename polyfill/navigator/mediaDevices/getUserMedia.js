if(!navigator.mediaDevices.getUserMedia) {
	navigator.mediaDevices.getUserMedia = function(constraints) {
		var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		if(getUserMedia) {
			return new Promise(function(resolve, reject) {
				getUserMedia.call(navigator, constraints, resolve, reject);
			});
		}
		var error = new Error("Browser Not Support");
		error.type = "NotFoundError";
		return Promise.reject(error);
	};
}