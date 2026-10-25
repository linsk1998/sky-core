import { Array } from "../../native/Array";
import { Symbol } from "../../native/Symbol";
import { checkArraySupportConstructorIteratorReturn } from "../../impl/Array/checkArraySupportConstructorIteratorReturn";
import { from } from "../../impl/Array/from";

if(!(Array.from && Symbol && checkArraySupportConstructorIteratorReturn())) {
	Array.from = from;
}
