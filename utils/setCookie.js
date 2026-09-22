import { setCookie as setCookie$impl } from "../impl/cookie/setCookie";

export function setCookie(name, value) {
	setCookie$impl(name, encodeURIComponent(value), arguments[2]);
};
