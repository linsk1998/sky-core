import { Array } from "../../native/Array";
import { Symbol } from "../../native/Symbol";
import { checkArraySupportConstructorIteratorReturn } from "../../impl/Array/from";
import { from } from "../../impl-compat/Array/from";

if(!(Array.from && Symbol && checkArraySupportConstructorIteratorReturn())) {
	Array.from = from;
}