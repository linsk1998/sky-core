import "../polyfill/document/scripts";
import { getScript as compat_getScript } from "../utils-compat/getScript";
import { getScript as modern_getScript } from "../utils-modern/getScript";

export var getScript = ("onload" in document.scripts[document.scripts.length - 1]) ? modern_getScript : compat_getScript;