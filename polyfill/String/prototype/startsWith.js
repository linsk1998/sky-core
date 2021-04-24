import { startsWith } from "../../../impl/String/prototype/startsWith";
if(!String.prototype.startsWith) {
	String.prototype.startsWith = startsWith;
}