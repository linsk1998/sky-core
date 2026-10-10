import { expect } from "chai";
import { fromAsync } from "sky-core/impl/Array/fromAsync";

describe("Array.fromAsync", function() {
	it("should handle a plain array", async function() {
		var result = await fromAsync([1, 2, 3]);
		expect(result).to.deep.equal([1, 2, 3]);
	});
	it("should handle an array of promises (settling)", async function() {
		var result = await fromAsync([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]);
		expect(result).to.deep.equal([1, 2, 3]);
	});
	it("should accept a sync iterable (Set)", async function() {
		var result = await fromAsync(new Set([10, 20, 30]));
		expect(result).to.deep.equal([10, 20, 30]);
	});
	it("should accept a generator", async function() {
		function* gen() {
			yield 1;
			yield 2;
			yield 3;
		}
		var result = await fromAsync(gen());
		expect(result).to.deep.equal([1, 2, 3]);
	});
	it("should accept an async iterable", async function() {
		var obj = {
			[Symbol.asyncIterator]: function() {
				var i = 0;
				return {
					next: function() {
						i++;
						if(i <= 3) {
							return Promise.resolve({ value: i, done: false });
						}
						return Promise.resolve({ value: undefined, done: true });
					}
				};
			}
		};
		var result = await fromAsync(obj);
		expect(result).to.deep.equal([1, 2, 3]);
	});
	it("should accept an async generator", async function() {
		async function* gen() {
			yield 1;
			yield 2;
			yield 3;
		}
		var result = await fromAsync(gen());
		expect(result).to.deep.equal([1, 2, 3]);
	});
	it("should accept an array-like object", async function() {
		var result = await fromAsync({ 0: "a", 1: "b", 2: "c", length: 3 });
		expect(result).to.deep.equal(["a", "b", "c"]);
	});
	it("should accept a string", async function() {
		var result = await fromAsync("abc");
		expect(result).to.deep.equal(["a", "b", "c"]);
	});
	it("should handle an empty array", async function() {
		var result = await fromAsync([]);
		expect(result).to.deep.equal([]);
	});
	it("should apply mapFn", async function() {
		var result = await fromAsync([1, 2, 3], function(x) { return x * 2; });
		expect(result).to.deep.equal([2, 4, 6]);
	});
	it("should apply mapFn with correct index", async function() {
		var indices = [];
		var result = await fromAsync([10, 20, 30], function(x, i) { indices.push(i); return x; });
		expect(indices).to.deep.equal([0, 1, 2]);
		expect(result).to.deep.equal([10, 20, 30]);
	});
	it("should apply mapFn that returns a promise", async function() {
		var result = await fromAsync([1, 2, 3], function(x) { return Promise.resolve(x * 10); });
		expect(result).to.deep.equal([10, 20, 30]);
	});
	it("should accept mapFn thisArg", async function() {
		var ctx = { factor: 3 };
		var result = await fromAsync([1, 2], function(x) { return x * this.factor; }, ctx);
		expect(result).to.deep.equal([3, 6]);
	});
	it("should reject when a promise in the array rejects", async function() {
		try {
			await fromAsync([Promise.reject(new Error("boom"))]);
			expect.fail("should have rejected");
		} catch(e) {
			expect(e.message).to.equal("boom");
		}
	});
	it("should reject when mapFn throws", async function() {
		try {
			await fromAsync([1, 2], function() { throw new Error("mapFn error"); });
			expect.fail("should have rejected");
		} catch(e) {
			expect(e.message).to.equal("mapFn error");
		}
	});
	it("should throw TypeError for null", function() {
		expect(function() { fromAsync(null); }).to.throw(TypeError);
	});
	it("should throw TypeError for undefined", function() {
		expect(function() { fromAsync(undefined); }).to.throw(TypeError);
	});
	it("should throw TypeError when mapFn is not a function", function() {
		expect(function() { fromAsync([1, 2], "not a function"); }).to.throw(TypeError);
	});
});
