import { withResolvers } from "../../impl/Promise/withResolvers";

var Promise = globalThis.Promise;
if(!Promise.withResolvers) {
	Promise.withResolvers = withResolvers;
}