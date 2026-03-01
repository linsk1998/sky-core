import { fetch as native_fetch } from "../native/fetch";
import { AbortController as native_AbortController } from "../native/AbortController";
import { Headers } from "../impl/Headers";

if(!native_fetch) {
	window.Headers = Headers;
} else if(!native_AbortController) {
	window.Headers = Headers;
}