import { forOwn as compat_forOwn } from "../utils-compat/forOwn";
import { forOwn as modern_forOwn } from "../utils-modern/forOwn";
import { hasEnumBug } from "./hasEnumBug";

export var forOwn = hasEnumBug ? compat_forOwn : modern_forOwn;