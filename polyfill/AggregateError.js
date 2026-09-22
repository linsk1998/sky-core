import { AggregateError } from "../impl/AggregateError";
import "sky-core/polyfill/Error";

if(!window.AggregateError) {
	window.AggregateError = AggregateError;
}