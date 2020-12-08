import { getCurrentScript } from "./getCurrentScript";
import { getStackSupport, getCurrentPathByStack } from "../impl-modern/document/currentScript";

export var getCurrentPath = ('currentScript' in document || !getStackSupport()) ? function() {
	var url = new URL(getCurrentScript().src, location);
	try {
		return url.href;
	} finally {
		url = null;
	}
} : getCurrentPathByStack;

