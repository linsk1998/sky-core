(function () {
	'use strict';

	function definePrototype(target, property, value) {
	  var prototype = target.prototype;
	  if (!(property in prototype)) prototype[property] = value;
	}

	var Element = window.Element;

	var slice = Array.prototype.slice;

	function isNotNullObject(obj) {
	  return typeof obj === "object" ? obj !== null : typeof obj === "function";
	}

	var notCapture = ["load", "unload", "scroll", "resize", "blur", "focus", "mouseenter", "mouseleave", "input", "propertychange"];

	function attachEvent(ele, type, func) {
	  switch (type) {
	    case "load":
	      if (ele.tagName === "SCRIPT") {
	        type = 'readystatechange';
	      }
	      break;
	    case "wheel":
	      type = 'mousewheel';
	      break;
	    case "DOMContentLoaded":
	      if (ele === document) {
	        type = 'readystatechange';
	        if (window === window.top) {
	          checkDomReady();
	        }
	      }
	      break;
	    case "input":
	      type = 'propertychange';
	      break;
	    case "mouseenter":
	      if (!Element) {
	        //IE低版本监视是否短时间内突然移出再进入
	        ele.attachEvent('onmouseleave', func);
	      }
	      break;
	  }
	  ele.attachEvent('on' + type, func);
	}
	function checkDomReady() {
	  try {
	    document.documentElement.doScroll('left');
	    document.readyState = "complete";
	    ele.fireEvent("onreadystatechange");
	  } catch (e) {
	    setTimeout(arguments.callee, 0);
	  }
	}

	function fixEvent(ele, type, e) {
	  e = event;
	  var target = e.target = e.srcElement;
	  e.stopImmediatePropagation = stopImmediatePropagation;
	  e.stopPropagation = stopPropagation;
	  e.preventDefault = preventDefault;
	  e.currentTarget = ele;
	  if (e.isTrusted !== false) e.isTrusted = true;
	  switch (type) {
	    case 'load':
	      if (target.tagName === 'SCRIPT') {
	        if (target.readyState === 'complete' || e.polyfill) {
	          return e;
	        }
	      }
	      break;
	    case "DOMContentLoaded":
	      if (ele === document) {
	        if (document.readyState === "complete" || e.polyfill) {
	          return e;
	        }
	      }
	      break;
	    case 'input':
	      if (e.propertyName === 'value') {
	        if (!target.disabled && !target.readOnly || e.polyfill) {
	          return e;
	        }
	      }
	      break;
	    case 'mouseenter':
	      if (type === e.type) {
	        if (e.polyfill) {
	          return e;
	        }
	        e.relatedTarget = e.fromElement;
	        if (!Element) {
	          //IE低版本需要判断是否短时间内突然移出再进入
	          if (Date.now() - 150 < target.lastMouseLeave) {
	            //间隔时间过短，排除
	            break;
	          }
	        }
	        return e;
	      } else {
	        //mouseleave
	        target.lastMouseLeave = Date.now();
	        break;
	      }
	    case 'mouseleave':
	      if (e.polyfill) {
	        return e;
	      }
	      if (Element) {
	        e.relatedTarget = e.toElement;
	        return e;
	      }
	      //IE低版本需要延迟运行
	      triggerMouseLeave(target, e);
	      break;
	    default:
	      if (!e.polyfill) return e;
	  }
	  throw new Error();
	}
	function stopImmediatePropagation() {
	  this._pis = true; // propagationImmediateStopped
	  this.cancelBubble = true;
	}
	function stopPropagation() {
	  this.cancelBubble = true;
	}
	function preventDefault() {
	  if (this.cancelable !== false) {
	    this.defaultPrevented = true;
	    this.returnValue = false;
	  }
	}
	function triggerMouseLeave(ele, e) {
	  var event = document.createEventObject();
	  event.polyfill = true;
	  event.type = e.type;
	  event.relatedTarget = e.toElement;
	  event.currentTarget = e.currentTarget;
	  event.target = e.target;
	  event.clientX = e.clientX;
	  event.clientY = e.clientY;
	  event.offsetX = e.offsetX;
	  event.offsetY = e.offsetY;
	  event.x = e.x;
	  event.y = e.y;
	  event.stopPropagation = stopPropagation;
	  event.preventDefault = preventDefault;
	  var t = setTimeout(function () {
	    ele.fireEvent("onmouseleave", event);
	    ele.detachEvent('onmouseenter', onenter);
	    ele.lastMouseLeave = 0;
	  }, 50);
	  var onenter = function () {
	    clearTimeout(t);
	  };
	  ele.attachEvent('onmouseenter', onenter);
	}

	function indexOf(e) {
	  var fromIndex = 0;
	  if (arguments.length > 1) {
	    fromIndex = 0 + arguments[1];
	    if (fromIndex < 0) {
	      fromIndex += this.length;
	      if (fromIndex < 0) {
	        fromIndex = 0;
	      }
	    }
	  }
	  for (var i = fromIndex; i < this.length; i++) {
	    if (i in this && this[i] === e) {
	      return i;
	    }
	  }
	  return -1;
	}

	definePrototype(Array, 'indexOf', indexOf);

	function addEvent(el, type, cb, options) {
	  var bubble;
	  if (isNotNullObject(options)) {
	    bubble = !options.capture;
	  } else {
	    bubble = !options;
	  }
	  var listeners = el.__listeners;
	  var i, listener;
	  if (listeners) {
	    i = listeners.length;
	    while (i--) {
	      listener = listeners[i];
	      if (listener[1] === type && listener[2] === cb && listener[3] === bubble) {
	        return;
	      }
	    }
	  } else {
	    listeners = el.__listeners = [];
	  }
	  function func(e) {
	    e = e || event;
	    if (e.eventPhase) return;
	    e.timeStamp = Date.now();
	    e.bubbles = notCapture.indexOf(type) < 0;
	    try {
	      e = fixEvent(el, type, e);
	    } catch (err) {
	      return;
	    }
	    e.eventPhase = 1;
	    var paths = [];
	    var node = e.target;
	    do {
	      paths.push(node);
	      node = node.parentNode;
	    } while (node);
	    var i, j, ilen, jlen;
	    var listeners, listener;
	    i = paths.length;
	    while (i--) {
	      if (i === 0) {
	        e.eventPhase = 2;
	      }
	      node = paths[i];
	      e.currentTarget = node;
	      listeners = node.__listeners;
	      if (listeners) {
	        jlen = listeners.length;
	        for (j = 0; j < jlen; j++) {
	          listener = listeners[j];
	          if (listener[1] === type && !listener[3]) {
	            listener[2].call(node, e);
	          }
	          if (e._pis) {
	            break;
	          }
	        }
	        if (e.cancelBubble) {
	          break;
	        }
	      }
	    }
	    ilen = paths.length;
	    for (i = 0; i < ilen; i++) {
	      if (i !== 0) {
	        e.eventPhase = 3;
	      }
	      node = paths[i];
	      e.currentTarget = node;
	      listeners = node.__listeners;
	      if (listeners) {
	        jlen = listeners.length;
	        for (j = 0; j < jlen; j++) {
	          listener = listeners[j];
	          if (listener[1] === type && listener[3]) {
	            listener[2].call(node, e);
	          }
	          if (e._pis) {
	            break;
	          }
	        }
	        if (e.cancelBubble) {
	          break;
	        }
	      }
	    }
	  }
	  listeners.push([func, type, cb, bubble]);
	  attachEvent(el, type, func);
	}

	if (Element) {
	  definePrototype(Element, 'addEventListener', function () {
	    var args = slice.call(arguments);
	    args.unshift(this);
	    addEvent.apply(this, args);
	  });
	}

	function detachEvent(ele, type, func) {
	  switch (type) {
	    case "load":
	      if (ele.tagName == "SCRIPT") {
	        type = 'readystatechange';
	      }
	      break;
	    case "wheel":
	      type = 'mousewheel';
	      break;
	    case "DOMContentLoaded":
	      if (ele === document) {
	        type = 'readystatechange';
	      }
	      break;
	    case "input":
	      type = 'propertychange';
	      break;
	    case "mouseenter":
	      if (!Element) {
	        //IE低版本监视是否短时间内突然移出再进入
	        ele.detachEvent('onmouseleave', func);
	      }
	      break;
	  }
	  ele.detachEvent('on' + type, func);
	}

	function removeEvent(el, ev, cb, options) {
	  var bubble;
	  if (isNotNullObject(options)) {
	    bubble = !options.capture;
	  } else {
	    bubble = !options;
	  }
	  var listeners = el.__listeners;
	  var i, listener;
	  if (listeners) {
	    i = listeners.length;
	    while (i--) {
	      listener = listeners[i];
	      if (listener[1] === ev && listener[2] === cb && listener[3] === bubble) {
	        detachEvent(el, ev, listener[0]);
	        listeners.splice(i, 1);
	      }
	    }
	  }
	}

	if (Element) {
	  definePrototype(Element, 'removeEventListener', function () {
	    var args = slice.call(arguments);
	    args.unshift(this);
	    removeEvent.apply(this, args);
	  });
	}

	function dispatchEvent(ele, e) {
	  var type = e.type;
	  switch (type) {
	    case 'load':
	      if (ele.tagName == "SCRIPT") {
	        e.polyfill = true;
	        ele.fireEvent("onreadystatechange", e);
	        return;
	      }
	      break;
	    case 'wheel':
	      type = 'mousewheel';
	      break;
	    case "DOMContentLoaded":
	      if (ele === document) {
	        e.polyfill = true;
	        ele.fireEvent("onreadystatechange", e);
	        return;
	      }
	      break;
	    case 'input':
	      e.propertyName = 'value';
	      e.polyfill = true;
	      ele.fireEvent("onpropertychange", e);
	      return;
	  }
	  ele.fireEvent("on" + type, e);
	}

	if (Element) {
	  definePrototype(Element, 'dispatchEvent', function () {
	    var args = slice.call(arguments);
	    args.unshift(this);
	    dispatchEvent.apply(this, args);
	  });
	}

	function isFunction(obj) {
	  return typeof obj === 'function';
	}

	var Event = window.Event;

	// IE 有个全局对象 Event
	if (!isFunction(Event)) {
	  if (document.createEventObject) {
	    window.Event = function (type, init) {
	      var e = document.createEventObject();
	      e.type = type;
	      e.isTrusted = false;
	      if (init) {
	        e.bubbles = init.bubbles;
	        e.cancelable = init.cancelable;
	      } else {
	        e.bubbles = false;
	        e.cancelable = false;
	      }
	      return e;
	    };
	  }
	}

	function getElementText(el) {
	  var anyString = '';
	  var childS = el.childNodes;
	  for (var i = 0; i < childS.length; i++) {
	    var node = childS[i];
	    if (node.nodeType == 1) {
	      anyString += node.innerText;
	    } else if (node.nodeType == 3) {
	      anyString += node.nodeValue;
	    }
	  }
	  return anyString;
	}

	var k = 'textContent';
	if (Element) {
	  if (!(k in Element.prototype)) {
	    Object.defineProperty(Element.prototype, k, {
	      get: function () {
	        return getElementText(this);
	      },
	      set: function (v) {
	        this.innerText = v;
	      },
	      configurable: true,
	      enumerable: false
	    });
	  }
	}

})();
