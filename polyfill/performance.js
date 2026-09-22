import { performance } from "../native/performance";
if(!performance) {
	performance = window.performance = {};
}
export { performance };