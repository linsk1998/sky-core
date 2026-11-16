import { Symbol } from "../impl/Symbol/Symbol";

export function isSymbol(obj) {
	return typeof obj === "object" && obj instanceof Symbol;
};