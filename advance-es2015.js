// breaking change
// import "sky-core/polyfill/Number/prototype/toFixed";
//Date
//toLocaleFormat 这个只有火狐支持，非标准
// import "sky-core/polyfill/Date/prototype/toLocaleFormat";
// import "sky-core/polyfill/Date/prototype/toISOString";
// import "sky-core/polyfill/Date/prototype/toJSON";
//ES5 Function
// import "sky-core/polyfill/Function/prototype/bind";
// import "sky-core/polyfill/Function/prototype/name";
//ES5 Array
// import "sky-core/polyfill/Array/prototype/every";
// import "sky-core/polyfill/Array/prototype/filter";
// import "sky-core/polyfill/Array/prototype/forEach";
// import "sky-core/polyfill/Array/prototype/indexOf";
// import "sky-core/polyfill/Array/prototype/lastIndexOf";
// import "sky-core/polyfill/Array/prototype/map";
// import "sky-core/polyfill/Array/prototype/reduce";
// import "sky-core/polyfill/Array/prototype/reduceRight";
// import "sky-core/polyfill/Array/prototype/some";

//ES6 Array
// import "sky-core/polyfill/Array/prototype/copyWithin";
// import "sky-core/polyfill/Array/prototype/fill";
// import "sky-core/polyfill/Array/prototype/find";
// import "sky-core/polyfill/Array/prototype/findIndex";
// import "sky-core/polyfill/Array/prototype/entries";
// import "sky-core/polyfill/Array/prototype/keys";
// import "sky-core/polyfill/Array/prototype/values";
//ES2016 Array
import "sky-core/polyfill/Array/prototype/includes";
//ES2019 Array
import "sky-core/polyfill/Array/prototype/flat";
import "sky-core/polyfill/Array/prototype/flatMap";
//ES5 String
// import "sky-core/polyfill/String/prototype/trim";
//ES6 String
// import "sky-core/polyfill/String/prototype/includes";
// import "sky-core/polyfill/String/prototype/startsWith";
// import "sky-core/polyfill/String/prototype/endsWith";
// import "sky-core/polyfill/String/prototype/repeat";
// import "sky-core/polyfill/String/prototype/codePointAt";
//ES2017.String
import "sky-core/polyfill/String/prototype/padStart";
import "sky-core/polyfill/String/prototype/padEnd";
//ES2019.String
import "sky-core/polyfill/String/prototype/trimStart";
import "sky-core/polyfill/String/prototype/trimEnd";
import "sky-core/polyfill/String/prototype/trimLeft";
import "sky-core/polyfill/String/prototype/trimRight";
//ES2020.String
import "sky-core/polyfill/String/prototype/matchAll";
//ESNext.String
import "sky-core/polyfill/String/prototype/replaceAll";





// breaking change
// import "sky-core/polyfill/parseInt";

// import "sky-core/polyfill/Date/prototype/toJSON";
// Date
// import "sky-core/polyfill/Date/now";
// import "sky-core/polyfill/Date/constructor";
// import "sky-core/polyfill/Date/parse";

