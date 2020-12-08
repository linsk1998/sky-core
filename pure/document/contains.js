import { contains as compat_contains } from "../../impl-compat/document/contains";
import { contains as modern_contains } from "../../impl-modern/document/contains";

module.exports = document.contains ? document : {
	contains: document.all ? compat_contains : modern_contains
};