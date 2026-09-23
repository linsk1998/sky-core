import { crypto } from "../../native/crypto";

var getRandomValues;
if(crypto && crypto.getRandomValues) {
	getRandomValues = crypto.getRandomValues.bind(crypto);
}
export function randomUUID() {
	var bytes = new Uint8Array(16);
	if(getRandomValues) {
		getRandomValues(bytes);
	} else {
		// 兜底使用 Math.random，不具备加密安全性
		for(var i = 0; i < 16; i++) {
			bytes[i] = Math.floor(Math.random() * 256);
		}
	}
	// version 4
	bytes[6] = (bytes[6] & 0x0f) | 0x40;
	// variant RFC 4122
	bytes[8] = (bytes[8] & 0x3f) | 0x80;
	var hex = new Array(16);
	for(var i = 0; i < 16; i++) {
		var h = bytes[i].toString(16);
		if(h.length < 2) {
			h = '0' + h;
		}
		hex[i] = h;
	}
	return hex[0] + hex[1] + hex[2] + hex[3] + '-' +
		hex[4] + hex[5] + '-' +
		hex[6] + hex[7] + '-' +
		hex[8] + hex[9] + '-' +
		hex[10] + hex[11] + hex[12] + hex[13] + hex[14] + hex[15];
}
