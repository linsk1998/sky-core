import { anObject } from "sky-core";
import { aFunction } from "sky-core";
export function speciesConstructor(O, defaultConstructor) {
	var C = anObject(O).constructor;
	var S;
	return C === undefined || (S = anObject(C)[Symbol.species]) == undefined ? defaultConstructor : aFunction(S);
}