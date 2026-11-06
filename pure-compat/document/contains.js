import { contains } from "../../impl/document/contains";
define(function() {
	return document.contains ? document : {
		contains: contains
	};
});
