
var div=document.createElement('div');
export function unescape(html){
	div.innerHTML=html;
	return div.textContent || div.innerText;
};