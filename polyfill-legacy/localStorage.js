import { Storage } from "../impl/storage/Storage";

if(!window.localStorage) {
	window.localStorage = new Storage();
}