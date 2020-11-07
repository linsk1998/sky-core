import {attachEvent as compat_attachEvent} from "../utils-compat/attachEvent";
import {attachEvent as modern_attachEvent} from "../utils-modern/attachEvent";

export var attachEvent=document.addEventListener?modern_attachEvent:compat_attachEvent;