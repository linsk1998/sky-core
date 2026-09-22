import { quirks } from "../../support/quirks";

var k = 'scrollingElement';
if(!(k in document)) {
	document[k] = quirks ? document.body : document.documentElement;
}