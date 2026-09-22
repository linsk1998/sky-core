import { Blob } from "../native/Blob";
import { File } from "../native/File";
import { File as BlobFIle } from "../impl-es2015/File";
import { fixFormData } from "../impl/FormData";

if(Blob) {
	try {
		new File([], "");
	} catch(e) {
		window.File = BlobFIle;
		fixFormData();
	}
}
