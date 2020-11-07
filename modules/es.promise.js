import "core-js/modules/es.global-this";
import "core-js/modules/es.symbol";
import "core-js/modules/es.array.is-array";
import "core-js/modules/es.array.for-each";
import "core-js/modules/web.queue-microtask";
import {noop} from "../utils/noop";
var PENDING=Symbol("pending");
var RESOLVED=Symbol("resolved");
var REJECTED=Symbol("rejected");
if(!globalThis.Promise){
	globalThis.Promise=(function(){
		function Promise(executor){
			this._resolveds=[];
			this._rejecteds=[];
			this._state=PENDING;//resolved | rejected
			
			var me=this;
			function resolve(value) {
				queueMicrotask(function(){
					if(me._state===PENDING){
						me.data=value;
						me._state=RESOLVED;
						me._resolveds.forEach(callAll,me);
						me._resolveds=null;
					}
				});
			}
			function reject(reason) {
				queueMicrotask(function(){
					if(me._state===PENDING){
						me.data=reason;
						me._state=REJECTED;
						me._rejecteds.forEach(callAll,me);
						me._rejecteds=null;
					}
				});
			}
			try{
				executor(resolve, reject);
			}catch(e){
				reject(e);
			}
		}
		function callAll(fn){
			fn.call(this,this.data);
		}
		function nextPromise(before,after,resolve,reject){
			return function(value){
				try{
					var x=before(value);
					if(x && (typeof x.then==="function")){
						x.then(resolve, reject);
					}else{
						after(x);
					}
				}catch(r){
					reject(r);
				}
			};
		}
		Promise.prototype.then=function(onResolved, onRejected){
			var me=this;
			onResolved=onResolved || noop;
			onRejected=onRejected || noop;
			return new Promise(function(resolve,reject){
				switch(me._state){
					case RESOLVED:
						queueMicrotask(nextPromise(onResolved,resolve,resolve,reject),me.data);
						break ;
					case REJECTED:
						queueMicrotask(nextPromise(onRejected,reject,resolve,reject),me.data);
						break ;
					default:
						me._resolveds.push(nextPromise(onResolved,resolve,resolve,reject));
						me._rejecteds.push(nextPromise(onRejected,reject,resolve,reject));
				}
			});
		};
		Promise.prototype['catch']=function(onRejected){
			return this.then(undefined,onRejected);
		};
		Promise.all=function(promises){
			if (!Array.isArray(promises)) {
				throw new TypeError('You must pass an array to all.');
			}
			return new Promise(function(resolve,reject){
				if(promises.length==0) return resolve(new Array());
				var result=new Array(promises.length);
				var c=0;
				promises.forEach(function(one,index){
					if(typeof one.then==="function"){
						one.then(function(data){
							c++;
							result[index]=data;
							if(c>=promises.length){
								resolve(result);
							}
						},function(data){
							reject(data);
						});
					}else{
						c++;
						result[index]=one;
						if(c>=promises.length){
							resolve(result);
						}
					}
				});
			});
		};
		Promise.race=function(promises){
			if (!Array.isArray(promises)) {
				throw new TypeError('You must pass an array to all.');
			}
			return new Promise(function(resolve,reject){
				promises.forEach(function(one){
					one.then(function(){
						resolve();
					},function(){
						reject();
					});
				});
			});
		};
		Promise.resolve=function(arg){
			return new Promise(function(resolve,reject){
				resolve(arg)
			});
		};
		Promise.reject=function(arg){
			return Promise(function(resolve,reject){
				reject(arg)
			});
		};
		return Promise;
	})();
}