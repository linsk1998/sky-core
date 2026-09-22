import { Error as native_Error } from "../native/Error";

export default (() => {
	try {
		throw new native_Error("", { cause: 1 });
	} catch(e) {
		if(!('cause' in e)) {
			return class Error extends native_Error {
				constructor(message) {
					super(message);
					if(typeof options === "object" && options !== null) {
						if('cause' in options) {
							this.cause = options.cause;
						}
					}
				}
			};
		}
	}
	return native_Error;
})();