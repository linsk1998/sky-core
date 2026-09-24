import { expect } from "chai";
import { sumPrecise } from "sky-core/impl/Math/sumPrecise";

describe("Math.sumPrecise", function() {
	it("should sum an array of decimals precisely", function() {
		// naive: 0.9999999999999999
		expect(sumPrecise([0.1, 0.2, 0.3, 0.4, 0.5])).to.equal(1.5);
	});
	it("should sum 0.1 ten times to exactly 1", function() {
		// naive: 0.9999999999999999
		expect(sumPrecise(Array(10).fill(0.1))).to.equal(1);
	});
	it("should handle large+small cancellation (Kahan weakness case)", function() {
		// naive: 1, Neumaier: 2
		expect(sumPrecise([1e16, 1, -1e16, 1])).to.equal(2);
	});
	it("should accept Set iterable", function() {
		expect(sumPrecise(new Set([0.1, 0.2, 0.3]))).to.equal(0.6);
	});
	it("should accept a generator", function() {
		function* gen() {
			yield 0.1;
			yield 0.2;
			yield 0.3;
		}
		expect(sumPrecise(gen())).to.equal(0.6);
	});
	it("should return 0 for an empty iterable", function() {
		expect(sumPrecise([])).to.equal(0);
	});
	it("should accept Map.values() iterator", function() {
		var m = new Map([["a", 0.1], ["b", 0.2]]);
		expect(sumPrecise(m.values())).to.equal(0.30000000000000004);
	});
	it("should throw TypeError for non-iterable array-like", function() {
		expect(function() {
			sumPrecise({ 0: 0.1, 1: 0.2, length: 2 });
		}).to.throw(TypeError);
	});
	it("should throw TypeError for null/undefined", function() {
		expect(function() { sumPrecise(null); }).to.throw(TypeError);
		expect(function() { sumPrecise(undefined); }).to.throw(TypeError);
	});
	it("should throw TypeError for numbers", function() {
		expect(function() { sumPrecise(42); }).to.throw(TypeError);
	});
});
