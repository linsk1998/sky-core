import { contains$all } from "../../impl/document/contains$all";
define(function() {
	return document.contains ? document : {
		contains: contains$all
	};
});
