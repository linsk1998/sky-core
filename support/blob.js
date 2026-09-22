import { Blob } from "../native/Blob";

var blobSupported = false;
var blobSupportsArrayBufferView = false;

try {
	// Check if Blob constructor is supported
	blobSupported = new Blob(["ä"]).size === 2;

	// Check if Blob constructor supports ArrayBufferViews
	// Fails in Safari 6, so we need to map to ArrayBuffers there.
	blobSupportsArrayBufferView = new Blob([new Uint8Array([1, 2])]).size === 2;
} catch(e) { }

export { blobSupported, blobSupportsArrayBufferView };
