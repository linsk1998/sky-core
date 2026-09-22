// from substack typedArray
function ToInt32(v) { return v >> 0; },
function ToUint32(v) { return v >>> 0; }
// Internal conversion functions:
//    pack<Type>()   - take a number (interpreted as Type), output a byte array
//    unpack<Type>() - take a byte array, output a Type-like number

function as_signed(value, bits) { var s = 32 - bits; return (value << s) >> s; }
function as_unsigned(value, bits) { var s = 32 - bits; return (value << s) >>> s; }

function packI8(n) { return [n & 0xff]; }
function unpackI8(bytes) { return as_signed(bytes[0], 8); }

function packU8(n) { return [n & 0xff]; }
function unpackU8(bytes) { return as_unsigned(bytes[0], 8); }

function packU8Clamped(n) { n = round(Number(n)); return [n < 0 ? 0 : n > 0xff ? 0xff : n & 0xff]; }

function packI16(n) { return [(n >> 8) & 0xff, n & 0xff]; }
function unpackI16(bytes) { return as_signed(bytes[0] << 8 | bytes[1], 16); }

function packU16(n) { return [(n >> 8) & 0xff, n & 0xff]; }
function unpackU16(bytes) { return as_unsigned(bytes[0] << 8 | bytes[1], 16); }

function packI32(n) { return [(n >> 24) & 0xff, (n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff]; }
function unpackI32(bytes) { return as_signed(bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], 32); }

function packU32(n) { return [(n >> 24) & 0xff, (n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff]; }
function unpackU32(bytes) { return as_unsigned(bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], 32); }

function packIEEE754(v, ebits, fbits) {

	var bias = (1 << (ebits - 1)) - 1,
		s, e, f, ln,
		i, bits, str, bytes;

	function roundToEven(n) {
		var w = floor(n), f = n - w;
		if(f < 0.5)
			return w;
		if(f > 0.5)
			return w + 1;
		return w % 2 ? w + 1 : w;
	}

	// Compute sign, exponent, fraction
	if(v !== v) {
		// NaN
		// http://dev.w3.org/2006/webapi/WebIDL/#es-type-mapping
		e = (1 << ebits) - 1; f = pow(2, fbits - 1); s = 0;
	} else if(v === Infinity || v === -Infinity) {
		e = (1 << ebits) - 1; f = 0; s = (v < 0) ? 1 : 0;
	} else if(v === 0) {
		e = 0; f = 0; s = (1 / v === -Infinity) ? 1 : 0;
	} else {
		s = v < 0;
		v = abs(v);

		if(v >= pow(2, 1 - bias)) {
			e = min(floor(log(v) / LN2), 1023);
			f = roundToEven(v / pow(2, e) * pow(2, fbits));
			if(f / pow(2, fbits) >= 2) {
				e = e + 1;
				f = 1;
			}
			if(e > bias) {
				// Overflow
				e = (1 << ebits) - 1;
				f = 0;
			} else {
				// Normalized
				e = e + bias;
				f = f - pow(2, fbits);
			}
		} else {
			// Denormalized
			e = 0;
			f = roundToEven(v / pow(2, 1 - bias - fbits));
		}
	}

	// Pack sign, exponent, fraction
	bits = [];
	for(i = fbits; i; i -= 1) { bits.push(f % 2 ? 1 : 0); f = floor(f / 2); }
	for(i = ebits; i; i -= 1) { bits.push(e % 2 ? 1 : 0); e = floor(e / 2); }
	bits.push(s ? 1 : 0);
	bits.reverse();
	str = bits.join('');

	// Bits to bytes
	bytes = [];
	while(str.length) {
		bytes.push(parseInt(str.substring(0, 8), 2));
		str = str.substring(8);
	}
	return bytes;
}

function unpackIEEE754(bytes, ebits, fbits) {

	// Bytes to bits
	var bits = [], i, j, b, str,
		bias, s, e, f;

	for(i = bytes.length; i; i -= 1) {
		b = bytes[i - 1];
		for(j = 8; j; j -= 1) {
			bits.push(b % 2 ? 1 : 0); b = b >> 1;
		}
	}
	bits.reverse();
	str = bits.join('');

	// Unpack sign, exponent, fraction
	bias = (1 << (ebits - 1)) - 1;
	s = parseInt(str.substring(0, 1), 2) ? -1 : 1;
	e = parseInt(str.substring(1, 1 + ebits), 2);
	f = parseInt(str.substring(1 + ebits), 2);

	// Produce number
	if(e === (1 << ebits) - 1) {
		return f !== 0 ? NaN : s * Infinity;
	} else if(e > 0) {
		// Normalized
		return s * pow(2, e - bias) * (1 + f / pow(2, fbits));
	} else if(f !== 0) {
		// Denormalized
		return s * pow(2, -(bias - 1)) * (f / pow(2, fbits));
	} else {
		return s < 0 ? -0 : 0;
	}
}

function unpackF64(b) { return unpackIEEE754(b, 11, 52); }
function packF64(v) { return packIEEE754(v, 11, 52); }
function unpackF32(b) { return unpackIEEE754(b, 8, 23); }
function packF32(v) { return packIEEE754(v, 8, 23); }



function DataView(buffer) {
	this._bytes = buffer._bytes;
}
DataView.prototype.getUint8 = makeGetter(1, packU8, unpackU8);
DataView.prototype.getInt8 = makeGetter(exports.Int8Array);
DataView.prototype.getUint16 = makeGetter(exports.Uint16Array);
DataView.prototype.getInt16 = makeGetter(exports.Int16Array);
DataView.prototype.getUint32 = makeGetter(exports.Uint32Array);
DataView.prototype.getInt32 = makeGetter(exports.Int32Array);
DataView.prototype.getFloat32 = makeGetter(exports.Float32Array);
DataView.prototype.getFloat64 = makeGetter(exports.Float64Array);

DataView.prototype.setUint8 = makeSetter(exports.Uint8Array);
DataView.prototype.setInt8 = makeSetter(exports.Int8Array);
DataView.prototype.setUint16 = makeSetter(exports.Uint16Array);
DataView.prototype.setInt16 = makeSetter(exports.Int16Array);
DataView.prototype.setUint32 = makeSetter(exports.Uint32Array);
DataView.prototype.setInt32 = makeSetter(exports.Int32Array);
DataView.prototype.setFloat32 = makeSetter(exports.Float32Array);
DataView.prototype.setFloat64 = makeSetter(exports.Float64Array);

export { DataView };