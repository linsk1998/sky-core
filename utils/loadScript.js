
import { loadScript as compat_fireEvent } from "../utils-compat/loadScript";
import { loadScript as modern_fireEvent } from "../utils-es2015/loadScript";

export var loadScript = window.attachEvent ? compat_fireEvent : modern_fireEvent;