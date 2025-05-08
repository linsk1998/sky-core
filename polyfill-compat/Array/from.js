import { from } from "../../impl-compat/Array/from";

if(!Array.from) {
	Array.from = from;
}