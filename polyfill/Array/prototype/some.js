import { some } from "../../../impl/Array/prototype/some";
if(!Array.prototype.some) {
	Array.prototype.some = some;
}