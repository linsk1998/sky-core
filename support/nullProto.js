import { dontEnums } from "../utils-compat/dontEnums";

var nullProto = {};
nullProto.__proto__ = null;
if(nullProto.__proto__) {
	var i = dontEnums.length;
	while(i--) {
		nullProto[dontEnums[i]] = undefined;
	}
} else {
	nullProto = null;
}
export { nullProto };
