import { Object } from "../../native/Object";
import { groupBy } from "../../impl/object/groupBy";

if(!Object.groupBy) {
	Object.groupBy = groupBy;
}