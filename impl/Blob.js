
// Helper function that maps ArrayBufferViews to ArrayBuffers
// Used by BlobBuilder constructor and old browsers that didn't
// support it in the Blob constructor.
function mapArrayBufferViews(ary) {
	return ary.map(function(chunk) {
		if(chunk.buffer instanceof ArrayBuffer) {
			var buf = chunk.buffer;

			// if this is a subarray, make a copy so we only
			// include the subarray region from the underlying buffer
			if(chunk.byteLength !== buf.byteLength) {
				var copy = new Uint8Array(chunk.byteLength);
				copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
				buf = copy.buffer;
			}

			return buf;
		}

		return chunk;
	});
}

export function fixBlob(NativeBlob) {
	function BlobConstructor(ary, options) {
		return new NativeBlob(mapArrayBufferViews(ary), options || {});
	}
	return BlobConstructor;
}

export function createBlob(BlobBuilder) {
	function Blob(ary, options) {
		options = options || {};

		var bb = new BlobBuilder();
		mapArrayBufferViews(ary).forEach(function(part) {
			bb.append(part);
		});

		var blob = options.type ? bb.getBlob(options.type) : bb.getBlob();
		blob.slice = blob.slice || blob.webkitSlice || blob.mozSlice;
		return blob;
	}
	return Blob;
}
