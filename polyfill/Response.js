import { fetch as native_fetch } from "../native/fetch";
import { AbortController as native_AbortController } from "../native/AbortController";
import { Response } from "../impl/Response";
import { bytes } from "../impl/Body/prototype/bytes";
import { formData } from "../impl/Body/prototype/formData";
import { definePrototype } from "sky-core/utils/definePrototype";


if(!native_fetch) {
	window.Response = Response;
} else if(!native_AbortController) {
	window.Response = Response;
} else {
	definePrototype(window.Response, 'formData', formData);
	definePrototype(window.Response, 'bytes', bytes);
}