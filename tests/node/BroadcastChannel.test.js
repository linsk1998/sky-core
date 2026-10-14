import { expect } from "chai";
import { BroadcastChannel } from "sky-core/impl/BroadcastChannel";

function delay(ms) {
	return new Promise(function(resolve) {
		setTimeout(resolve, ms || 10);
	});
}

describe("BroadcastChannel", function() {
	it("should require the new operator", function() {
		expect(function() {
			BroadcastChannel("x");
		}).to.throw(TypeError);
	});
	it("should require one argument", function() {
		expect(function() {
			new BroadcastChannel();
		}).to.throw(TypeError);
	});
	it("should expose the channel name as a string", function() {
		var a = new BroadcastChannel("name");
		expect(a.name).to.equal("name");
		var b = new BroadcastChannel(123);
		expect(b.name).to.equal("123");
		a.close();
		b.close();
	});
	it("should deliver a message to another channel of the same name", async function() {
		var a = new BroadcastChannel("t1");
		var b = new BroadcastChannel("t1");
		var received = [];
		b.onmessage = function(e) {
			received.push(e.data);
		};
		a.postMessage("hello");
		await delay();
		expect(received).to.deep.equal(["hello"]);
		a.close();
		b.close();
	});
	it("should not deliver a message to the sender itself", async function() {
		var a = new BroadcastChannel("t2");
		var received = [];
		a.onmessage = function(e) {
			received.push(e.data);
		};
		a.postMessage("self");
		await delay();
		expect(received).to.deep.equal([]);
		a.close();
	});
	it("should not deliver to a channel of a different name", async function() {
		var a = new BroadcastChannel("t3a");
		var b = new BroadcastChannel("t3b");
		var received = [];
		b.onmessage = function(e) {
			received.push(e.data);
		};
		a.postMessage("cross");
		await delay();
		expect(received).to.deep.equal([]);
		a.close();
		b.close();
	});
	it("should deliver to multiple channels and provide a message event", async function() {
		var a = new BroadcastChannel("t4");
		var b = new BroadcastChannel("t4");
		var c = new BroadcastChannel("t4");
		var result = [];
		function record(e) {
			result.push({ data: e.data, type: e.type, self: e.target === this });
		}
		b.onmessage = record;
		c.onmessage = record;
		a.postMessage({ n: 1 });
		await delay();
		expect(result).to.deep.equal([
			{ data: { n: 1 }, type: "message", self: true },
			{ data: { n: 1 }, type: "message", self: true }
		]);
		a.close();
		b.close();
		c.close();
	});
	it("should support addEventListener and removeEventListener", async function() {
		var a = new BroadcastChannel("t5");
		var b = new BroadcastChannel("t5");
		var count = 0;
		function handler() {
			count++;
		}
		b.addEventListener("message", handler);
		a.postMessage("1");
		await delay();
		b.removeEventListener("message", handler);
		a.postMessage("2");
		await delay();
		expect(count).to.equal(1);
		a.close();
		b.close();
	});
	it("should support handleEvent object listeners", async function() {
		var a = new BroadcastChannel("t6");
		var b = new BroadcastChannel("t6");
		var got;
		b.addEventListener("message", {
			handleEvent: function(e) {
				got = e.data;
			}
		});
		a.postMessage("evt");
		await delay();
		expect(got).to.equal("evt");
		a.close();
		b.close();
	});
	it("should stop receiving messages after close", async function() {
		var a = new BroadcastChannel("t7");
		var b = new BroadcastChannel("t7");
		var received = [];
		b.onmessage = function(e) {
			received.push(e.data);
		};
		b.close();
		expect(b.name).to.equal("");
		a.postMessage("after-close");
		await delay();
		expect(received).to.deep.equal([]);
		a.close();
	});
	it("should throw when posting on a closed channel", function() {
		var a = new BroadcastChannel("t8");
		a.close();
		expect(function() {
			a.postMessage("x");
		}).to.throw(Error);
	});
	it("should be safe to close more than once", function() {
		var a = new BroadcastChannel("t9");
		a.close();
		expect(function() {
			a.close();
		}).to.not.throw();
	});
});
