import { Object } from "../../native/Object";
import { is } from "../../impl/object/is";

if(!Object.is) {
	Object.is = is;
}
