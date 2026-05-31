import { Storage } from "../impl/storage/Storage";

if(!window.sessionStorage) {
	window.sessionStorage = new Storage();
}