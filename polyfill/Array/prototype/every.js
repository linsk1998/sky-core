import { every } from "../../../impl/Array/prototype/every";
if(!Array.prototype.every) {
	Array.prototype.every = every;
}