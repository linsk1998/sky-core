import { AbortController } from "../AbortController";

export function abort(reason) {
	var ac = new AbortController();
	ac.abort(reason);
	return ac.signal;
};