import { Promise } from "../Promise";
import { withResolvers } from "../../impl/Promise/withResolvers";

if(!Promise.withResolvers) {
	Promise.withResolvers = withResolvers;
}