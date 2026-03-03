export function bytes() {
	return this.arrayBuffer().then(function(buffer) { return new Uint8Array(buffer); });
};