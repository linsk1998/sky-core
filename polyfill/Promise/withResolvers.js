import Promise from "sky-core/pure/Promise";
import { withResolvers } from "../../impl/Promise/withResolvers";

if(!Promise.withResolvers) {
	Promise.withResolvers = withResolvers;
}