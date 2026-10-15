import { contains$cmp } from "../../impl/document/contains$cmp";

export default document.contains ? document : {
	contains: contains$cmp
};
