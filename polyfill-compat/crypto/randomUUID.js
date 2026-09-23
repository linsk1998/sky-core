import { crypto as native_crypto } from "../../native/crypto";
import { randomUUID } from "../../impl/crypto/randomUUID$Math";

var crypto = native_crypto;
if(!crypto) {
	crypto = window.crypto = {};
}
if(!crypto.randomUUID) {
	crypto.randomUUID = randomUUID;
}
