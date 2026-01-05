import { AbortController } from "./AbortController";

export function abort(reason) {
	const ac = new AbortController();
	ac.abort(reason);
	return ac.signal;
};