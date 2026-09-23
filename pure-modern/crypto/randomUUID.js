import { crypto as native_crypto } from "../../native/crypto";
import { randomUUID } from "../../impl/crypto/randomUUID";
import { randomUUID as randomUUID$Math } from "../../impl/crypto/randomUUID$Math";

var fn;
if(native_crypto && native_crypto.randomUUID) {
	fn = native_crypto.randomUUID.bind(native_crypto);
} else if(native_crypto && native_crypto.getRandomValues) {
	fn = randomUUID;
} else {
	fn = randomUUID$Math;
}
export default fn;
