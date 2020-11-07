export function getCurrentScript(){
	var nodes=document.getElementsByTagName('SCRIPT');
	var i=nodes.length;
	while(i--){
		var node=nodes[i];
		if(node.readyState==="interactive"){
			return node;
		}
	}
	return null;
};