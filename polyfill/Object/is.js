import { Object } from "../../native/Object";
import { is } from "../../impl/Object/is";
if(!Object.is) {
	Object.is = is;
}