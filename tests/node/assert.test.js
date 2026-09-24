var expect = require('chai').expect;

describe('assert example', function() {
	it('should add two numbers', function() {
		expect(1 + 1).to.equal(2);
	});
	it('should compare strings', function() {
		expect('sky' + '-core').to.equal('sky-core');
	});
	it('should handle arrays', function() {
		expect([1, 2, 3]).to.have.length(3);
	});
});
