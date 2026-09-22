import { isNode as compat_isNode } from "../utils-compat/isNode";
import { isNode as modern_isNode } from "../utils-modern/isNode";

export var isNode = window.Node ? modern_isNode : compat_isNode;