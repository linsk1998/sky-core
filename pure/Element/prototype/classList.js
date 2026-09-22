import { DOMTokenList } from "../../../impl/DOMTokenList";

export function getClassList(e) {
	if('classList' in e) {
		return e.classList;
	}
	return new DOMTokenList(e);
}