var htmlEscapes={
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;',
	'`': '&#96;'
};
export function escape(text){
	return text.replace(/[&<>"'`]/g,function(i){
		return htmlEscapes[i];
	});
};