export function at(index) {
	// 检查索引是否有效  
	var len = this.length;
	var relativeIndex = toIntegerOrInfinity(index);
	var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
	// 确保索引在字符串范围内  
	if(k < 0 || k >= len) {
		return;
	}
	return this.charAt(k);
}
function toIntegerOrInfinity(argument) {
	var number = +argument;
	return number !== number || number === 0 ? 0 : Math.trunc(number);
};