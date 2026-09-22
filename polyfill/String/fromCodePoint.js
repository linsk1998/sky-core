import { String } from "../../native/String";
import { fromCodePoint } from "../../impl/String/fromCodePoint";

if(!String.fromCodePoint) {
	String.fromCodePoint = fromCodePoint;
}