import { crypto as native_crypto } from "../../native/crypto";
import { randomUUID } from "../../impl/crypto/randomUUID";

export default (native_crypto && native_crypto.randomUUID)
	? native_crypto.randomUUID.bind(native_crypto)
	: randomUUID;
