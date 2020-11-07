import {detachEvent as compat_detachEvent} from "../utils-compat/detachEvent";
import {detachEvent as modern_detachEvent} from "../utils-modern/detachEvent";

export var detachEvent=document.addEventListener?modern_detachEvent:compat_detachEvent;