import { isFunction } from "sky-core";

export default function(onCompleted) {
	var fun = isFunction(onCompleted);
	return this.then(
		fun ?
			function(x) {
				return Promise.resolve(onCompleted()).then(function() { return x; });
			} :
			onCompleted,
		fun ?
			function(e) {
				onCompleted();
				throw e;
			} :
			onCompleted
	);
};
