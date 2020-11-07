import {escapeRegExp} from "./escapeRegExp";
export function replaceAll(str, reallyDo, replaceWith, ignoreCase) {
	return str.replace(new RegExp(escapeRegExp(reallyDo), (ignoreCase ? "gi": "g")), replaceWith);
};