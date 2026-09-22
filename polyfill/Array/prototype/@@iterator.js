import iterator from "sky-core/pure/Symbol/iterator";
import { values } from "../../../impl/Array/prototype/values";

if(!Array.prototype[iterator]) {
	Array.prototype[iterator] = values;
}