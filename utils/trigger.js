
import {trigger as compat_trigger} from "../utils-compat/trigger";
import {trigger as modern_trigger} from "../utils-modern/trigger";

export var trigger=document.addEventListener?modern_trigger:compat_trigger;