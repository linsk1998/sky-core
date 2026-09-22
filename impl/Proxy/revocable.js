function revokedHandle() {
	throw new TypeError('Proxy has been revoked');
}

export function revocable(target, handler) {
	var trapHandler = {};
	var proxy = new Proxy(target, handler);
	var revoke = function() {
		trapHandler.has =
			trapHandler.get =
			trapHandler.set =
			trapHandler.apply =
			trapHandler.construct =
			trapHandler.getPrototypeOf =
			trapHandler.setPrototypeOf =
			trapHandler.isExtensible =
			trapHandler.preventExtensions =
			trapHandler.ownKeys =
			trapHandler.defineProperty =
			trapHandler.deleteProperty =
			trapHandler.getOwnPropertyDescriptor =
			revokedHandle;
	};
	proxy = new Proxy(proxy, trapHandler);
	return { proxy: proxy, revoke: revoke };
};