import "sky-core/polyfill/globalThis";
// import "sky-core/polyfill/Symbol/for";
// import "sky-core/polyfill/Symbol/keyFor";
// import "sky-core/polyfill/Function/prototype/@@hasInstance";
// "Symbol.iterator": [
// 	"sky-core/polyfill/Array/prototype/@@iterator",
// 	"sky-core/polyfill/String/prototype/@@iterator"
// ],
// import "sky-core/polyfill/Symbol";
// import "sky-core/polyfill/Array/from";
// import "sky-core/polyfill/Array/prototype/@@iterator";
// import "sky-core/polyfill/String/prototype/@@iterator";
// import "sky-core/polyfill/Array/isArray";
// import "sky-core/polyfill/Array/of";
// Math
import "sky-core/polyfill/Math/acosh";
import "sky-core/polyfill/Math/asinh";
import "sky-core/polyfill/Math/atanh";
import "sky-core/polyfill/Math/cbrt";
import "sky-core/polyfill/Math/clz32";
import "sky-core/polyfill/Math/cosh";
import "sky-core/polyfill/Math/expm1";
import "sky-core/polyfill/Math/fround";
import "sky-core/polyfill/Math/hypot";
import "sky-core/polyfill/Math/imul";
import "sky-core/polyfill/Math/log1p";
import "sky-core/polyfill/Math/log2";
import "sky-core/polyfill/Math/log10";
import "sky-core/polyfill/Math/sign";
import "sky-core/polyfill/Math/sinh";
import "sky-core/polyfill/Math/tanh";
import "sky-core/polyfill/Math/trunc";
//如果，需要解析第三方或其他不安全的json，需要使用其他JSON解析库
//import "JSON";
//ES2015.Core Number
// import "sky-core/polyfill/Number/EPSILON";
// import "sky-core/polyfill/Number/isFinite";
// import "sky-core/polyfill/Number/isInteger";
// import "sky-core/polyfill/Number/isNaN";
// import "sky-core/polyfill/Number/isSafeInteger";
// import "sky-core/polyfill/Number/MAX_SAFE_INTEGER";
// import "sky-core/polyfill/Number/MIN_SAFE_INTEGER";
// import "sky-core/polyfill/Number/parseFloat";
// import "sky-core/polyfill/Number/parseInt";
// Object 遍历
// import "sky-core/polyfill/Object/assign";
// import "sky-core/polyfill/Object/keys";
// import "sky-core/polyfill/Object/values";
// import "sky-core/polyfill/Object/entries";
// import "sky-core/polyfill/Object/fromEntries";
// import "sky-core/polyfill/Object/getOwnPropertySymbols";
// Object property
//由于ES3不支持 accessor，但是许多工具会生成defineProperty，且defineProperty不能判断是否支持支持accessor，可以污染全局的Object
// 使用前应使用sham判断
// import "sky-core/polyfill/Object/defineProperty";
// 使用前应使用sham判断
// import "sky-core/polyfill/Object/defineProperties";
// import "sky-core/polyfill/Object/getOwnPropertyDescriptor";
// import "sky-core/polyfill/Object/getOwnPropertyDescriptors";
// import "sky-core/polyfill/Object/getOwnPropertyNames";
//Object 原型相关
// import "sky-core/polyfill/Object/create";
// import "sky-core/polyfill/Object/getPrototypeOf";
// import "sky-core/polyfill/Object/setPrototypeOf";
//Object 动态相关
// import "sky-core/polyfill/Object/preventExtensions";
// import "sky-core/polyfill/Object/seal";
// import "sky-core/polyfill/Object/freeze";
// import "sky-core/polyfill/Object/isExtensible";
// import "sky-core/polyfill/Object/isSealed";
// import "sky-core/polyfill/Object/isFrozen";
// import "sky-core/polyfill/Object/is";
//Reflect
// import "sky-core/polyfill/Reflect/apply";
// import "sky-core/polyfill/Reflect/construct";
// import "sky-core/polyfill/Reflect/defineProperty";
// import "sky-core/polyfill/Reflect/deleteProperty";
// import "sky-core/polyfill/Reflect/get";
// import "sky-core/polyfill/Reflect/set";
// import "sky-core/polyfill/Reflect/getOwnPropertyDescriptor";
// import "sky-core/polyfill/Reflect/getPrototypeOf";
//Promise
// import "sky-core/polyfill/Promise";
// import "sky-core/polyfill/Promise/prototype/finally";
// ESNext.Promise
// import "sky-core/polyfill/Promise/allSettled";
// import "sky-core/polyfill/Promise/any";
// "AggregateError":"sky-core/polyfill/AggregateError",
// import "sky-core/polyfill/queueMicrotask";
//ES2015.String
// import "sky-core/polyfill/String/fromCodePoint";
// import "sky-core/polyfill/String/raw";
// //ES2015.Collection
// import "sky-core/polyfill/Map";
// import "sky-core/polyfill/Set";
// import "sky-core/polyfill/WeakMap";
// import "sky-core/polyfill/WeakSet";
//URL 这个polyfil支持accessor，但不支持自动转string和JSON，需要用.href获取
// import "sky-core/polyfill/URL";
// import "sky-core/polyfill/URLSearchParams";

