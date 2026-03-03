import { AbortController } from "../AbortController";

export function timeout(time) {
	var controller = new AbortController();

	setTimeout(function() {
		controller.abort(new DOMException('This signal is timeout in ' + time + 'ms', 'TimeoutError'));
	}, time);

	return controller.signal;
};