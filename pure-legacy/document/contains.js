import { contains$all } from "../../impl/document/contains$all";
import { contains$cmp } from "../../impl/document/contains$cmp";

export default document.contains ? document : {
	contains: document.all ? contains$all : contains$cmp
};
