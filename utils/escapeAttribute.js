import {escapeHtml} from "./escapeHtml"
export function escapeAttribute(str,quot){
	var esc=escapeHtml(str);
	if(!quot || quot=='"'){
		return esc.replace(/"/g,'&quot;');
	}else{
		return esc.replaceAll(quot.charAt(0),'&#'+quot.charCodeAt(0)+";");
	}
};