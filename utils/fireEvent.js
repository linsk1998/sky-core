
import {fireEvent as compat_fireEvent} from "../utils-compat/fireEvent";
import {fireEvent as modern_fireEvent} from "../utils-modern/fireEvent";

export var fireEvent=document.addEventListener?modern_fireEvent:compat_fireEvent;