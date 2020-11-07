import SearchParams from "../impl/SearchParams";
if(!-[1,]){
	var VBURLDescs={
		host:{
			enumerable:true,
			get:function(){
				if(this.port){
					return this.hostname+":"+this.port;
				}
				return this.hostname;
			},
			set:function(value){
				var pattern=/(.*):(\d+)$/;
				var arr=value.match(pattern);
				this.port="";
				if(arr){
					this.hostname=arr[1];
					this.port=arr[2];
				}else{
					this.hostname=value;
				}
			}
		},
		origin:{
			enumerable:true,
			get:function(){
				return this.protocol+"//"+this.host;
			}
		},
		href:{
			enumerable:true,
			get:function(){
				var user=this.username;
				if(user){
					if(this.password){
						user+=":"+this.password;
					}
					user+="@";
				}
				return this.protocol+"//"+user+this.host+this.pathname+this.search+this.hash;
			},
			set:function(value){
				var url=new URL(value);
				this.protocol=url.protocol;
				this.hostname=url.hostname;
				this.pathname=url.pathname;
				this.port=url.port;
				this.search=url.search;
				this.hash=url.hash;
				this.username=url.username;
				this.password=url.password;
				url=null;
			}
		}
	};
	window.URL=function(relativePath, absolutePath){
		var path,arr;
		this.port=this.search=this.hash=this.username=this.password="";
		this.searchParams=new SearchParams(this);
		var pattern=/^[a-zA-Z]+:/;
		if(arr=relativePath.match(pattern)){
			this.protocol=arr[0];
			path=relativePath.replace(pattern,"");
			pattern=/^[\/]*([^\/]+)/;
			var host=path.match(pattern)[1];
			path=path.replace(pattern,"");
			arr=host.split("@");
			if(arr.length>1){
				this.host=arr[1];
				arr=arr[0].split(":");
				if(arr.length>1){
					this.username=arr[0];
					this.password=arr[1];
				}else{
					this.username=arr[0];
				}
			}else{
				this.host=host;
			}
		}else if(absolutePath){
			var absInfo=absolutePath.indexOf?new URL(absolutePath):absolutePath;
			this.protocol=absInfo.protocol;
			this.hostname=absInfo.hostname;
			this.port=absInfo.port;
			if(absInfo.username) this.username=absInfo.username;
			if(absInfo.password) this.password=absInfo.password;
			this.pathname=absInfo.pathname;
			if(relativePath.startsWith("#")){
				this.search=absInfo.search;
				this.hash=relativePath;
				return VBUrlFactory(this);
			}else if(relativePath.startsWith("?")){
				var a=relativePath.indexOf("#");
				if(a<0){
					this.search=relativePath;
					this.hash="";
				}else{
					this.search=relativePath.substr(0,a);
					this.hash=relativePath.substring(a,relativePath.length);
				}
				return VBUrlFactory(this);
			}else if(relativePath.startsWith("/")){
				path=relativePath;
			}else if(relativePath.startsWith("../")){
				path=absInfo.pathname.replace(/\/[^\/]*$/,"/")+relativePath;
				pattern=/[^\/]+\/\.\.\//;
				while(pattern.test(path)){
					path=path.replace(pattern,"");
				}
				path=path.replace(/^(\/\.\.)+/,"");
			}else{
				path=absInfo.pathname.replace(/[^\/]*$/,"")+relativePath.replace(/^\.\//,"");
			}
			absInfo=null;
		}else{
			throw new Error("SYNTAX_ERROR");
		}
		pattern=/^[^#]*/;
		this.hash=path.replace(pattern,"");
		arr=path.match(pattern);
		path=arr[0];
		pattern=/^[^\?]*/;
		this.search=path.replace(pattern,"");
		arr=path.match(pattern);
		this.pathname=arr[0];
		return VBUrlFactory(this);
	}
	try{
		window.execScript("var VBURLDescs;","JScript");
		window.execScript([
			'Class VBURL',
			'	Public [constructor]',
			'	Public [protocol]',
			'	Public [hostname]',
			'	Public [pathname]',
			'	Public [port]',
			'	Public [search]',
			'	Public [searchParams]',
			'	Public [hash]',
			'	Public [username]',
			'	Public [password]',
			'	Public Property Let [host](var)',
			'		Call VBURLDescs.host.set.call(Me,var)',
			'	End Property',
			'	Public Property Get [host]',
			'		[host]=VBURLDescs.host.get.call(Me)',
			'	End Property',
			'	Public Property Get [origin]',
			'		[origin]=VBURLDescs.origin.get.call(Me)',
			'	End Property',
			'	Public Property Let [href](var)',
			'		Call VBURLDescs.href.set.call(Me,var)',
			'	End Property',
			'	Public Property Get [href]',
			'		[href]=VBURLDescs.href.get.call(Me)',
			'	End Property',
			'End Class',
			'Function VBUrlFactory(url)',
			'	Dim o',
			'	Set o = New VBURL',
			'	Call Object.assign(o,url)',
			'	Set o.searchParams.url = o',
			'	Set o.constructor = URL',
			'	Set VBUrlFactory = o',
			'End Function'
		].join('\n'), 'VBScript');
		window.VBURLDescs=VBURLDescs;
	}catch(e){
		window.VBUrlFactory=function(url){
			if(url.host){
				VBURLDescs.host.set.call(url,url.host);
			}else{
				url.host=VBURLDescs.host.get.call(url);
			}
			url.href=VBURLDescs.href.get.call(url);
			url.origin=VBURLDescs.origin.get.call(url);
			return url;
		};
	}
}