import {fixEvent as compat_fixEvent} from "../utils-compat/fixEvent";
import {fixEvent as modern_fixEvent} from "../utils-modern/fixEvent";

export var fixEvent=document.addEventListener?modern_fixEvent:compat_fixEvent;