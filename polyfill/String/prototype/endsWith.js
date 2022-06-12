import { endsWith } from "../../../impl/String/prototype/endsWith";
if(!String.prototype.endsWith) {
	String.prototype.endsWith = endsWith;
}