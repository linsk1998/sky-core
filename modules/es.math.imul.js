if (!Math.imul) {
	Math.imul = function imul(x, y) {
		var UINT16 = 0xFFFF;
		var xn = +x;
		var yn = +y;
		var xl = UINT16 & xn;
		var yl = UINT16 & yn;
		return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	};
}