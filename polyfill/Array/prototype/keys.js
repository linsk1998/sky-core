import { keys } from "../../../impl/Array/prototype/keys";
if(!Array.prototype.keys) {
	Array.prototype.keys = keys;
}