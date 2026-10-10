import { Error } from "../../native/Error";
import { isError } from "../../impl/Error/isError";

if(!Error.isError) {
	Error.isError = isError;
}
