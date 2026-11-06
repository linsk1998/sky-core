import { contains } from "../../impl/document/contains";
import { contains$cmp } from "../../impl/document/contains$cmp";

export default document.contains ? document : {
	contains: document.all ? contains : contains$cmp
};
