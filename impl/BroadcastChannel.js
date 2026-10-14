// BroadcastChannel 无法真正实现：它需要跨上下文（标签页/iframe/Worker）
// 广播消息，纯 JS 无法访问其它上下文。此实现只在同一个全局内广播，
// 即同一个页面/Worker 中订阅同名频道的 BroadcastChannel 实例之间互通。
// 跨上下文需要借助 localStorage 事件、SharedWorker 等共享介质。
var channels = {};

function createMessageEvent(target, data) {
	return {
		type: "message",
		target: target,
		currentTarget: target,
		data: data,
		origin: "",
		lastEventId: "",
		source: null,
		ports: [],
		isTrusted: false,
		timeStamp: Date.now()
	};
}

function BroadcastChannel(name) {
	if(!(this instanceof BroadcastChannel)) {
		throw new TypeError("Failed to construct 'BroadcastChannel': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
	}
	if(arguments.length < 1) {
		throw new TypeError("Failed to construct 'BroadcastChannel': 1 argument required, but only 0 present.");
	}
	name = String(name);
	this.name = name;
	this.onmessage = null;
	this.onmessageerror = null;
	this._listeners = {};
	this._closed = false;
	if(!channels[name]) {
		channels[name] = [];
	}
	channels[name].push(this);
}

var proto = BroadcastChannel.prototype;

proto.postMessage = function(data) {
	if(this._closed) {
		throw new Error("Failed to execute 'postMessage' on 'BroadcastChannel': Channel is closed.");
	}
	var name = this.name;
	var source = this;
	setTimeout(function() {
		var list = channels[name];
		if(!list) {
			return;
		}
		// 快照，避免广播过程中频道被增删
		list = list.slice();
		for(var i = 0; i < list.length; i++) {
			var target = list[i];
			// 不回发给发送者自己，也不发给已关闭的频道
			if(target === source || target._closed) {
				continue;
			}
			target.dispatchEvent(createMessageEvent(target, data));
		}
	}, 0);
};

proto.close = function() {
	if(this._closed) {
		return;
	}
	this._closed = true;
	var list = channels[this.name];
	if(list) {
		var i = list.length;
		while(i--) {
			if(list[i] === this) {
				list.splice(i, 1);
			}
		}
	}
	this.name = "";
	this.onmessage = null;
	this.onmessageerror = null;
	this._listeners = {};
};

proto.addEventListener = function(type, listenerObject) {
	if(!type || listenerObject == null) {
		return;
	}
	if(!this._listeners[type]) {
		this._listeners[type] = [];
	}
	this._listeners[type].push(listenerObject);
};

proto.removeEventListener = function(type, listenerObject) {
	var listeners = this._listeners[type];
	if(!listeners) {
		return;
	}
	var i = listeners.length;
	while(i--) {
		if(listeners[i] === listenerObject) {
			listeners.splice(i, 1);
		}
	}
};

proto.dispatchEvent = function(event) {
	if(!event || typeof event.type !== "string") {
		throw new TypeError("Failed to execute 'dispatchEvent' on 'EventTarget': parameter 1 is not of type 'Event'.");
	}
	event.target = event.target || this;
	event.currentTarget = this;
	var notCanceled = true;
	var handler = this["on" + event.type];
	if(typeof handler === "function") {
		handler.call(this, event);
	}
	var listeners = this._listeners[event.type];
	if(listeners) {
		listeners = listeners.slice();
		for(var i = 0; i < listeners.length; i++) {
			var listener = listeners[i];
			if(typeof listener === "function") {
				listener.call(this, event);
			} else if(listener && typeof listener.handleEvent === "function") {
				listener.handleEvent(event);
			}
		}
	}
	return notCanceled;
};

export { BroadcastChannel };
