var MockXHR = {
	respondWith: function(status, responseText, headers) {
		var xhr = MockXHR.lastInstance;
		if(!xhr) throw new Error('No XHR created');
		xhr.status = status || 200;
		xhr.responseText = responseText || '';
		if(headers) {
			xhr.responseHeaders = headers;
		}
	}
};
// 模拟 XHR 的构造函数
function XMLHttpRequest() {
	this.method = null;
	this.url = null;
	this.requestHeaders = {};
	this.responseHeaders = {};
	this.requestBody = null;
	this.status = 200;
	this.responseText = '';
	this.readyState = 0;
	MockXHR.lastInstance = this;
}

XMLHttpRequest.prototype.open = function(method, url, async) {
	this.method = method;
	this.url = url;
	this.async = async !== false;
	this.readyState = 1;
};

XMLHttpRequest.prototype.setRequestHeader = function(name, value) {
	this.requestHeaders[name] = value;
};

XMLHttpRequest.prototype.getResponseHeader = function(name) {
	for(var key in this.responseHeaders) {
		if(key.toLowerCase() === name.toLowerCase()) {
			return this.responseHeaders[key];
		}
	}
	return null;
};
XMLHttpRequest.prototype.getAllResponseHeaders = function() {
	var s = '';
	for(var key in this.responseHeaders) {
		if(key.toLowerCase() !== 'set-cookie') {
			s += key + ": " + this.responseHeaders[key] + "\r\n";
		}
	}
	return s;
};

XMLHttpRequest.prototype.send = function(body) {
	this.requestBody = body;
	this.readyState = 2;
	var self = this;
	this._timer = setTimeout(function() {
		self.readyState = 4;
		if(self.onload) self.onload();
		if(self.onreadystatechange) self.onreadystatechange();
		self._timer = null;  // 清除引用
	}, 100);
};

XMLHttpRequest.prototype.abort = function() {
	// 清除定时器，避免后续 onload 执行
	if(this._timer) {
		clearTimeout(this._timer);
		this._timer = null;
	}

	// 如果请求尚未完成，更新状态并触发事件
	if(this.readyState !== 4) {
		this.readyState = 0;  // UNSENT
		if(this.onabort) {
			this.onabort();
		}
		if(this.onreadystatechange) {
			this.onreadystatechange();
		}
	}
	// 根据规范，readyState 为 4 时调用 abort 不应产生任何效果
};