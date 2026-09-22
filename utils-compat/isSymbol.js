import { Symbol } from "../impl-compat/Symbol";

export function isSymbol(obj) {
	return typeof obj === "object" && obj instanceof Symbol;
};