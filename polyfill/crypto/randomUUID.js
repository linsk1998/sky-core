import { crypto as native_crypto } from "../../native/crypto";
import { randomUUID } from "../../impl/crypto/randomUUID";
import { randomUUID as randomUUID$Math } from "../../impl/crypto/randomUUID$Math";

var crypto = native_crypto;
if(!crypto) {
	crypto = window.crypto = {};
}
if(!crypto.randomUUID) {
	if(crypto.getRandomValues) {
		crypto.randomUUID = randomUUID;
	} else {
		crypto.randomUUID = randomUUID$Math;
	}
}
