import { Blob } from "../native/Blob";
import { File } from "../native/File";
import { File$class } from "../impl/File$class";
import { fixFormData } from "../impl/FormData";

if(Blob) {
	try {
		new File([], "");
	} catch(e) {
		window.File = File$class;
		fixFormData();
	}
}
