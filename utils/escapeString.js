import { JSON } from "../native/JSON";
import { escapeString as compat_escapeString } from "../impl/JSON/stringify";

export var escapeString = JSON ? JSON.stringify : compat_escapeString;