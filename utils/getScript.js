import { getScript as compat_getScript } from "../utils-compat/getScript";
import { getScript as modern_getScript } from "../utils-modern/getScript";

export var getScript = window.addEventListener ? modern_getScript : compat_getScript;