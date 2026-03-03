import { fetch as native_fetch } from "../native/fetch";
import { AbortController as native_AbortController } from "../native/AbortController";
import { Request } from "../impl/Request";
import { formData } from "../impl/Body/prototype/formData";
import { bytes } from "../impl/Body/prototype/bytes";
import { definePrototype } from "sky-core/utils/definePrototype";


if(!native_fetch) {
	window.Request = Request;
} else if(!native_AbortController) {
	window.Request = Request;
} else {
	definePrototype(window.Request, 'formData', formData);
	definePrototype(window.Request, 'bytes', bytes);
}