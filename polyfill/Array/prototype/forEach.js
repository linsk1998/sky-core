import { forEach } from "../../../impl/Array/prototype/forEach";
if(!Array.prototype.forEach) {
	Array.prototype.forEach = forEach;
}