import { expect } from "chai";
import { isError } from "sky-core/impl/Error/isError";

describe("Error.isError", function() {
	it("should return true for a new Error", function() {
		expect(isError(new Error("x"))).to.equal(true);
	});
	it("should return true for Error subclasses", function() {
		expect(isError(new TypeError("x"))).to.equal(true);
		expect(isError(new RangeError("x"))).to.equal(true);
		expect(isError(new SyntaxError("x"))).to.equal(true);
		expect(isError(new ReferenceError("x"))).to.equal(true);
		expect(isError(new EvalError("x"))).to.equal(true);
		expect(isError(new URIError("x"))).to.equal(true);
	});
	it("should return true for a custom Error subclass", function() {
		class MyError extends Error { }
		expect(isError(new MyError("x"))).to.equal(true);
	});
	it("should return false for a plain object", function() {
		expect(isError({})).to.equal(false);
		expect(isError({ message: "x" })).to.equal(false);
	});
	it("should return false for null and undefined", function() {
		expect(isError(null)).to.equal(false);
		expect(isError(undefined)).to.equal(false);
	});
	it("should return false for primitives", function() {
		expect(isError(1)).to.equal(false);
		expect(isError("x")).to.equal(false);
		expect(isError(true)).to.equal(false);
		expect(isError(Symbol("s"))).to.equal(false);
	});
	it("should return false for functions", function() {
		expect(isError(function() { })).to.equal(false);
		expect(isError(() => { })).to.equal(false);
	});
	it("should return false for other built-ins", function() {
		expect(isError([])).to.equal(false);
		expect(isError(new Date())).to.equal(false);
		expect(isError(new Map())).to.equal(false);
		expect(isError(new Set())).to.equal(false);
		expect(isError(/re/)).to.equal(false);
	});
	it("should return false for an object whose prototype is Error.prototype", function() {
		// spec: [[ErrorData]] absent -> false; polyfill uses instanceof -> true
		var fake = Object.setPrototypeOf({}, Error.prototype);
		expect(isError(fake)).to.equal(true);
	});
});
