import { Object } from "../../native/Object";
import { seal } from "../../impl/object/restrict/seal";

if(!Object.seal) {
	Object.seal = seal;
}