// import "sky-core/polyfill/location";
// import "sky-core/polyfill/document/head";
// import "sky-core/polyfill/document/contains";
// import "sky-core/polyfill/document/scripts";
// import "sky-core/polyfill/console";
//这个实现基于IE的userData功能，只在同目录的HTML有效，如果需要html跨目录，要使用flash版的polyfill
// import "sky-core/polyfill/localStorage";
// import "sky-core/polyfill/sessionStorage";
// 'Event': "sky-core/polyfill/Event",


export var isArray = Array.isArray;
export { isDate } from "sky-core/utils/isDate";
export { isRegExp } from "sky-core/utils/isRegExp";
export { isString } from "sky-core/utils/isString";
export { isFunction } from "sky-core/utils/isFunction";
export { isNumber } from "sky-core/utils/isNumber";
export { isObject } from "sky-core/utils/isObject";
export { isDefined } from "sky-core/utils/isDefined";
export { isWindow } from "sky-core/utils/isWindow";
export { isPlainObject } from "sky-core/utils/isPlainObject";
export { isNotNullObject } from "sky-core/utils/isNotNullObject";
export { isArrayLike } from "sky-core/utils/isArrayLike";
export { isArrayLikeObject } from "sky-core/utils/isArrayLikeObject";
export { isNumeric } from "sky-core/utils/isNumeric";
export { isElement } from "sky-core/utils/isElement";
export { isInput } from "sky-core/utils/isInput";
export { isDocument } from "sky-core/utils/isDocument";

export { anObject } from "sky-core/utils/anObject";
export { aFunction } from "sky-core/utils/aFunction";

export { noop } from "sky-core/utils/noop";
export { times } from "sky-core/utils/times";

export { random } from "sky-core/utils/random";

export { escapeString } from "sky-core/utils/escapeString";
export { escapeHtml } from "sky-core/utils/escapeHtml";
export { escapeAttribute } from "sky-core/utils/escapeAttribute";
export { escape } from "sky-core/utils/escape";
export { unescape } from "sky-core/utils/unescape";
export { escapeRegExp } from "sky-core/utils/escapeRegExp";
export { replaceAll } from "sky-core/utils/replaceAll";
export { toString } from "sky-core/utils/toString";

export { findIndex } from "sky-core/utils/findIndex";
export { findLastIndex } from "sky-core/utils/findLastIndex";
export { findLast } from "sky-core/utils/findLast";
export { find } from "sky-core/utils/find";
export { sortBy } from "sky-core/utils/sortBy";
export { pluck } from "sky-core/utils/pluck";
export { sortedIndex } from "sky-core/utils/sortedIndex";
export { sortedLastIndex } from "sky-core/utils/sortedLastIndex";
export { shuffle } from "sky-core/utils/shuffle";
export { union } from "sky-core/utils/union";
export { difference } from "sky-core/utils/difference";
export { intersection } from "sky-core/utils/intersection";

export { forOwn } from "sky-core/utils/forOwn";
export { forIn } from "sky-core/utils/forIn";
export { pick } from "sky-core/utils/pick";
export { omit } from "sky-core/utils/omit";
export { inherits } from "sky-core/utils/inherits";

export { attachEvent } from "sky-core/utils/attachEvent";
export { detachEvent } from "sky-core/utils/detachEvent";
export { fixEvent } from "sky-core/utils/fixEvent";
export { fireEvent } from "sky-core/utils/fireEvent";

export { getCookie } from "sky-core/utils/getCookie";
export { setCookie } from "sky-core/utils/setCookie";

export { getScript } from "sky-core/utils/getScript";

export { default as Symbol } from "sky-core/pure/Symbol";
export { default as iterator } from "sky-core/pure/Symbol/iterator";
export { default as hasInstance } from "sky-core/pure/Symbol/hasInstance";