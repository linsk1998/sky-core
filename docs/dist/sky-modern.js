var Sky = (function (exports) {
	exports=function Sky(){
		return Sky.overload(arguments,this);
	};

	if(typeof globalThis==="undefined"){
		this.globalThis=this;
	}

	if(!Number.isFinite){
		Number.isFinite=function(value){
			return typeof value === 'number' && isFinite(value);
		};
	}

	if(!Number.isNaN){
		Number.isNaN=function(value){
			return typeof value === "number" && isNaN(value);
		};
	}

	if(!Number.isInteger){
		Number.isInteger=function(value){
			return typeof value === "number" &&	isFinite(value) &&	Math.floor(value) === value;
		};
	}

	if(!('MAX_SAFE_INTEGER' in Number)){
		Number.MAX_SAFE_INTEGER=0x1FFFFFFFFFFFFF;
	}

	if(!('MIN_SAFE_INTEGER' in Number)){
		Number.MIN_SAFE_INTEGER=-0x1FFFFFFFFFFFFF;
	}

	if(!Number.isSafeInteger){
		Number.isSafeInteger=function(value){
			return Number.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;
		};
	}

	if(!Number.parseFloat) Number.parseFloat=parseFloat;

	if(!Number.parseInt) Number.parseInt=parseInt;

	if(!String.prototype.trim){
		String.prototype.trim=function trim(){
			return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,'');
		};
	}

	if(!String.prototype.trimStart){
		String.prototype.trimStart=function trimStart(){
			return this.replace(/^[\s\uFEFF\xA0]+/g,'');
		};
	}

	if(!String.prototype.trimEnd){
		String.prototype.trimEnd=function trimEnd(){
			return this.replace(/[\s\uFEFF\xA0]+$/g,'');
		};
	}

	if(!String.prototype.endsWith){
		String.prototype.endsWith=function endsWith(prefix,position){
			var length=prefix.length;
			position=position<length?position:this.length;
			return this.slice(position-length, position) === prefix;
		};
	}

	if(!String.prototype.startsWith){
		String.prototype.startsWith=function startsWith(prefix,position){
			if(prefix===null){ return false;}
			position=position?position:0;
			return this.slice(position, prefix.length) === prefix;
		};
	}

	if(!String.prototype.includes) {
		String.prototype.includes=function includes(search, start) {
			if(typeof start!=='number'){
				start=0;
			}
			if(start+search.length>this.length){
				return false;
			}else {
				return this.indexOf(search, start)!==-1;
			}
		};
	}

	if(!String.prototype.repeat){
		String.prototype.repeat=function repeat(count){
			if(count<0){
				throw 'RangeError repeat count must be non-negative';
			}
			if(count==Number.POSITIVE_INFINITY){
				throw 'RangeError repeat count must be less than infinity';
			}
			return new Array(count+1).join(this);
		};
	}

	if(!String.prototype.padStart){
		String.prototype.padStart=function padStart(targetLength,padString){
			var x=targetLength-this.length;
			if(x<0) return this+"";
			if(!padString) padString=" ";
			return padString.repeat(Math.ceil(x/padString.length)).substr(0,x)+this;
		};
	}

	if(!String.prototype.padEnd){
		String.prototype.padEnd=function padEnd(targetLength,padString){
			var x=targetLength-this.length;
			if(x<0) return this+"";
			if(!padString) padString=" ";
			return this+padString.repeat(Math.ceil(x/padString.length)).substr(0,x);
		};
	}

	if(!Function.prototype.bind) {
		Function.prototype.bind = function(context) {
			var self = this, args = Array.prototype.slice.call(arguments, 1);
			return function() {
				return self.apply(context, args.concat(Array.prototype.slice.call(arguments)));
			};
		};
	}

	var Symbol$1 = this.Symbol;

	var symbol_sqe = 0;
	var all_symbol = {};
	function Symbol$2(desc) {
		this.__name__ = "@@" + desc + ":" + symbol_sqe;
		this.description = desc;
		symbol_sqe++;
		all_symbol[this.__name__] = this;
	}Symbol$2.prototype.toString = function() {
		return this.__name__;
	};
	function getOwnPropertySymbols(obj) {
		var arr = [];
		for(var key in obj) {
			if(key.startsWith("@@")) {
				if(Object.prototype.hasOwnProperty.call(obj, key)) {
					arr.push(all_symbol[key]);
				}
			}
		}
		return arr;
	}

	function Symbol$3(desc) {
		return new Symbol$2(desc);
	}Symbol$3.sham = true;
	Symbol$3.asyncIterator = "@@asyncIterator";
	Symbol$3.hasInstance = "@@hasInstance";
	Symbol$3.isConcatSpreadable = "@@isConcatSpreadable";
	Symbol$3.iterator = "@@iterator";
	Symbol$3.match = "@@match";
	Symbol$3.matchAll = "@@matchAll";
	Symbol$3.replace = "@@replace";
	Symbol$3.search = "@@search";
	Symbol$3.species = "@@species";
	Symbol$3.split = "@@split";
	Symbol$3.toPrimitive = "@@toPrimitive";
	Symbol$3.toStringTag = "@@toStringTag";
	Symbol$3.unscopables = "@@unscopables";

	function Symbol$4(desc) {
		if(desc == undefined) {
			desc = "";
		}
		return Symbol$1(desc);
	}

	if(!Symbol$1) {
		this.Symbol = Symbol$3;
	} else {
		if(String(Symbol()) !== String(Symbol(""))) {
			Object.setPrototypeOf(Symbol$4,Symbol);
			this.Symbol = Symbol$4;
		}
		if(!Symbol.asyncIterator){ Symbol.asyncIterator = Symbol$1("asyncIterator");}
		if(!Symbol.hasInstance){ Symbol.hasInstance = Symbol$1("hasInstance");}
		if(!Symbol.isConcatSpreadable ){ Symbol.isConcatSpreadable = Symbol$1("isConcatSpreadable");}
		if(!Symbol.iterator ){ Symbol.iterator = Symbol$1("iterator");}
		if(!Symbol.match ){ Symbol.match = Symbol$1("match");}
		if(!Symbol.matchAll ){ Symbol.matchAll = Symbol$1("matchAll");}
		if(!Symbol.replace ){ Symbol.replace = Symbol$1("replace");}
		if(!Symbol.search ){ Symbol.search = Symbol$1("search");}
		if(!Symbol.species ){ Symbol.species = Symbol$1("species");}
		if(!Symbol.split ){ Symbol.split = Symbol$1("split");}
		if(!Symbol.toPrimitive ){Symbol.toPrimitive = Symbol$1("toPrimitive");}
		if(!Symbol.toStringTag){ Symbol.toStringTag = Symbol$1("toStringTag");}
		if(!Symbol.unscopables ){ Symbol.unscopables = Symbol$1("unscopables");}
	}

	var Symbol$5 = (function() {
		if(!Symbol$1) {
			return Symbol$3;
		} else if(String(Symbol()) !== String(Symbol(""))) {
			Object.setPrototypeOf(Symbol$4,Symbol$1);
			if(!Symbol$1.asyncIterator){ Symbol$4.asyncIterator = Symbol$1("asyncIterator");}
			if(!Symbol$1.hasInstance){ Symbol$4.hasInstance = Symbol$1("hasInstance");}
			if(!Symbol$1.isConcatSpreadable ){ Symbol$4.isConcatSpreadable = Symbol$1("isConcatSpreadable");}
			if(!Symbol$1.iterator ){ Symbol$4.iterator = Symbol$1("iterator");}
			if(!Symbol$1.match ){ Symbol$4.match = Symbol$1("match");}
			if(!Symbol$1.matchAll ){ Symbol$4.matchAll = Symbol$1("matchAll");}
			if(!Symbol$1.replace ){ Symbol$4.replace = Symbol$1("replace");}
			if(!Symbol$1.search ){ Symbol$4.search = Symbol$1("search");}
			if(!Symbol$1.species ){ Symbol$4.species = Symbol$1("species");}
			if(!Symbol$1.split ){ Symbol$4.split = Symbol$1("split");}
			if(!Symbol$1.toPrimitive ){Symbol$4.toPrimitive = Symbol$1("toPrimitive");}
			if(!Symbol$1.toStringTag){ Symbol$4.toStringTag = Symbol$1("toStringTag");}
			if(!Symbol$1.unscopables ){ Symbol$4.unscopables = Symbol$1("unscopables");}
		} else {
			return Symbol$1;
		}
	})();

	var symbol_cache = {};
	function compat_for(desc) {
		if(Object.prototype.hasOwnProperty.call(symbol_cache, desc)) {
			return symbol_cache[desc];
		}
		var s = Symbol$5(desc);
		s.__key__ = desc;
		symbol_cache[desc] = s;
		return s;
	}

	//import { Symbol } from "./Symbol";
	var symbol_cache$1 = {};
	var key_cache = {};
	function modern_for(desc) {
		if(Object.prototype.hasOwnProperty.call(symbol_cache$1, desc)) {
			return symbol_cache$1[desc];
		}
		var s = Symbol$5(desc);
		key_cache[s] = desc;
		symbol_cache$1[desc] = s;
		return s;
	}

	if(!('for' in Symbol)) {
		Symbol['for'] = Symbol ? modern_for : compat_for;
	}

	function keyFor(symbol) {
		return symbol.__key__;
	}

	function keyFor$1(symbol) {
		return key_cache[symbol];
	}

	if(!Symbol.keyFor) {
		Symbol.keyFor = Symbol ? keyFor$1 : keyFor;
	}

	if(!Object.getOwnPropertySymbols) {
		Object.getOwnPropertySymbols = getOwnPropertySymbols;
	}

	var dontEnums=[
		"toString",
		"toLocaleString",
		"valueOf",
		"hasOwnProperty",
		"isPrototypeOf",
		"propertyIsEnumerable"
	];

	function getPrototypeOf(obj){
		if(typeof obj!=="object"){
			obj=Object(obj);
		}
		if(!('constructor' in obj)){
			return null;
		}
		if(Object.prototype.hasOwnProperty.call(obj,'constructor')){
			if('__proto__' in obj.constructor){
				return obj.constructor.__proto__.prototype;
			}
		}
		return obj.constructor.prototype;
	}

	function keys(obj){
		var result=[],key;
		var isJsObject=obj instanceof Object;
		if(!isJsObject){
			var proto=getPrototypeOf(obj);
			if(proto){
				for(key in obj){
					if(!key.startsWith("@@") && !key.startsWith("__") && proto[key]!==obj[key]){
						result.push(key);
					}
				}
				return result;
			}
		}
		for(key in obj){
			if(Object.prototype.hasOwnProperty.call(obj,key) && !key.startsWith("@@") && !key.startsWith("__")){
				result.push(key);
			}
		}
		var i=dontEnums.length;
		while(i-->0){
			key=dontEnums[i];
			if(Object.prototype.hasOwnProperty.call(obj,key)){
				result.push(key);
			}
		}
		return result;
	}

	var keys$1=Object.keys;

	function ie_keys(obj) {
		return keys$1.call(Object, obj).filter(checkSymbolKey);
	}
	function checkSymbolKey(key) {
		return !key.startsWith("@@");
	}
	function nie_keys(obj) {
		var result = [];
		for(var key in obj) {
			if(!key.startsWith("@@") && Object.prototype.hasOwnProperty.call(obj, key)) {
				result.push(key);
			}
		}
		return result;
	}

	var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');

	if(!Object.keys) {
		if(hasEnumBug) {
			Object.keys = keys;
		} else {
			Object.keys = nie_keys;
		}
	} else if(!Symbol$1) {
		Object.keys = ie_keys;
	}

	function defineProperty(obj, prop, descriptor) {
		if('value' in descriptor) {
			delete obj[prop];
			obj[prop] = descriptor.value;
		} else {
			if(descriptor.get) obj.__defineGetter__(prop, descriptor.get);
			if(descriptor.set) obj.__defineSetter__(prop, descriptor.set);
		}
		return obj;
	}

	var defineProperty$1=Object.defineProperty;

	function ie8_defineProperty(obj, prop, descriptor) {
		if(obj instanceof Object) {
			compat_defineProperty.apply(Object, arguments);
		} else {
			delete descriptor.enumerable;
			defineProperty$1.apply(Object, arguments);
		}
		return obj;
	}
	function compat_defineProperty(obj, prop, descriptor) {
		if('value' in descriptor) {
			obj[prop] = descriptor.value;
		} else {
			console.warn("ES3 do NOT support accessor.");
		}
		obj['@@desc:' + prop] = descriptor;
		return obj;
	}

	var $inject_Object_defineProperty = (function() {
		if(Object.defineProperties) {
			return Object.defineProperty;
		} else {
			if(Object.defineProperty) {
				if(Object.prototype.__defineSetter__) {
					return defineProperty;
				} else {
					return ie8_defineProperty;
				}
			} else {
				return compat_defineProperty;
			}
		}
	})();

	function defineProperties(obj, properties) {
		var ownKeys = Object.keys(properties);
		var len = ownKeys.length;
		for(var i = 0; i < len; i++) {
			var key = ownKeys[i];
			$inject_Object_defineProperty(obj, key, properties[key]);
		}
	}

	var $inject_Object_defineProperties = Object.defineProperties || defineProperties;

	//var defineProperties = require("sky-core/pure/Object/defineProperties");
	function create(proto, properties) {
		function F() { }
		F.prototype = proto;
		var o = new F();
		if(properties) {
			$inject_Object_defineProperties(o, properties);
		}
		return o;
	}

	function create$1(proto, properties) {
		var o = {};
		Object.setPrototypeOf(o, proto);
		if(properties) {
			$inject_Object_defineProperties(o, properties);
		}
		return o;
	}

	if(!Object.create){
		if('__proto__' in Object.prototype){
			Object.create=create$1;
		}else {
			Object.create=create;
		}
	}

	function getPrototypeOf$1(object){
		return object.__proto__;
	}

	if(!Object.getPrototypeOf) {
		if('__proto__' in Object.prototype) {
			Object.getPrototypeOf = getPrototypeOf$1;
		} else {
			Object.getPrototypeOf = getPrototypeOf;
		}
	}

	function setPrototypeOf(obj,proto){
		obj.__proto__=proto;
		return obj; 
	}

	if(!Object.setPrototypeOf) {
		if('__proto__' in Object.prototype) {
			Object.setPrototypeOf = setPrototypeOf;
		}
	}

	function getOwnPropertyDescriptor(obj,prop){
		var key='@@desc:'+prop;
		if(Object.prototype.hasOwnProperty.call(obj,key)){
			return obj[key];
		}
		if(Object.prototype.hasOwnProperty.call(obj,prop)){
			return {value: obj[prop], writable: true, enumerable: true, configurable: true};
		}
	}

	function getOwnPropertyDescriptor$1(obj,key){
		if(Object.prototype.hasOwnProperty.call(obj,key)){
			var r=new Object();
			r.enumerable=true;
			r.configurable=true;
			r.set=obj.__lookupSetter__(key);
			r.get=obj.__lookupGetter__(key);
			return r;
		}
	}

	if(!Object.getOwnPropertyDescriptor){
		if(Object.prototype.__defineSetter__){
			Object.getOwnPropertyDescriptor=getOwnPropertyDescriptor$1;
		}else {
			Object.getOwnPropertyDescriptor=getOwnPropertyDescriptor;
		}
	}

	if(!Object.defineProperty) {
		if(Object.prototype.__defineSetter__){
			Object.defineProperty=defineProperty;
		}else {
			Object.defineProperty=compat_defineProperty;
		}
	}else if(!Object.defineProperties){
		Object.defineProperty=ie8_defineProperty;
	}

	function assign(target, varArgs) {
		if(target === null) {
			throw 'Cannot convert undefined or null to object';
		}
		var to = target;
		for(var i = 1; i < arguments.length; i++) {
			var obj = arguments[i];
			if(obj != null) {
				var ownKeys = Object.keys(obj);
				for(var j = 0; j < ownKeys.length; j++) {
					var key = ownKeys[j];
					to[key] = obj[key];
				}
			}
		}
		return to;
	}

	if(!Object.assign){
		Object.assign=assign;
	}

	var defineProperties$1 = Object.defineProperties;

	if(!defineProperties$1){
		if(Object.prototype.__defineSetter__){
			Object.defineProperties=defineProperties;
		}
	}

	function is(x, y){
		if(x===y){// Steps 1-5, 7-10
			// Steps 6.b-6.e: +0 != -0
			return x!==0 || 1/x===1/y;
		}else {
			// Step 6.a: NaN == NaN
			return x!==x && y!==y;
		}
	}

	if (!Object.is){
		Object.is=is;
	}

	function apply(target, thisArgument, argumentsList){
		return Function.prototype.apply.call(target, thisArgument, argumentsList);
	}

	function construct(target, argumentsList, NewTarget) {
		var o = Object.create(target.prototype);
		if(!NewTarget) { NewTarget = o; }
		var o2 = apply(target, NewTarget, argumentsList);
		if(o2 !== void 0) {
			return o2;
		}
		return o;
	}

	function defineProperty$2(target, propertyKey, attributes) {
		try {
			$inject_Object_defineProperty(target, propertyKey, attributes);
			return true;
		} catch(e) {
			console.error(e);
		}
		return false;
	}

	var getPrototypeOf$2 = Object.getPrototypeOf || (Object.prototype.__proto__ ? getPrototypeOf$1 : getPrototypeOf);

	var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor || (Object.prototype.__defineSetter__ ? getOwnPropertyDescriptor$1 : getOwnPropertyDescriptor);

	function set(target, propertyKey, value, receiver) {
		if(receiver === void 0) {
			try {
				target[propertyKey] = value;
				return true;
			} catch(e) {
				return false;
			}
		}
		var o = target, desc;
		do {
			desc = Object.getOwnPropertyDescriptor(o, propertyKey);
			if(desc) {
				if(desc.set) {
					try {
						descriptor.set.call(receiver, value);
						return true;
					} catch(e) {
						return false;
					}
				} else if('value' in desc) {
					target[propertyKey] = value;
					return true;
				}
			}
			o = Object.getPrototypeOf(o);
		} while(o && o !== Object.prototype);
		target[propertyKey] = value;
		return true;
	}

	function get(target, propertyKey, receiver) {
		if(receiver === void 0) { receiver = target; }
		var o = target, attributes;
		do {
			attributes = Object.getOwnPropertyDescriptor(o, propertyKey);
			if(attributes) {
				if(attributes.get) {
					return attributes.get.call(receiver);
				}
				return attributes.value;
			}
			o = Object.getPrototypeOf(o);
		} while(o && o !== Object.prototype);
		return target[propertyKey];
	}

	function deleteProperty(target, key) {
		delete target[key];
	}

	if(!this.Reflect) {
		this.Reflect = {
			apply: apply,
			construct: construct,
			defineProperty: defineProperty$2,
			getPrototypeOf: getPrototypeOf$2,
			getOwnPropertyDescriptor: getOwnPropertyDescriptor$2,
			set: set,
			get: get,
			deleteProperty: deleteProperty
		};
	}

	if(!Array.prototype.indexOf){
		Array.prototype.indexOf=function(e,fromIndex){
			fromIndex=isNaN(fromIndex)?0:fromIndex;
			for(var i=fromIndex,j;i<this.length; i++){
				j=this[i];
				if(j===e){return i;}
			}
			return -1;
		};
	}

	if(!Array.prototype.lastIndexOf){
		Array.prototype.lastIndexOf = function(e, fromIndex) {
			var i=isNaN(fromIndex)?this.length:fromIndex+1;
			while(i--){
				var j=this[i];
				if(j===e){return i;}
			}
			return -1;
		};
	}

	if(!Array.prototype.forEach){
		Array.prototype.forEach =function(callback, thisArg){
			var len=this.length;
			for(var i=0,j;i<len && i<this.length; i++){
				j=this[i];
				callback.call(thisArg,j,i,this);
			}
		};
	}

	if(!Array.prototype.map){
		Array.prototype.map = function(fn, context) {
			var arr = [];
			for (var k = 0, length = this.length; k < length; k++) {
				arr.push(fn.call(context, this[k], k, this));
			}
			return arr;
		};
	}

	if(!Array.prototype.filter){
		Array.prototype.filter = function(fn, context) {
			var arr = [];
			for (var k = 0, length = this.length; k < length; k++) {
				fn.call(context, this[k], k, this) && arr.push(this[k]);
			}
			return arr;
		};
	}

	if(!Array.prototype.some){
		Array.prototype.some = function(fn, context) {
			var passed = false;
			for (var k = 0, length = this.length; k < length; k++) {
				if (passed === true) break;
				passed = !!fn.call(context, this[k], k, this);
			}
			return passed;
		};
	}

	if(!Array.prototype.every){
		Array.prototype.every = function(fn, context) {
			var passed = true;
			for (var k = 0, length = this.length; k < length; k++) {
				if (passed === false) break;
				passed = !!fn.call(context, this[k], k, this);
			}
			return passed;
		};
	}

	if(!Array.prototype.reduce){
		Array.prototype.reduce=function(callback){
			var i,value;
			if(arguments.length>=2){
				value=arguments[1];
				i=0;
			}else if(this.length>0){
				value=this[0];
				i=1;
			}else {
				throw new Error("Reduce of empty array with no initial value");
			}
			while(i<this.length){
				if (i in this) {
					value=callback(value,this[i],i,this);
				}
				i++;
			}
			return value;
		};
	}

	function isString(obj){
		return Object.prototype.toString.call(obj)==='[object String]';
	}

	function isArrayLike(obj){
		var length=obj.length;
		if(typeof length !="number" || length<0 || isNaN(length) || Math.ceil(length)!=length){
			return false;
		}
		return true;
	}

	function from(arrayLike, mapFn, thisArg) {
		var arr;
		if(isString(arrayLike)) {
			arr = new Array();
			for(var i = 0; i < arrayLike.length; i++) {
				arr.push(arrayLike.charAt(i));
			}
		} else if(isArrayLike(arrayLike)) {
			try {
				arr = Array.prototype.slice.call(arrayLike);
			} catch(e) {
				arr = new Array();
				for(var i = 0; i < arrayLike.length; i++) {
					arr.push(arrayLike[i]);
				}
			}
		} else {
			arr = new Array();
			var entries = arrayLike[Symbol$5.iterator];
			if(entries) {
				var it = entries.call(arrayLike);
				while(true) {
					var next = it.next();
					if(next.done) break;
					arr.push(next.value);
				}
			}
		}
		if(mapFn) {
			arr = arr.map(mapFn, thisArg);
		}
		return arr;
	}

	if(!Array.from){
		Array.from=from;
	}

	function isArray(obj){
		return Object.prototype.toString.call(obj)==='[object Array]';
	}

	if(!Array.isArray){
		Array.isArray=isArray;
	}

	function of() {
		return Array.prototype.slice.call(arguments);
	}

	if(!Array.of) {
		Array.of = of;
	}

	if(!Array.prototype.includes){
		Array.prototype.includes=function(search,start){
			return this.indexOf(search, start)!==-1;
		};
	}

	if(!Array.prototype.findIndex){
		Array.prototype.findIndex = function(callback, thisArg) {
			for(var i=0,j; i<this.length; i++){
				j=this[i];
				var r=callback.call(thisArg,j,i,this);
				if(r){
					return i;
				}
			}
			return -1;
		};
	}

	if(!Array.prototype.find){
		Array.prototype.find = function(callback, thisArg) {
			var i=this.findIndex(callback, thisArg);
			if(i>=0){
				return this[i];
			}
		};
	}

	function Iterator(arr){
		this.array=arr;
		this.i=0;
	}
	Iterator.prototype.next=function(){
		var result={};
		result.done=this.array.length<=this.i;
		if(!result.done){
			result.value=this.array[this.i];
			this.i++;
		}
		return result;
	};
	if(!Array.prototype.entries){
		Array.prototype.entries=function(){
			return new Iterator(this);
		};
	}

	if(!Array.prototype[Symbol$5.iterator]) {
		Array.prototype[Symbol$5.iterator] = Array.prototype.entries;
	}

	var Date$1 = globalThis.Date;

	function Date$2(str) {
		var arr;
		if(isString(str)) {
			if(arr = str.match(/^(\d{4})\-(\d{2})\-(\d{2})$/)) {
				return Date$1.UTC(this, parseInt(arr[1]), parseInt(arr[2]) - 1, parseInt(arr[3]));
			}
			if(arr = str.match(/^(\d{4})\-(\d{2})\-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/)) {
				return Date$1.UTC(parseInt(arr[1]), parseInt(arr[2]) - 1, parseInt(arr[3]), parseInt(arr[4]), parseInt(arr[5]), parseInt(arr[6]));
			}
			if(arr = str.match(/^(\d{4})\-(\d{2})\-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)Z$/)) {
				return Date$1.UTC(parseInt(arr[1]), parseInt(arr[2]) - 1, parseInt(arr[3]), parseInt(arr[4]), parseInt(arr[5]), parseInt(arr[6]), parseFloat(arr[7]) * 1000);
			}
		}
		switch(arguments.length){
			case 0:
				return new Date$1();
			case 1:
				return new Date$1(str);
			case 3:
				return new Date$1(str,arguments[1],arguments[2]);
			case 4:
				return new Date$1(str,arguments[1],arguments[2],arguments[3]);
			case 5:
				return new Date$1(str,arguments[1],arguments[2],arguments[4],arguments[5]);
			case 6:
				return new Date$1(str,arguments[1],arguments[2],arguments[4],arguments[5],arguments[6]);
			case 7:
				return new Date$1(str,arguments[1],arguments[2],arguments[4],arguments[5],arguments[6],arguments[7]);
		}
		return Date$1.apply(this, arguments);
	}
	Date$2.prototype = Date$1.prototype;

	if(isNaN(new Date$1("2011-11-11T11:11:11.111Z"))) {
		Date$2.UTC = Date$1.UTC;
		Date$2.now = Date$1.now;
		Date$2.parse = function(str) {
			return new Date$2(str).getTime();
		};
		this.Date = Date$2;
	}

	function now() {
		return new Date().getTime();
	}

	if(!Date.now) {
		Date.now = now;
	}

	function prefixIntrger2(number) {
		if(number<10){
			return '0'+number;
		}
		return number;
	}

	function prefixIntrger3(number) {
		if(number<100){
			return '0'+prefixIntrger2(number);
		}
		return number;
	}

	if(!Date.prototype.toISOString){
		Date.prototype.toISOString = function() {
			return this.getUTCFullYear()+
				'-'+prefixIntrger2(this.getUTCMonth()+1)+
				'-'+prefixIntrger2(this.getUTCDate()) +
				'T'+prefixIntrger2(this.getUTCHours()) +
				':'+prefixIntrger2(this.getUTCMinutes()) +
				':'+prefixIntrger2(this.getUTCSeconds()) +
				'.'+prefixIntrger3(this.getUTCMilliseconds())+'Z';
		};
	}

	if(!Date.prototype.toJSON){
		Date.prototype.toJSON=Date.prototype.toISOString;
	}

	function toLocaleFormat(date, format) {
		var Y = date.getFullYear();
		var M = prefixIntrger2(date.getMonth() + 1);
		var D = prefixIntrger2(date.getDate());
		var h = prefixIntrger2(date.getHours());
		var m = prefixIntrger2(date.getMinutes());
		var s = prefixIntrger2(date.getSeconds());
		var o = {
			"%x": Y + "/" + M + "/" + D,
			"%X": h + ":" + m + ":" + s,
			"%Y": Y,
			"%y": prefixIntrger2(date.getYear() % 100),
			"%m": M,
			"%e": date.getDate(),
			"%d": D,
			"%H": h,
			"%i": prefixIntrger2(date.getHours() % 12),
			"%M": m,
			"%S": s,
			"%p": date.getHours() % 12 > 1 ? "PM" : "AM",
			"%%": "%"
		};
		o["%T"] = o["%X"];
		return format.replace(/%[xXTYymedHiMSp%]/g, function(word) {
			for(var k in o) {
				if(k == word) {
					return o[k];
				}
			}
			return word;
		});
	}

	if(!Date.prototype.toLocaleFormat) {//部分浏览器支持
		Date.prototype.toLocaleFormat = function(format){
			return toLocaleFormat(this,format)
		};
	}

	//部分非IE浏览器的toLocaleString未国际化
	if(new Date().toLocaleString().match(/[a-z]/i)) {
		Date.prototype.toLocaleString = function() {
			return toLocaleFormat.call(this, "%Y-%m-%d %H:%M:%S");
		};
	}

	//部分非IE浏览器的toLocaleString未国际化
	if(new Date().toLocaleTimeString().match(/[a-z]/i)) {
		Date.prototype.toLocaleTimeString = function() {
			return toLocaleFormat.call(this, "%H:%M:%S");
		};
	}

	//部分非IE浏览器的toLocaleString未国际化
	if(new Date().toLocaleDateString().match(/[a-z]/i)) {
		Date.prototype.toLocaleDateString = function() {
			return toLocaleFormat.call(this, "%Y-%m-%d");
		};
	}

	var symbol_sqe$1=0;
	var all_symbol$1={};
	function SymbolClass(desc){
		this.__name__="@@"+desc+":"+symbol_sqe$1;
		symbol_sqe$1++;
		all_symbol$1[this.__name__]=this;
	}
	SymbolClass.prototype.toString=function(){
		return this.__name__;
	};
	function Symbol$6(desc){
		return new SymbolClass(desc);
	}Symbol$6.sham=true;
	Symbol$6.iterator="@@iterator";
	Symbol$6.hasInstance="@@hasInstance";

	var Set$1 = this.Set;

	function ES6Iterator(it){
		this.iterator=it;
	}
	ES6Iterator.prototype.next=function(){
		var r={};
		try{
			r.value=this.iterator.next();
			r.done=false;
		}catch(e){
			r.done=true;
		}
		return r;
	};
	ES6Iterator.prototype[Symbol$5.iterator]=function(){
		return this;
	};
	function toES6Iterator(it){
		return new ES6Iterator(it);
	}

	function fixSet(){
		function Set(args) {
			var set = new Set$1(args);
			Object.setPrototypeOf(set, Object.getPrototypeOf(this));
			if(args && set.size === 0) {
				args = Array.from(args);
				args.forEach(Set$1.prototype.add, set);
			}
			return set;
		}
		Object.setPrototypeOf(Set, Set$1);
		Set.prototype = Object.create(Set$1.prototype);
		var s = new Set$1();
		if(s !== s.add(1)) {
			Set.prototype.add = function(value) {
				Set$1.prototype.add.call(this, value);
				return this;
			};
		}
		if(typeof s.size === "function") {
			$inject_Object_defineProperty(Set.prototype, 'size', {
				get: function() {
					return Set$1.prototype.size.call(this);
				},
				enumerable: true
			});
		}
		if(Set.prototype.iterator) {
			if(!Set.prototype[Symbol$5.iterator]) {
				Set.prototype[Symbol$5.iterator] = function() {
					return toES6Iterator(this.iterator());
				};
			}
			if(!Set.prototype.forEach) {
				Set.prototype.forEach = function(callbackfn, thisArg) {
					var it = this.iterator();
					while(true) {
						try {
							var next = it.next();
						} catch(e) {
							break;
						}
						callbackfn.call(thisArg, next, next, this);
					}
				};
			}
		}
		if(!Set.prototype[Symbol$5.iterator]) {
			if(Set.prototype.forEach) {
				Set.prototype[Symbol$5.iterator] = function() {
					var arr = [];
					this.forEach(pushEach, arr);
					return arr[Symbol$5.iterator]();
				};
			}
		}
		if(!Set.prototype.values){
			Set.prototype.values=Set.prototype[Symbol$5.iterator];
		}
		return Set;
	}function pushEach(value) {
		this.push(value);
	}

	function createSet(){
		function Set(arr) {
			this.items = new Array();
			if(arr) {
				var entries = arr[Symbol$5.iterator];
				if(entries) {
					var it = entries.call(arr);
					while(true) {
						var next = it.next();
						if(next.done) break;
						this.add(next.value);
					}
				}
			}
			this.size = this.items.length;
		}	Set.prototype.has = function(value) {
			return this.items.indexOf(value) >= 0;
		};
		Set.prototype.add = function(value) {
			if(!this.has(value)) {
				this.items.push(value);
				this.size = this.items.length;
			}
			return this;
		};
		Set.prototype['delete'] = function(value) {
			var i = this.items.indexOf(value);
			if(i >= 0) {
				this.items.splice(i, 1);
				this.size = this.items.length;
				return true;
			}
			return false;
		};
		Set.prototype.clear = function() {
			this.items.splice(0, this.items.length);
			this.size = 0;
		};
		Set.prototype.forEach = function(callback, thisArg) {
			for(var i = 0, j; i < this.size; i++) {
				j = this.items[i];
				callback.call(thisArg, j, j, this);
			}
		};
		Set.prototype.values = function() {
			return this.items[Symbol$5.iterator]();
		};
		Set.prototype[Symbol$5.iterator] = Set.prototype.values;
		return Set
	}

	if(Set$1) {
		if(!Symbol$6 || !Set$1.prototype[Symbol$6.iterator]){
			this.Set = fixSet();
		}
	} else {
		this.Set = createSet();
	}

	var Map = this.Map;

	function fixMap(){
		function Map$1(args) {
			var map = new Map(args);
			Object.setPrototypeOf(map, Object.getPrototypeOf(this));
			if(args && map.size === 0) {
				args = Array.from(args);
				args.forEach(setEach, map);
			}
			return map;
		}
		function setEach(item) {
			Map.prototype.set.apply(this, item);
		}
		Object.setPrototypeOf(Map$1, Map);
		Map$1.prototype = Object.create(Map.prototype);
		var m = new Map();
		if(typeof m.size === "function") {
			$inject_Object_defineProperty(Map$1.prototype, 'size', {
				get: function() {
					return Map.prototype.size.call(this);
				},
				enumerable: true
			});
		}
		if(m !== m.set(1, 1)) {
			Map$1.prototype.set = function(key, value) {
				Map.prototype.set.call(this, key, value);
				return this;
			};
		}
		if(Map$1.prototype.iterator) {
			if(!Map$1.prototype[Symbol$5.iterator]) {
				Map$1.prototype[Symbol$5.iterator] = function() {
					return toES6Iterator(this.iterator());
				};
			}
			if(!Map$1.prototype.forEach) {
				Map$1.prototype.forEach = function(callbackfn, thisArg) {
					var it = this.iterator();
					while(true) {
						try {
							var next = it.next();
						} catch(e) {
							break;
						}
						callbackfn.call(thisArg, next[1], next[0], this);
					}
				};
			}
		}
		if(!Map$1.prototype[Symbol$5.iterator]) {
			if(Map$1.prototype.forEach) {
				Map$1.prototype[Symbol$5.iterator] = function() {
					var arr = [];
					this.forEach(pushEach$1, arr);
					return arr[Symbol$5.iterator]();
				};
			}
		}
		if(!Map$1.prototype.entries){
			Map$1.prototype.entries=Map$1.prototype[Symbol$5.iterator];
		}
		return Map$1;
	}
	function pushEach$1(value, key) {
		this.push([key, value]);
	}

	function find(arr,key,value){
		for(var i=0; i<arr.length; i++){
			if(arr[i][key]===value){return arr[i];}
		}
	}

	function findIndex(arr,key,value){
		for(var i=0; i<arr.length; i++){
			if(arr[i][key]===value){return i;}
		}
		return -1;
	}

	function createMap(){
		function Map(arr) {
			this.items = new Array();
			if(arr) {
				var entries = arr[Symbol$5.iterator];
				if(entries) {
					var it = entries.call(arr);
					while(true) {
						var next = it.next();
						if(next.done) break;
						this.set(next.value[0], next.value[1]);
					}
				}
			}
			this.size = this.items.length;
		}	Map.prototype.entries = function() {
			return this.items[Symbol$5.iterator]();
		};
		Map.prototype.clear = function() {
			this.items.splice(0, this.items.length);
			this.size = 0;
		};
		Map.prototype["delete"] = function(key) {
			var i = findIndex(this.items, 0, key);
			if(i >= 0) {
				var r = this.items[i];
				this.items.splice(i, 1);
				this.size = this.items.length;
				return r;
			}
			return false;
		};
		Map.prototype.forEach = function(callbackfn, thisArg) {
			var len = this.size;
			for(var i = 0, j; i < len; i++) {
				j = this.items[i];
				if(j) {
					callbackfn.call(thisArg, j[1], j[0], this);
				}
			}
		};
		Map.prototype.get = function(key) {
			var r = find(this.items, 0, key);
			if(r) {
				return r[1];
			}
		};
		Map.prototype.has = function(key) {
			return findIndex(this.items, 0, key) >= 0;
		};
		Map.prototype.set = function(key, value) {
			var r = find(this.items, 0, key);
			if(r) {
				r[1] = value;
			} else {
				this.items.push([key, value]);
			}
			this.size = this.items.length;
			return this;
		};
		Map.prototype[Symbol$5.iterator] = Map.prototype.entries;
		return Map;
	}

	if(Map) {
		if(!Symbol$6 || !Map.prototype[Symbol$6.iterator]){
			this.Map = fixMap();
		}
	} else {
		this.Map = createMap();
	}

	function parse(str) {
		return eval('(' + str + ')');
	}

	var rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	function escapeString(str){//from lodash
		rx_escapable.lastIndex = 0;
		return rx_escapable.test(str)
			? str.replace(rx_escapable, function(a) {
			var meta = {
				"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r": "\\r",	"\"": "\\\"","\\": "\\\\"
			};
			var c = meta[a];
			return typeof c === "string"
				? c
				: "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
		}): str;
	}

	function isFunction(obj){
		return Object.prototype.toString.call(obj)==='[object Function]';
	}

	function stringify(obj) {
		switch(obj) {
			case undefined:
			case null:
				return "null";
			case false:
			case true:
				return obj;
			default:
				var type = Object.prototype.toString.call(obj);
				switch(type) {
					case '[object String]':
						return '"' + escapeString(obj) + '"';
					case '[object Number]':
						return isNaN(obj) ? "null" : obj.toString();
					case '[object Array]':
						return "[" + obj.map(stringify).join(",") + "]";
					default:
						if(obj.toJSON && isFunction(obj.toJSON)) {
							return stringify(obj.toJSON());
						}
						var items = [];
						var ownKeys = Object.keys(obj);
						for(var i = 0; i < ownKeys.length; i++) {
							var key = ownKeys[i];
							var value = obj[key];
							if(value !== void 0) {
								if(!isFunction(value)) {
									items.push('"' + escapeString(key) + '":' + stringify(value));
								}
							}
						}
						return "{" + items.join(",") + "}";
				}
		}
	}

	if(!globalThis.JSON) {
		globalThis.JSON = {
			stringify: stringify,
			parse: parse
		};
	}

	var ticks = null;
	var nextTick = setTimeout;
	function initQueueMicrotask(fn) {
		nextTick = fn;
	}
	function next() {
		if(ticks && ticks.length) {
			for(var i = 0; i < ticks.length; i++) {
				var fn = ticks[i];
				try {
					fn();
				} catch(e) {
					console.error(e);
				}
			}
			ticks = null;
		}
	}
	function queueMicrotask$1(fn) {
		if(!ticks) {
			ticks = new Array();
			nextTick(next);
		}
		ticks.push(fn);
	}

	if(!this.queueMicrotask) {
		initQueueMicrotask(this.Promise ? Promise.prototype.then.bind(Promise.resolve(1)) : (this.setImmediate || setTimeout));
		this.queueMicrotask = queueMicrotask$1;
	}

	function noop(){}

	var PENDING = Symbol$5("pending");
	var RESOLVED = Symbol$5("resolved");
	var REJECTED = Symbol$5("rejected");

	function Promise$1(executor) {
		this._resolveds = [];
		this._rejecteds = [];
		this._state = PENDING;//resolved | rejected

		var me = this;
		function resolve(value) {
			queueMicrotask(function() {
				if(me._state === PENDING) {
					me._value = value;
					me._state = RESOLVED;
					me._resolveds.forEach(callAll, me);
					me._resolveds = null;
				}
			});
		}
		function reject(reason) {
			queueMicrotask(function() {
				if(me._state === PENDING) {
					me._value = reason;
					me._state = REJECTED;
					me._rejecteds.forEach(callAll, me);
					me._rejecteds = null;
				}
			});
		}
		try {
			executor(resolve, reject);
		} catch(e) {
			reject(e);
		}
	}
	function callAll(fn) {
		fn.call(this, this._value);
	}
	function nextPromise(before, after, resolve, reject) {
		return function(value) {
			try {
				var x = before(value);
				if(x && (typeof x.then === "function")) {
					x.then(resolve, reject);
				} else {
					after(x);
				}
			} catch(r) {
				reject(r);
			}
		};
	}
	Promise$1.prototype.then = function(onResolved, onRejected) {
		var me = this;
		onResolved = onResolved || noop;
		onRejected = onRejected || noop;
		return new Promise$1(function(resolve, reject) {
			switch(me._state) {
				case RESOLVED:
					queueMicrotask(nextPromise(onResolved, resolve, resolve, reject), me._value);
					break;
				case REJECTED:
					queueMicrotask(nextPromise(onRejected, reject, resolve, reject), me._value);
					break;
				default:
					me._resolveds.push(nextPromise(onResolved, resolve, resolve, reject));
					me._rejecteds.push(nextPromise(onRejected, reject, resolve, reject));
			}
		});
	};
	Promise$1.prototype['catch'] = function(onRejected) {
		return this.then(undefined, onRejected);
	};
	Promise$1.all = function(promises) {
		if(!Array.isArray(promises)) {
			throw new TypeError('You must pass an array to all.');
		}
		if(promises.length == 0) return Promise$1.resolve();
		return new Promise$1(function(resolve, reject) {
			var result = new Array(promises.length);
			var c = 0;
			promises.forEach(function(one, index) {
				if(typeof one.then === "function") {
					one.then(function(data) {
						c++;
						result[index] = data;
						if(c >= promises.length) {
							resolve(result);
						}
					}, function(error) {
						reject(error);
					});
				} else {
					c++;
					if(c >= promises.length) {
						resolve();
					}
				}
			});
		});
	};
	Promise$1.race = function(promises) {
		if(!Array.isArray(promises)) {
			throw new TypeError('You must pass an array to all.');
		}
		return new Promise$1(function(resolve, reject) {
			promises.forEach(function(one) {
				one.then(function() {
					resolve();
				}, function() {
					reject();
				});
			});
		});
	};
	function ResolvePromise(value) {
		this._value = value;
		this._state = RESOLVED;
	}
	ResolvePromise.prototype = Promise$1.prototype;
	Promise$1.resolve = function(arg) {
		return new ResolvePromise(arg);
	};
	function RejectPromise(value) {
		this._value = value;
		this._state = REJECTED;
	}
	RejectPromise.prototype = Promise$1.prototype;
	Promise$1.reject = function(arg) {
		return new RejectPromise(arg);
	};

	if(!this.Promise) {
		this.Promise = Promise$1;
	}

	function promise_finally(onCompleted) {
		return this.then(onCompleted, onCompleted);
	}

	if(!Promise.finally) {
		Promise.finally = promise_finally;
	}

	function URLSearchParams$1(paramsString) {
		this._data = new Array();
		if(paramsString) {
			var i, pair;
			if(Array.isArray(paramsString)) {
				i = this._data.length = paramsString.length;
				while(i-- > 0) {
					pair = paramsString[i];
					this._data[i] = new Array(pairs[1], pairs[0]);
				}
			} else {
				var pairs = paramsString.split("&");
				i = this._data.length = pairs.length;
				while(i-- > 0) {
					pair = pairs[i];
					if(pair) {
						var id = pair.indexOf("=");
						this._data[i] = new Array(decodeURIComponent(pair.substring(id + 1, pair.length)), decodeURIComponent(pair.substring(0, id)));
					}
				}
			}
		}
	}URLSearchParams$1.prototype.append = function(key, value) {
		this._data.push([value, key]);
	};
	URLSearchParams$1.prototype.get = function(key) {
		var item = this._data.find(function(item) {
			return item[1] == key;
		});
		if(item) return item[0];
		return null;
	};
	URLSearchParams$1.prototype.getAll = function(key) {
		return this._data.filter(function(item) {
			return item[1] == key;
		}).map(function(item) {
			return item[0];
		});
	};
	URLSearchParams$1.prototype.set = function(key, value) {
		var item = this._data.find(function(item) {
			return item[1] == key;
		});
		if(item) {
			item[0] = value;
		} else {
			this.append(key, value);
		}
	};
	URLSearchParams$1.prototype['delete'] = function(key) {
		this._data = this._data.filter(function(item) {
			return item[1] != key;
		});
	};
	URLSearchParams$1.prototype.has = function(key) {
		return this._data.some(function(item) {
			return item[1] == key;
		});
	};
	URLSearchParams$1.prototype.toString = function() {
		return this._data.map(function(item) {
			return encodeURIComponent(item[1]) + "=" + encodeURIComponent(item[0]);
		}).join("&");
	};
	URLSearchParams$1.prototype.sort = function() {
		return this._data.sort(function(a, b) {
			return a[1] > b[1];
		});
	};
	URLSearchParams$1.prototype.forEach = function(fn, thisArg) {
		this._data.forEach.apply(this._data, arguments);
	};

	if(!this.URLSearchParams) {
		this.URLSearchParams = URLSearchParams$1;
	}

	function SearchParams(url) {
		this.url = url;
	}SearchParams.prototype = Object.create(URLSearchParams.prototype);
	["append", "set", "delete"].forEach(function(method) {
		SearchParams.prototype[method] = function(key, value) {
			var searchParams = new URLSearchParams(this.url.search.replace(/^\?/, ""));
			searchParams[method].apply(searchParams, arguments);
			this.url.search = "?" + searchParams.toString();
		};
	});
	["getAll", "get", "has", "toString", "forEach"].forEach(function(method) {
		SearchParams.prototype[method] = function(key, value) {
			var searchParams = new URLSearchParams(this.url.search.replace(/^\?/, ""));
			return searchParams[method].apply(searchParams, arguments);
		};
	});

	function URL$1(relativePath, absolutePath) {
		var path, arr;
		this.port = this.search = this.hash = this.username = this.password = "";
		this.searchParams = new SearchParams(this);
		var pattern = /^[a-zA-Z]+:/;
		if(arr = relativePath.match(pattern)) {
			this.protocol = arr[0];
			path = relativePath.replace(pattern, "");
			pattern = /^\/*([^\/]+)/;
			var host = path.match(pattern)[1];
			path = path.replace(pattern, "");
			arr = host.split("@");
			if(arr.length > 1) {
				this.host = arr[1];
				arr = arr[0].split(":");
				if(arr.length > 1) {
					this.username = arr[0];
					this.password = arr[1];
				} else {
					this.username = arr[0];
				}
			} else {
				this.host = host;
			}
		} else if(absolutePath) {
			var absInfo = absolutePath.indexOf ? new URL$1(absolutePath) : absolutePath;
			if(absInfo.hostname) {
				this.hostname = absInfo.hostname;
				this.port = absInfo.port;
			} else {
				this.host = absInfo.host;
			}
			this.protocol = absInfo.protocol;
			if(absInfo.username) this.username = absInfo.username;
			if(absInfo.password) this.password = absInfo.password;
			this.pathname = absInfo.pathname;
			if(relativePath.startsWith("#")) {
				this.search = absInfo.search;
				this.hash = relativePath;
				return this;
			} else if(relativePath.startsWith("?")) {
				var a = relativePath.indexOf("#");
				if(a < 0) {
					this.search = relativePath;
					this.hash = "";
				} else {
					this.search = relativePath.substr(0, a);
					this.hash = relativePath.substring(a, relativePath.length);
				}
				return this;
			} else if(relativePath.startsWith("/")) {
				path = relativePath;
			} else if(relativePath.startsWith("../")) {
				path = absInfo.pathname.replace(/\/[^\/]*$/, "/") + relativePath;
				pattern = /[^\/]+\/\.\.\//;
				while(pattern.test(path)) {
					path = path.replace(pattern, "");
				}
				path = path.replace(/^(\/\.\.)+/, "");
			} else {
				path = absInfo.pathname.replace(/[^\/]*$/, "") + relativePath.replace(/^\.\//, "");
			}
		} else {
			throw new TypeError("SYNTAX_ERROR");
		}
		pattern = /^[^#]*/;
		this.hash = path.replace(pattern, "");
		arr = path.match(pattern);
		path = arr[0];
		pattern = /^[^\?]*/;
		this.search = path.replace(pattern, "");
		arr = path.match(pattern);
		this.pathname = arr[0];
		return this;
	}
	var URLProperties = {
		host: {
			enumerable: true,
			get: function() {
				if(this.port) {
					return this.hostname + ":" + this.port;
				}
				return this.hostname;
			},
			set: function(value) {
				var pattern = /(.*):(\d+)$/;
				var arr = value.match(pattern);
				this.port = "";
				if(arr) {
					this.hostname = arr[1];
					this.port = arr[2];
				} else {
					this.hostname = value;
				}
			}
		},
		origin: {
			enumerable: true,
			get: function() {
				return this.protocol + "//" + this.host;
			}
		},
		href: {
			enumerable: true,
			get: function() {
				var user = this.username;
				if(user) {
					if(this.password) {
						user += ":" + this.password;
					}
					user += "@";
				}
				return this.protocol + "//" + user + this.host + this.pathname + this.search + this.hash;
			},
			set: function(value) {
				var url = new URL$1(value);
				if(url.hostname) {
					this.hostname = url.hostname;
					this.port = url.port;
				} else {
					this.host = url.host;
				}
				this.protocol = url.protocol;
				this.pathname = url.pathname;
				this.search = url.search;
				this.hash = url.hash;
				this.username = url.username;
				this.password = url.password;
			}
		}
	};
	function getSearchParams() {
		var searchParams = new SearchParams(this);
		$inject_Object_defineProperty(this, "searchParams", {
			enumerable: true,
			value: searchParams
		});
		return searchParams;
	}

	if(!this.URL) {
		Object.defineProperties(URL$1.prototype, URLProperties);
		this.URL = URL$1;
	} else {
		var url;
		try {
			url = new URL(location.href);
		} catch(e) {
		}
		if(!url || !('href' in url)) {
			URL$1.createObjectURL = URL.createObjectURL;
			URL$1.revokeObjectURL = URL.revokeObjectURL;
			Object.defineProperties(URL$1.prototype, URLProperties);
			this.URL = URL$1;
		} else {
			if(!('origin' in url)) {
				Object.defineProperty(URL.prototype, "origin", URLProperties.origin);
			}
			if(!('searchParams' in url)) {
				Object.defineProperty(URL.prototype, "searchParams", {
					enumerable: true, configurable: true,
					get: getSearchParams
				});
			}
			if(!('toJSON' in url)) {
				URL.prototype.toJSON = function() {
					return this.href;
				};
			}
			if(!('toString' in url) || url.toString() != url.href) {
				URL.prototype.toString = URL.prototype.toJSON;
			}
		}
	}

	if(!('origin' in location)){
		location.origin=location.protocol+"//"+location.host;
	}

	if(!('head' in document)) document.head=document.getElementsByTagName("head")[0];

	if(!document.scripts) {
		document.scripts = document.getElementsByTagName("script");
	}

	if(this.HTMLDocument) {
		/** 判断一个节点后代是否包含另一个节点 **/
		if(!HTMLDocument.prototype.contains && HTMLDocument.prototype.compareDocumentPosition) {
			HTMLDocument.prototype.contains = function(arg) {
				return !!(this.compareDocumentPosition(arg) & 16);
			};
		}
	}

	function contains(ele) {
		var i, arr = document.all;
		for(i = 0; i < arr.length; i++) {
			if(arr[i] === ele) {
				return true;
			}
		}
		return false;
	}

	if(!document.contains && 'all' in document) {
		document.contains = contains;
	}

	if(window.Element) {
		/** 判断一个节点后代是否包含另一个节点 **/
		if(!Element.prototype.contains && Element.prototype.compareDocumentPosition) {
			Element.prototype.contains = function(arg) {
				return !!(this.compareDocumentPosition(arg) & 16);
			};
		}
	}
	if(this.HTMLElement) {
		if(!('children' in document.head)){
			HTMLElement.prototype.__defineGetter__("children", function() {
				var a=[];
				for(var i=0; i<this.childNodes.length; i++){
					var n=this.childNodes[i];
					if(n.nodeType==1){
						a.push(n);
					}
				}
				return a;
			});
		}
		if(!('innerText' in document.head)){
			(function(){
				HTMLElement.prototype.__defineGetter__( "innerText", function(){
					var anyString = "";
					var childS = this.childNodes;
					for(var i=0; i<childS.length; i++){
						var node=childS[i];
						if(node.nodeType==1){
							switch(node.tagName){
								case "BR":
									anyString+='\n';
									break ;
								case "SCRIPT":
								case "STYLE":
								case "TEMPLATE":
									break ;
								default :
									anyString+=node.innerText;
							}
						}else if(node.nodeType==3){
							var nodeValue=node.nodeValue;
							if(i==0)
								nodeValue=nodeValue.trimLeft();
							if(i==childS.length-1)
								nodeValue=nodeValue.trimRight();
							if(i>0 && i<childS.length-1){
								if(nodeValue.match(/^\s+$/)){
									if(checkBlock(childS[i-1]) || checkBlock(childS[i+1])){
										nodeValue="\n";
									}
								}
							}
							anyString+=nodeValue;
						}
					}
					return anyString.trim();
				});
				function checkBlock(node){
					switch(node.tagName){
						case "BR":
						case "SPAN":
						case "I":
						case "U":
						case "B":
						case "FONT":
							return false;
					}
					return true;
				}
			})();
			HTMLElement.prototype.__defineSetter__( "innerText", function(sText){
				this.textContent=sText;
			});
		}
	}

	if(!this.console) {
		this.console = {};
		console.stack = [];
		console.log = console.info = console.error = console.warn = function(data) {
			if(window.Debug) {
				Debug.writeln(data);
			}
		};
		console.clear = noop;
	}

	if(!this.localStorage){
		this.localStorage=new function(){
			var ele=document.createElement("localStorage");
			if(ele.addBehavior){
				ele.addBehavior("#default#userData");
				document.head.appendChild(ele);
				this.getItem=function(key){
					ele.load("localStorage");
					return ele.getAttribute(key);
				};
				this.setItem=function(key,value){
					ele.setAttribute(key,new String(value));
					ele.save("localStorage");
				};
				this.removeItem=function(key){
					ele.removeAttribute(key);
					ele.save("localStorage");
				};
				this.sham=true;
			}
		}();
	}

	function getCookie(name){
		var arr=document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		if(arr != null) return decodeURIComponent(arr[2]); return null;
	}

	function isNumber(obj){
		return Object.prototype.toString.call(obj)==='[object Number]';
	}

	function setCookie(name,value){
		var path="/";
		var seconds;
		var domain;
		var expires;
		if(arguments.length>2){
			for(var i=2;i<arguments.length;i++){
				if(isNumber(arguments[i])){
					seconds=arguments[i];
				}else if(isString(arguments[i])){
					if(arguments[i].indexOf(".")>=0){
						domain=arguments[i];
					}else if(arguments[i].indexOf("/")>=0){
						path=arguments[i];
					}
				}
			}
		}
		if(value==null || seconds<=0) {
			value='';
			seconds=-2592000;
		}
		if(!isNaN(seconds)){
			expires=new Date();
			expires.setTime(expires.getTime() + seconds * 1000);
		}
		document.cookie=name+'='+encodeURIComponent(value)
			+(expires?'; expires='+expires.toGMTString():'')
			+'; path='+path
			+(domain?'; domain='+domain:'');
	}

	if(!this.sessionStorage){
		this.sessionStorage=new function(){
			var ele=document.createElement("sessionStorage");
			var sessionId=getCookie("JSESSIONID");
			if(!sessionId){
				sessionId=Math.random().toString(16).replace("0.","");
				setCookie("JSESSIONID",sessionId);
			}
			if(ele.addBehavior){
				ele.addBehavior("#default#userData");
				document.head.appendChild(ele);
				this.getItem=function(key){
					ele.load(sessionId);
					return ele.getAttribute(key);
				};
				this.setItem=function(key,value){
					ele.setAttribute(key,new String(value));
					ele.save(sessionId);
				};
				this.removeItem=function(key){
					ele.removeAttribute(key);
					ele.save(sessionId);
				};
				this.sham=true;
			}
		}();
	}

	if(typeof Event !== "function") {
		if(document.createEvent) {
			this.Event = function(evt, init) {
				var e = document.createEvent('Event');
				if(init) {
					e.initEvent(evt, init.bubbles, init.cancelable);
				} else {
					e.initEvent(evt, false, false);
				}
				return e;
			};
		}
	}

	var rules=[];
	function ckeck(ckeckFunc,index){
		return ckeckFunc(this[index]);
	}
	function compare(x, y){//比较函数
		return x.checks.length-y.checks.length;
	}
	function overload(checks,func,target){
		if(target){
			rules.push({
				'checks':checks,
				'func':func,
				'target':target
			});
			rules.sort(compare);
		}else {
			var args=checks;
			var thisVal=func;
			var i=rules.length;
			while(i--){
				var rule=rules[i];
				if(args.callee===rule.func){
					if(rule.checks.length>=args.length){
						if(rule.checks.every(ckeck,args)){
							return rule.target.apply(thisVal,args);
						}
					}
				}
			}
			return this;
		}
	}

	function isDate(obj){
		return Object.prototype.toString.call(obj)==='[object Date]';
	}

	function isRegExp(obj){
		return Object.prototype.toString.call(obj)==='[object RegExp]';
	}

	function isObject(obj){
		var type=typeof obj;
		if(type!=="object"){
			return false;
		}
		type=Object.prototype.toString.call(obj);
		switch(type){
			case '[object String]':
			case '[object Number]':
			case '[object Function]':
			case '[object Boolean]':
				return false;
		}
		if(typeof obj.toString==="function" && obj.toString().indexOf("@@")===0){
			return false;//symbol polyfill
		}
		return true;
	}

	function isDefined(obj){
		return obj!==void 0;
	}

	function isWindow$1(obj) {
		return window == obj;
	}

	function isPlainObject(obj){
		if(obj===null){
			return true;
		}
		if(typeof obj!=="object" || obj.nodeType || isWindow(obj)){
			return false;
		}
		return Object.getPrototypeOf(obj)===Object.prototype;
	}

	function isArrayLikeObject(obj){
		if(typeof obj==="object" && isArrayLike(obj)){
			return true;
		}
		return false;
	}

	function isNumeric(obj){
		var n=parseFloat(obj);
		return !isNaN(n);
	}

	function isElement(obj){
		return obj?obj.nodeType===1:false;
	}

	function isInput(obj){
		return obj?obj.tagName==="INPUT":false;
	}

	function isDocument(obj){
		return obj===document;
	}

	function times(n,iteratee,thisArg){
		if(n<1){
			return [];
		}
		var index = -1,
			result = Array(n);
		while (++index < n) {
			result[index] = iteratee.apply(this,thisArg);
		}
		return result;
	}

	function random(a,b){
		var length=b-a+1;
		return Math.floor(Math.random()*length)+a;
	}

	function escapeHtml(str) {
		return str.replace(/&/g,'&amp;')
			.replace(/</g,'&lt;')
			.replace(/>/g,'&gt;');
	}

	function escapeAttribute(str,quot){
		var esc=escapeHtml(str);
		if(!quot || quot=='"'){
			return esc.replace(/"/g,'&quot;');
		}else {
			return esc.replaceAll(quot.charAt(0),'&#'+quot.charCodeAt(0)+";");
		}
	}

	var htmlEscapes={
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;',
		'`': '&#96;'
	};
	function escape(text){
		return text.replace(/[&<>"'`]/g,function(i){
			return htmlEscapes[i];
		});
	}

	var div=document.createElement('div');
	function unescape(html){
		div.innerHTML=html;
		return div.textContent || div.innerText;
	}

	var stringEscapes = {
		'\\': '\\',
		"'": "'",
		'\n': 'n',
		'\r': 'r',
		'\u2028': 'u2028',
		'\u2029': 'u2029'
	};
	var regexpEscapes = {
		'0': 'x30', '1': 'x31', '2': 'x32', '3': 'x33', '4': 'x34',
		'5': 'x35', '6': 'x36', '7': 'x37', '8': 'x38', '9': 'x39',
		'A': 'x41', 'B': 'x42', 'C': 'x43', 'D': 'x44', 'E': 'x45', 'F': 'x46',
		'a': 'x61', 'b': 'x62', 'c': 'x63', 'd': 'x64', 'e': 'x65', 'f': 'x66',
		'n': 'x6e', 'r': 'x72', 't': 'x74', 'u': 'x75', 'v': 'x76', 'x': 'x78'
	};
	var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g;

	function escapeRegExp(str){//from lodash
		if(str){
			reRegExpChars.lastIndex = 0;
			return (reRegExpChars.test(str))
				? str.replace(reRegExpChars, function(chr, leadingChar, whitespaceChar) {
				if (leadingChar) {
					chr = regexpEscapes[chr];
				} else if (whitespaceChar) {
					chr = stringEscapes[chr];
				}
				return '\\' + chr;
			})
				: str;
		}
		return "(?:)";
	}

	function replaceAll(str, reallyDo, replaceWith, ignoreCase) {
		return str.replace(new RegExp(escapeRegExp(reallyDo), (ignoreCase ? "gi": "g")), replaceWith);
	}

	function toString(o){
		return new String(o).valueOf();
	}

	function findLastIndex(arr,key,value){
		for(var i=arr.length-1; i>=0; i--){
			if(arr[i][key]===value){return i;}
		}
		return -1;
	}

	function findLast(arr,key,value){
		for(var i=arr.length-1; i>=0; i--){
			if(arr[i][key]===value){return value;}
		}
	}

	function sortBy(arr,key){
		return arr.sort(function(a,b){
			return a[key] > b[key];
		});
	}

	function pluck(arr,key){
		return arr.map(function(item){
			return item[key];
		});
	}

	function sortedIndex(arr,value){
		for(var i=0; i<arr.length; i++){
			if(arr[i]>=value){
				return i;
			}
		}
		return arr.length;
	}

	function sortedLastIndex(arr,value){
		for(var i=arr.length-1; i>=0; i--){
			if(arr[i]<=value){
				return i+1;
			}
		}
	}

	function shuffle(arr){
		var copyArr=arr.slice();
		var ubound=arr.length-1;
		for(var i=0; i<ubound; i++){
			var r=random(0,ubound);
			var tmp=copyArr[r];
			copyArr[r]=copyArr[i];
			copyArr[i]=tmp;
		}
		return copyArr;
	}

	// import "core-js/modules/es.array.from";
	// import "core-js/modules/es.set";
	function union() {
		var set = new Set();
		for(var i = 0; i < arguments.length; i++) {
			var arr = arguments[i];
			if(!Array.isArray(arr)) {
				arr = Array.from(arr);
			}
			var j = arr.length;
			while(j-- > 0) {
				set.add(arr[j]);
			}
		}
		return Array.from(set);
	}

	function difference(arg1) {
		if(arguments.length === 0) {
			return new Array();
		}
		var set = new Set(arg1);
		for(var i = 1; i < arguments.length; i++) {
			var arr = arguments[i];
			if(!Array.isArray(arr)) {
				arr = Array.from(arr);
			}
			var j = arr.length;
			while(j-- > 0) {
				set['delete'](arr[j]);
			}
		}
		return Array.from(set);
	}

	// import "core-js/modules/es.array.from";
	// import "core-js/modules/es.set";
	function intersection(arg1) {
		if(arguments.length === 0) {
			return new Array();
		}
		var set = new Set(arg1);
		for(var i = 1; i < arguments.length; i++) {
			var arr = arguments[i];
			if(!Array.isArray(arr)) {
				arr = Array.from(arr);
			}
			set.forEach(function(item) {
				if(arr.indexOf(item) < 0) this['delete'](item);
			}, set);
		}
		return Array.from(set);
	}

	function forOwn(obj,fn,thisArg){
		if(obj){
			thisArg=thisArg || undefined;
			var keys=Object.keys(obj);
			for(var i=0;i<keys.length;i++){
				var key=keys[i];
				if(fn.call(thisArg,obj[key],key)===false){
					return false;
				}
			}
			return true;
		}
		return false;
	}

	function forIn$1(obj,fn,thisArg){
		if(typeof obj!=="object"){
			return false;
		}
		var isJsObject=obj instanceof Object;
		for(var key in obj) {
			if(!isJsObject){
				if(key.startsWith("__") || key==="constructor"){
					continue ;
				}
			}
			if(key.startsWith("@@")){
				continue ;
			}
			if(fn.call(thisArg,obj[key],key)===false){
				return false;
			}
		}
		var i=dontEnums.length;
		var proto=getPrototypeOf(obj);
		//遍历nonEnumerableProps数组
		while(i--){
			var prop=dontEnums[i];
			if(prop in obj && obj[prop]!==proto[prop]){
				if(fn.call(thisArg,obj[prop],prop)===false){
					return false;
				}
			}
		}
		return true;
	}

	function nosymbol_forIn(obj, fn, thisArg) {
		for(var key in obj) {
			if(key.startsWith("@@")) {
				continue;
			}
			if(fn.call(thisArg, obj[key], key) === false) {
				return false;
			}
		}
		return true;
	}function symbol_forIn(obj, fn, thisArg) {
		for(var key in obj) {
			if(fn.call(thisArg, obj[key], key) === false) {
				return false;
			}
		}
		return true;
	}

	var forIn$2 = Symbol$1 ? symbol_forIn : (hasEnumBug ? forIn$1 : nosymbol_forIn);

	function pick(obj, keys) {
		var rest = {};
		if(obj) {
			var ownKeys = Object.keys(obj);
			var i = keys.length;
			while(i--) {
				var key = keys[i];
				if(ownKeys.includes(key)) {
					rest[key] = obj[key];
				}
			}
		}
		return rest;
	}

	function omit(obj, keys) {
		var rest = {};
		if(obj) {
			var ownKeys = Object.keys(obj);
			var i = ownKeys.length;
			while(i--) {
				var key = ownKeys[i];
				if(!keys.includes(key)) {
					rest[key] = obj[key];
				}
			}
		}
		return rest;
	}

	var proto = !!Object.setPrototypeOf || !!Object.prototype.__proto__;

	function inherits(subClass, superClass) {
		forIn(superClass, setKey, subClass);
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		subClass.__proto__ = superClazz.prototype;
	}function setKey(value, key) {
		this[key] = value;
	}

	// import "core-js/modules/es.object.set-prototype-of";
	// import "core-js/modules/es.object.create";
	function inherits$1(clazz,superClazz){
		Object.setPrototypeOf(clazz,superClazz);
		clazz.prototype=Object.create(superClazz.prototype);
		clazz.prototype.constructor=clazz;
	}

	var inherits$2 = proto ? inherits$1 : inherits;

	function getElementStyle(el, prop){
		if(el.currentStyle){//IE
			return el.currentStyle[prop] || el.style[prop];
		}else if(window.getComputedStyle){//非IE
			var propprop = prop.replace (/([A-Z])/g, "-$1");
			propprop = propprop.toLowerCase();
			var style=window.getComputedStyle(el,null);
			return style[prop] || style.getPropertyValue(propprop) || el.style[prop];
		}
	}

	function hasClass(obj,cls){
		if(!obj) return false;
		return obj.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	}

	function addClass(obj,cls){
		if(!hasClass(obj,cls)) obj.className=obj.className.trim()+" "+cls;
	}

	function removeClass(obj,cls){
		if(hasClass(obj,cls)){
			var reg = new RegExp('(\\s+|^)'+cls+'(\\s+|$)');
			obj.className=obj.className.replace(reg,' ');
		}
	}

	function toggleClass(obj,cls){
		if(hasClass(obj,cls)){
			var reg = new RegExp('(\\s+|^)'+cls+'(\\s+|$)');
			obj.className=obj.className.replace(reg,' ');
		}else {
			obj.className=obj.className.trim()+" "+cls;
		}
	}

	function getNextElement(element){
		var e = element.nextSibling;
		if(e == null){ return null;}
		if(e.nodeType==1){
			return e;
		}else {
			return getNextElement(e);
		}
	}

	function getPrevElement(element){
		var e = element.previousSibling;
		if(e == null){ return null;}
		if(e.nodeType==1){
			return e;
		}else {
			return getPrevElement(e);
		}
	}

	function byId(id){
		return document.getElementById(id);
	}

	function getElementsByClassName(className,e){
		e=e||document;
		if(e.getElementsByClassName){
			return Array.prototype.slice.call(e.getElementsByClassName(className));
		}
		var result=[];
		var nodes= e.getElementsByTagName("*");
		for(var i=0;i<nodes.length;i++){
			if(hasClass(nodes[i],className)){
				result.push(nodes[i]);
			}
		}
		return result;
	}

	function querySelector(selector,ancestor){
		if(!ancestor){
			ancestor=document;
		}
		if(ancestor.querySelector){
			return ancestor.querySelector(selector);
		}
		var a=querySelectorAll(selector,ancestor);
		if(a.length){
			return a[0];
		}
		return null;
	}

	function querySelectorAll$1(selector,ancestor){
		if(!ancestor){
			ancestor=document;
		}
		if(ancestor.querySelectorAll){
			return ancestor.querySelectorAll(selector);
		}
		var a=compat_querySelectorAll(selector,ancestor);
		if(a.length){
			return a[0];
		}
		return null;
	}

	function getCurrentScript(){
		var nodes=document.getElementsByTagName('SCRIPT');
		var i=nodes.length;
		while(i--){
			var node=nodes[i];
			if(node.readyState==="interactive"){
				return node;
			}
		}
		return null;
	}

	var supportStack;
	function getCurrentPathInit() {
		if(supportStack != undefined) {
			return supportStack;
		}
		document.addEventListener('load', function(e) {
			if(e.target.tagName === "SCRIPT") {
				e.target.readyState = "complete";
			}
		}, true);
		try {
			throw new Error('get stack');
		} catch(e) {
			var stackHandler = {
				'stack': [
					/^@(.*):\d+$/,// Firefox
					/^\s+at (.*):\d+:\d+$/,//Chrome
					/^\s+at [^\(]*\((.*):\d+:\d+\)$/ //IE11
				],
				'stacktrace': [
					/\(\) in\s+(.*?\:\/\/\S+)/m//opera
				]
			};
			for(var name in stackHandler) {
				var stacks = e[name];
				if(stacks) {
					var patterns = stackHandler[name];
					var stack = getLastStack(stacks);
					var i = patterns.length;
					while(i--) {
						var pattern = patterns[i];
						if(pattern.test(stack)) {
							supportStack = true;
							return true;
						}
					}
				}
			}
		}
		return false;
	}
	function getStackSupport() {
		return supportStack;
	}
	function getCurrentPathByStack() {
		try {
			throw new Error('get stack');
		} catch(e) {
			var arr = getLastStack(e[stackResult.name]).match(stackResult.pattern);
			if(arr) {
				if(arr[1] != location.href && arr[1] != location.origin + location.pathname + location.search) {
					return arr[1];
				}
			}
		}
	}
	function getLastStack(stack) {
		var stacks = stack.trim().split("\n");
		return stacks[stacks.length - 1];
	}

	function getCurrentScriptByLast() {
		var path = supportStack ? getCurrentPathByStack() : null;
		var nodes = document.getElementsByTagName('SCRIPT');
		var arr = [];
		for(var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			if(node.readyState === "complete") {
				continue;
			}
			if(node.src) {
				if(path !== new URL(node.src, location).href) {
					continue;
				}
			} else if(path) {
				continue;
			}
			arr.push(node);
		}
		nodes = null;
		if(arr.length) {
			return arr[arr.length - 1];
		}
		return null;
	}

	if('currentScript' in document) {
		exports.getCurrentScript = function() {
			return document.currentScript;
		};
	} else {
		if("readyState" in document.scripts[0]) {
			exports.getCurrentScript = getCurrentScript;
		} else {
			getCurrentPathInit();
			exports.getCurrentScript = getCurrentScriptByLast;
		}
	}

	var getCurrentPath = ('currentScript' in document || !getStackSupport()) ? function() {
		var url = new URL(exports.getCurrentScript().src, location);
		try {
			return url.href;
		} finally {
			url = null;
		}
	} : getCurrentPathByStack;

	function getScript(src,func,charset){
		var script=document.createElement('script');
		script.charset=charset || "UTF-8";
		script.src=src;
		script.async=true;
		if(func){
			var event='onreadystatechange';
			script.attachEvent(event,function(){
				if(script.readyState==='loaded'){
					document.head.appendChild(script);
				}else if(script.readyState==='complete'){
					script.detachEvent(event,arguments.callee);
					var evt=window.event;
					func.call(script,evt);
					script=null;
				}
			});
		}else {
			document.head.appendChild(script);
		}
		return script;
	}

	function getScript$1(src,func,charset){
		var script=document.createElement('script');
		script.charset=charset || "UTF-8";
		script.src=src;
		script.async=true;
		if(func){
			if('onafterscriptexecute' in script){
				script.onafterscriptexecute=func;
			}else {
				script.onload=func;
			}
		}
		document.head.appendChild(script);
		return script;
	}

	var getScript$2 = ("onload" in document.scripts[document.scripts.length - 1]) ? getScript$1 : getScript;

	function attachEvent(ele, type, func){
		switch(type){
			case "load":
				if(ele.tagName==="SCRIPT"){
					type='readystatechange';
				}
				break;
			case "wheel":
				type='mousewheel';
				break;
			case "DOMContentLoaded":
				if(ele===document){
					type='readystatechange';
					if(window===window.top){
						checkDomReady();
					}
				}
				break;
			case "input":
				type='propertychange';
				break;
			case "mouseenter":
				if(!('Screen' in window)){
					//IE低版本监视是否短时间内突然移出再进入
					ele.attachEvent( 'onmouseleave', func);
				}
				break;
		}
		ele.attachEvent( 'on'+type, func);
	}

	function checkDomReady(){
		try{
			document.documentElement.doScroll('left');
			document.readyState = "complete";
			ele.fireEvent("onreadystatechange");
		}catch(e){
			setTimeout(arguments.callee, 0);
		}
	}

	function attachEvent$1(ele, type, func, useCapture){
		switch(type){
			case "wheel":
				if(!("onwheel" in document)){
					if('onmousewheel' in document){
						type='mousewheel';
					}else {
						type='DOMMouseScroll';
					}
				}
				break;
			case "mouseenter":
				if(!('onmouseenter' in document)){
					type='mouseover';
				}
				break;
			case "mouseleave":
				if(!('onmouseleave' in document)){
					type='mouseout';
				}
				break;
		}
		ele.addEventListener(type, func, !!useCapture);
	}

	var attachEvent$2=document.addEventListener?attachEvent$1:attachEvent;

	function detachEvent(ele, type, func){
		switch(type){
			case "load":
				if(ele.tagName=="SCRIPT"){
					type='readystatechange';
				}
				break;
			case "wheel":
				type='mousewheel';
				break;
			case "DOMContentLoaded":
				if(ele===document){
					type='readystatechange';
				}
				break;
			case "input":
				type='propertychange';
				break;
			case "mouseenter":
				if(!('Screen' in window)){
					//IE低版本监视是否短时间内突然移出再进入
					ele.detachEvent( 'onmouseleave', func);
				}
				break;
		}
		ele.detachEvent('on'+type, func);
	}

	function detachEvent$1(ele, type, func, useCapture){
		switch(type){
			case "wheel":
				if(!("onwheel" in document)){
					if('onmousewheel' in document){
						type='mousewheel';
					}else {
						type='DOMMouseScroll';
					}
				}
				break;
			case "mouseenter":
				if(!('onmouseenter' in document)){
					type='mouseover';
				}
				break;
			case "mouseleave":
				if(!('onmouseleave' in document)){
					type='mouseout';
				}
				break;
		}
		ele.removeEventListener(type, func, !!useCapture);
	}

	var detachEvent$2=document.addEventListener?detachEvent$1:detachEvent;

	function fixEvent(ele,type,e){
		e=e || window.event;
		var target=e.target=e.srcElement;
		e.stopPropagation=stopPropagation;
		e.preventDefault=preventDefault;
		e.currentTarget=ele;
		switch(type){
			case 'load':
				if(target.tagName==='SCRIPT'){
					if(target.readyState==='complete' || e.polyfill){
						return e;
					}
				}
				break;
			case "DOMContentLoaded":
				if(ele===document){
					if(document.readyState === "complete" || e.polyfill) {
						return e;
					}
				}
				break;
			case 'input':
				if(e.propertyName==='value'){
					if(!target.disabled && !target.readOnly || e.polyfill){
						return e;
					}
				}
				break;
			case 'mouseenter':
				if(type===e.type){
					if(e.polyfill){
						return e;
					}
					e.relatedTarget=e.fromElement;
					if(!('Screen' in window)){
						//IE低版本需要判断是否短时间内突然移出再进入
						if(Date.now()-150<target.lastMouseLeave){
							//间隔时间过短，排除
							break;
						}
					}
					return e;
				}else {
					//mouseleave
					target.lastMouseLeave=Date.now();
					break;
				}
			case 'mouseleave':
				if(e.polyfill){
					return e;
				}
				if('Screen' in window){
					e.relatedTarget=e.toElement;
					return e;
				}
				//IE低版本需要延迟运行
				triggerMouseLeave(target,e);
				break;
			default:
				if(!e.polyfill) return e;
		}
		throw new Error();
	}
	function stopPropagation(){
		this.cancelBubble=true;
	}
	function preventDefault(){
		if(this.cancelable===false){
			throw new Error("cancelable:false");
		}
		this.defaultPrevented=true;
		this.returnValue=false;
	}
	function triggerMouseLeave(ele,e){
		var event = document.createEventObject();
		event.polyfill=true;
		event.type=e.type;
		event.relatedTarget=e.toElement;
		event.currentTarget=e.currentTarget;
		event.target=e.target;
		event.clientX=e.clientX;
		event.clientY=e.clientY;
		event.offsetX=e.offsetX;
		event.offsetY=e.offsetY;
		event.x=e.x;
		event.y=e.y;
		event.stopPropagation=stopPropagation;
		event.preventDefault=preventDefault;
		var t=setTimeout(function(){
			ele.fireEvent("onmouseleave",event);
			ele.detachEvent('onmouseenter',onenter);
			ele.lastMouseLeave=0;
		},50);
		var onenter=function(){
			clearTimeout(t);
		};
		ele.attachEvent('onmouseenter',onenter);
	}

	function fixEvent$1(ele,type,e){
		var related;
		switch(type){
			case 'wheel':
				if(e.type==='DOMMouseScroll'){
					e.wheelDelta=-e.detail*40;
				}
				return e;
			case 'mouseenter':
				if(e.type==='mouseover'){
					if(e.polyfill){
						return e;
					}
					ele=e.currentTarget;
					related=e.relatedTarget;
					if(e.target===ele && related!==ele && !ele.contains(related)){
						return e;
					}
				}else {
					return e;
				}
				break;
			case 'mouseleave':
				if(e.type==='mouseout'){
					if(e.polyfill){
						return e;
					}
					ele=e.currentTarget;
					related=e.relatedTarget;
					if(e.target===ele && related!==ele && !ele.contains(related) ){
						return e;
					}
				}else {
					return e;
				}
				break;
			default:
				if(!e.polyfill) return e;
		}
		throw new Error();
	}

	var fixEvent$2=document.addEventListener?fixEvent$1:fixEvent;

	function trigger(ele, type, props) {
		switch(type){
			case 'load':
			case 'wheel':
			case 'input':
				break;
			default:
				if(!props) {
					return ele.fireEvent("on" + type);
				}
		}
		var e = document.createEventObject();
		switch(type){
			case 'load':
				if(ele.tagName=="SCRIPT"){
					e.polyfill=true;
					ele.fireEvent("onreadystatechange",e);
					return;
				}
				break;
			case 'wheel':
				type='mousewheel';
				break;
			case "DOMContentLoaded":
				if(ele===document){
					e.polyfill=true;
					ele.fireEvent("onreadystatechange",e);
					return;
				}
				break;
			case 'input':
				e.propertyName='value';
				e.polyfill=true;
				ele.fireEvent("onpropertychange",e);
				return;
		}
		if(props) {
			for(var key in props){
				e[key]=props[key];
			}
		}
		ele.fireEvent("on" + type, e);
	}

	var notCapture = ["load", "unload", "scroll", "resize", "blur", "focus", "mouseenter", "mouseleave", "input", "propertychange"];
	function trigger$1(ele, type, props) {
		var e = document.createEvent('Event');
		switch(type){
			case "mouseenter":
				if(!('onmouseenter' in document)){
					type='mouseover';
					e.polyfill=true;
				}
				break;
			case "mouseleave":
				if(!('onmouseleave' in document)){
					type='mouseout';
					e.polyfill=true;
				}
				break;
		}
		var bubbles = notCapture.indexOf(type)<0;
		var cancelable = true;
		if(props) {
			for(var key in props){
				switch(key){
					case 'bubbles':
						bubbles = props.bubbles;
						break ;
					case 'cancelable':
						cancelable = props.cancelable;
						break ;
					default :
						e[key]=props[key];
				}
			}
		}
		e.initEvent(type, bubbles, cancelable);
		return ele.dispatchEvent(e);
	}

	var trigger$2=document.addEventListener?trigger$1:trigger;

	var isArray$1=Array.isArray;

	exports.addClass = addClass;
	exports.attachEvent = attachEvent$2;
	exports.byId = byId;
	exports.detachEvent = detachEvent$2;
	exports.difference = difference;
	exports.escape = escape;
	exports.escapeAttribute = escapeAttribute;
	exports.escapeHtml = escapeHtml;
	exports.escapeRegExp = escapeRegExp;
	exports.escapeString = escapeString;
	exports.find = find;
	exports.findIndex = findIndex;
	exports.findLast = findLast;
	exports.findLastIndex = findLastIndex;
	exports.fixEvent = fixEvent$2;
	exports.forIn = forIn$2;
	exports.forOwn = forOwn;
	exports.getCookie = getCookie;
	exports.getCurrentPath = getCurrentPath;
	exports.getElementStyle = getElementStyle;
	exports.getElementsByClassName = getElementsByClassName;
	exports.getNextElement = getNextElement;
	exports.getPrevElement = getPrevElement;
	exports.getScript = getScript$2;
	exports.hasClass = hasClass;
	exports.inherits = inherits$2;
	exports.intersection = intersection;
	exports.isArray = isArray$1;
	exports.isArrayLike = isArrayLike;
	exports.isArrayLikeObject = isArrayLikeObject;
	exports.isDate = isDate;
	exports.isDefined = isDefined;
	exports.isDocument = isDocument;
	exports.isElement = isElement;
	exports.isFunction = isFunction;
	exports.isInput = isInput;
	exports.isNumber = isNumber;
	exports.isNumeric = isNumeric;
	exports.isObject = isObject;
	exports.isPlainObject = isPlainObject;
	exports.isRegExp = isRegExp;
	exports.isString = isString;
	exports.isWindow = isWindow$1;
	exports.noop = noop;
	exports.omit = omit;
	exports.overload = overload;
	exports.pick = pick;
	exports.pluck = pluck;
	exports.querySelector = querySelector;
	exports.querySelectorAll = querySelectorAll$1;
	exports.random = random;
	exports.removeClass = removeClass;
	exports.replaceAll = replaceAll;
	exports.setCookie = setCookie;
	exports.shuffle = shuffle;
	exports.sortBy = sortBy;
	exports.sortedIndex = sortedIndex;
	exports.sortedLastIndex = sortedLastIndex;
	exports.times = times;
	exports.toString = toString;
	exports.toggleClass = toggleClass;
	exports.trigger = trigger$2;
	exports.unescape = unescape;
	exports.union = union;

	return exports;

}({}));
