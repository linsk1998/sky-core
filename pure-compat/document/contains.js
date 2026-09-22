import { contains } from "../../impl-compat/document/contains";
define(function() {
	return document.contains ? document : {
		contains: contains
	};
});