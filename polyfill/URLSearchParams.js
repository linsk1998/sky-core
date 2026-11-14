import { URLSearchParams } from "../native/URLSearchParams";
import { URLSearchParams as impl_URLSearchParams } from "../impl/URL/URLSearchParams";
if(!URLSearchParams) {
	window.URLSearchParams = impl_URLSearchParams;
}