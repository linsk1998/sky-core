import { Blob as NativeBlob } from "../native/Blob";
import { blobSupported, blobSupportsArrayBufferView } from "../support/blob";
import { createBlob, fixBlob } from "../impl/Blob";

var Blob = NativeBlob;

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