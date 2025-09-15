import { Blob } from "./Blob";
import { File } from "../native/File";
import { createFileFactory } from "../impl/File";
import { fixFormData } from "../impl/FormData";

if(Blob) {
	try {
		new File([], "");
	} catch(e) {
		window.File = createFileFactory()(Blob);
		fixFormData();
	}
}
