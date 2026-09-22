
import { toString } from "../native/Object/prototype/toString";
import { bytes } from "./Body/prototype/bytes";
import { formData } from "./Body/prototype/formData";

function consumed(body) {
	if(body._noBody) return;
	if(body.bodyUsed) {
		return Promise.reject(new TypeError('Already read'));
	}
	body.bodyUsed = true;
}
function fileReaderReady(reader) {
	return new Promise(function(resolve, reject) {
		reader.onload = function() {
			resolve(reader.result);
		};
		reader.onerror = function() {
			reject(reader.error);
		};
	});
}
function readBlobAsArrayBuffer(blob) {
	var reader = new FileReader();
	var promise = fileReaderReady(reader);
	reader.readAsArrayBuffer(blob);
	return promise;
}
function readBlobAsText(blob) {
	var reader = new FileReader();
	var promise = fileReaderReady(reader);
	var match = /charset=([A-Za-z0-9_-]+)/.exec(blob.type);
	var encoding = match ? match[1] : 'utf-8';
	reader.readAsText(blob, encoding);
	return promise;
}
function readArrayBufferAsText(buf) {
	var view = new Uint8Array(buf);
	var chars = new Array(view.length);

	for(var i = 0; i < view.length; i++) {
		chars[i] = String.fromCharCode(view[i]);
	}
	return chars.join('');
}
function bufferClone(buf) {
	if(buf.slice) {
		return buf.slice(0);
	} else {
		var view = new Uint8Array(buf.byteLength);
		view.set(new Uint8Array(buf));
		return view.buffer;
	}
}

// Body 不是一个class，而是mixin
// 通过Body创建Request和Response这些类的原型方法
// Body.call(Request.prototype) Body.call(Response.prototype)
function Body() {
	this.bodyUsed = false;
	this._initBody = function(body) {
		this._bodyInit = body;
		if(!body) {
			this._noBody = true;
			this._bodyText = '';
		} else if(typeof body === 'string') {
			this._bodyText = body;
		} else if(body instanceof URLSearchParams) {
			this._bodyText = body.toString();
		} else {
			switch(toString.call(body)) {
				case '[object Blob]':
				case '[object File]':
					this._bodyBlob = body;
					break;
				case '[object FormData]':
					this._bodyFormData = body;
					break;
				case '[object DataView]':
					this._bodyArrayBuffer = bufferClone(body.buffer);
					break;
				case '[object ArrayBuffer]':
					this._bodyArrayBuffer = bufferClone(body.buffer);
					// IE 10-11 can't handle a DataView body.
					this._bodyInit = new Blob([this._bodyArrayBuffer]);
					break;
				default:
					this._bodyText = body = Object.prototype.toString.call(body);
			}
		}
		if(!this.headers.get('content-type') && body) {
			if(typeof body === 'string') {
				this.headers.set('content-type', 'text/plain;charset=UTF-8');
			} else if(body instanceof URLSearchParams) {
				this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
			} else if(this._bodyBlob && this._bodyBlob.type) {
				switch(toString.call(body)) {
					case '[object Blob]':
					case '[object File]':
				}
				this.headers.set('content-type', this._bodyBlob.type);
			}
		}
	};
	this.blob = function() {
		var rejected = consumed(this);
		if(rejected) {
			return rejected;
		}

		if(this._bodyBlob) {
			return Promise.resolve(this._bodyBlob);
		} else if(this._bodyArrayBuffer) {
			return Promise.resolve(new Blob([this._bodyArrayBuffer]));
		} else if(this._bodyFormData) {
			throw new Error('could not read FormData body as blob');
		} else {
			return Promise.resolve(new Blob([this._bodyText]));
		}
	};
	this.arrayBuffer = function() {
		if(this._bodyArrayBuffer) {
			var isConsumed = consumed(this);
			if(isConsumed) {
				return isConsumed;
			} else if(ArrayBuffer.isView(this._bodyArrayBuffer)) {
				return Promise.resolve(
					this._bodyArrayBuffer.buffer.slice(
						this._bodyArrayBuffer.byteOffset,
						this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
					)
				);
			} else {
				return Promise.resolve(this._bodyArrayBuffer);
			}
		} else if(this._bodyBlob) {
			return readBlobAsArrayBuffer(this._bodyBlob);
		} else {
			throw new Error('could not read as ArrayBuffer');
		}
	};
	this.text = function() {
		var rejected = consumed(this);
		if(rejected) {
			return rejected;
		}

		if(this._bodyBlob) {
			return readBlobAsText(this._bodyBlob);
		} else if(this._bodyArrayBuffer) {
			return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
		} else if(this._bodyFormData) {
			throw new Error('could not read FormData body as text');
		} else {
			return Promise.resolve(this._bodyText);
		}
	};
	this.json = function() {
		return this.text().then(JSON.parse);
	};
	this.formData = formData;
	this.bytes = bytes;
}

export { Body };