import { Blob as NativeBlob } from "../native/Blob";
import { createBlob, fixBlob } from "../impl/Blob";

var Blob = NativeBlob;
var blobSupported = false;
var blobSupportsArrayBufferView = false;

try {
	// Check if Blob constructor is supported
	blobSupported = new Blob(["ä"]).size === 2;

	// Check if Blob constructor supports ArrayBufferViews
	// Fails in Safari 6, so we need to map to ArrayBuffers there.
	blobSupportsArrayBufferView = new Blob([new Uint8Array([1, 2])]).size === 2;
} catch(e) { }

if(!blobSupported) {
	var BlobBuilder = window.BlobBuilder
		|| window.WebKitBlobBuilder
		|| window.MozBlobBuilder;
	var blobBuilderSupported = BlobBuilder
		&& BlobBuilder.prototype.append
		&& BlobBuilder.prototype.getBlob;

	if(blobSupported) {
		if(!blobSupportsArrayBufferView) {
			window.Blob = Blob = fixBlob(Blob);
		}
	} else if(blobBuilderSupported) {
		window.Blob = Blob = createBlob(BlobBuilder);
	}
}

export { Blob };