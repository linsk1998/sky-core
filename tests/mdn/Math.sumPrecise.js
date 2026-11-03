// 移植自 MDN Math.sumPrecise 示例
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sumPrecise
import sumPrecise from "sky-core/pure/Math/sumPrecise";

QUnit.test('Math.sumPrecise (MDN)', assert => {
	// Try it
	assert.same(sumPrecise([1, 2]), 3, 'Math.sumPrecise([1, 2])');
	assert.same(sumPrecise([1e20, 0.1, -1e20]), 0.1, 'Math.sumPrecise([1e20, 0.1, -1e20])');

	// Description：朴素累加在大数吃掉小数后丢失精度（结果 0），sumPrecise 精确（结果 0.1）
	let sum = 0;
	const numbers = [1e20, 0.1, -1e20];
	for(const number of numbers) {
		sum += number;
	}
	assert.same(sum, 0, 'naive summation loses precision');
	assert.same(sumPrecise(numbers), 0.1, 'sumPrecise is exact');

	assert.same(sumPrecise([0.1, 0.2]), 0.30000000000000004, 'Math.sumPrecise([0.1, 0.2])');

	// Using Math.sumPrecise()
	assert.same(sumPrecise([1, 2, 3]), 6, 'Math.sumPrecise([1, 2, 3])');
});
