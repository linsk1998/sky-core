import { String } from "../../native/String";
import { raw } from "../../impl/String/raw";

if(!String.raw) {
	String.raw = raw;
}