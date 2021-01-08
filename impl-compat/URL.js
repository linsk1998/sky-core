
import { URL as modern_URL, URLProperties } from "../impl-modern/URL";
export function initURL() {
	try {
		window.execScript("var VBURLProperties;", "JScript");
		window.execScript([
			//'Dim VBURLProperties',
			'Class VBURL',
			'	Public [constructor]',
			'	Public [protocol]',
			'	Public [hostname]',
			'	Public [port]',
			'	Public [pathname]',
			'	Public [search]',
			'	Public [searchParams]',
			'	Public [hash]',
			'	Public [username]',
			'	Public [password]',
			'	Public Property Let [host](var)',
			'		Call VBURLProperties.host.set.call(Me,var)',
			'	End Property',
			'	Public Property Get [host]',
			'		[host]=VBURLProperties.host.get.call(Me)',
			'	End Property',
			'	Public Property Get [origin]',
			'		[origin]=VBURLProperties.origin.get.call(Me)',
			'	End Property',
			'	Public Property Let [href](var)',
			'		Call VBURLProperties.href.set.call(Me,var)',
			'	End Property',
			'	Public Property Get [href]',
			'		[href]=VBURLProperties.href.get.call(Me)',
			'	End Property',
			'End Class',
			'Function VBUrlFactory(url)',
			'	Set VBUrlFactory = New VBURL',
			'End Function'
		].join('\n'), 'VBScript');
		window.VBURLProperties = URLProperties;
	} catch(e) {
		window.VBUrlFactory = function(url) {
			if(url.host) {
				URLProperties.host.set.call(url, url.host);
			} else {
				url.host = URLProperties.host.get.call(url);
			}
			url.href = URLProperties.href.get.call(url);
			url.origin = URLProperties.origin.get.call(url);
			return url;
		};
	}
}
export function URL(relativePath, absolutePath) {
	var url = new modern_URL(relativePath, absolutePath);
	var o = VBUrlFactory(url);
	if(url.host) {
		o.host = url.host;
	} else {
		o.hostname = url.hostname;
		o.port = url.port;
	}
	o.protocol = url.protocol;
	o.pathname = url.pathname;
	o.search = url.search;
	o.hash = url.hash;
	o.username = url.username;
	o.password = url.password;
	o.searchParams = url.searchParams;
	o.searchParams.url = o;
	o.constructor = URL;
	return o;
}