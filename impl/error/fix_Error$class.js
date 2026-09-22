export function fix_Error$class(native_Error) {
	class Error extends native_Error {
		constructor(message) {
			super(message);
			var options = arguments[1];
			if(typeof options === "object" && options !== null) {
				if('cause' in options) {
					this.cause = options.cause;
				}
			}
		}
	};
	return Error;
}