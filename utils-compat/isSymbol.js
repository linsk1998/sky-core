import { Symbol } from "../impl-compat/Symbol/constructor";

export function isSymbol(obj) {
	return typeof obj === "object" && obj instanceof Symbol;
};