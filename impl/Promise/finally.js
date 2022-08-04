
export default function(onCompleted) {
	return this.then(function(value) {
		var r = onCompleted();
		if(r === undefined) {
			return value;
		}
		return r;
	}, function(error) {
		var r = onCompleted();
		if(r === undefined) {
			return error;
		}
		return r;
	});
};