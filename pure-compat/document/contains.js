import { contains as compat_contains } from "../../impl-compat/document/contains";

module.exports = document.contains ? document : {
	contains: compat_contains
};