import "sky-core/polyfill/globalThis";

import "sky-core/polyfill/Array/prototype/slice";
import "sky-core/polyfill/Array/prototype/splice";

import "sky-core/polyfill/Number/prototype/toFixed";
// import "sky-core/polyfill/Number/prototype/toPrecision";

import "sky-core/polyfill/Date/constructor";
import "sky-core/polyfill/Date/prototype/toJSON";
import "sky-core/polyfill/Date/prototype/toISOString";
import "sky-core/polyfill/Date/prototype/toLocaleFormat";
import "sky-core/polyfill/Date/prototype/toLocaleString";
import "sky-core/polyfill/Date/prototype/toLocaleDateString";
import "sky-core/polyfill/Date/prototype/toLocaleTimeString";

import "sky-core/polyfill/localStorage";
import "sky-core/polyfill/sessionStorage";
import "sky-core/polyfill/JSON";
import "sky-core/polyfill/console";
import "sky-core/polyfill/DOMException";
import "sky-core/polyfill/Event";

/* ES5 */
import "sky-core/polyfill/Array/prototype/indexOf";
import "sky-core/polyfill/Array/prototype/lastIndexOf";
import "sky-core/polyfill/Array/prototype/forEach";
import "sky-core/polyfill/Array/prototype/filter";
import "sky-core/polyfill/Array/prototype/map";
import "sky-core/polyfill/Array/prototype/some";
import "sky-core/polyfill/Array/prototype/every";

/* Web Old */
import "sky-core/polyfill/document/head";
import "sky-core/polyfill/document/baseURI";
import "sky-core/polyfill/document/scripts";
import "sky-core/polyfill/document/contains";
import "sky-core/polyfill/Element/prototype/children";
import "sky-core/polyfill/Element/prototype/contains";
import "sky-core/polyfill/Element/prototype/innerText";

// IE8+ Chrome4+ Safari4+ Firfox3.5+ Opera11.5+
import "sky-core/polyfill/Date/now";
/* IE9+ Firefox4+ Safari5+ Opera11.5+ */
import "sky-core/polyfill/Array/isArray";

/* IE10+ */
// setTimeout、setInterval 应当通过构建手段注入
// import "sky-core/polyfill/setTimeout";
// import "sky-core/polyfill/setInterval";

/* IE9+ Firefox3+ Safari4+ Opera11.5+ */
import "sky-core/polyfill/Array/prototype/reduce";
import "sky-core/polyfill/Array/prototype/reduceRight";

/* IE10+ Firefox3.5+ Safari5+ Opera11.5+ */
import "sky-core/polyfill/String/prototype/trim";

/* IE9+ Firefox3.5+ Safari5+ Opera12.1+ */
import "sky-core/polyfill/Object/getPrototypeOf";
/* IE9+ Firefox4+ Safari5+ Opera12.5+ */
import "sky-core/polyfill/Object/create";
/* IE9+ Firefox4+ Safari5+ Opera12.1+ */
import "sky-core/polyfill/Object/keys";
/* IE9+ Firefox4+ Safari5+ Opera12.1+ */
import "sky-core/polyfill/Object/defineProperty";
/* IE9+ Firefox4+ Safari5+ Opera12.1+ */
import "sky-core/polyfill/Object/getOwnPropertyDescriptor";
/* IE9+ Firefox4+ Safari5+ Opera12.1+ */
import "sky-core/polyfill/Object/getOwnPropertyNames";
/* IE9+ Firefox4+ Safari5.1+ Opera12.1+ */
import "sky-core/polyfill/Object/defineProperties";

/* IE11+ Firefox4+ Chrome7+ Safari5.1+ Opera12.1+ */
import "sky-core/polyfill/Function/prototype/bind";

/** ES2015 */
/* IE9+ Firefox4+ Safari5+ Opera11.5+ */
import "sky-core/polyfill/Array/isArray";
/* IE11+ Chrome34+ Firefox31+ Safari9+ Opera12.1+ */
import "sky-core/polyfill/Object/setPrototypeOf";
/* Edge12+ Chrome19 Firefox22+ Safari9+ */
import "sky-core/polyfill/Object/is";

/* Edge12+ Chrome32 Firefox27+ Safari7+ */
import "sky-core/polyfill/Promise";

/* Edge12+ Chrome19+ Firefox16+ Safari9+ */
import "sky-core/polyfill/Number/isNaN";
import "sky-core/polyfill/Number/isFinite";
/* Edge12+ Chrome34+ Firefox16+ Safari9+ */
import "sky-core/polyfill/Number/isInteger";
/* Edge12+ Chrome34+ Firefox25+ Safari9+ */
import "sky-core/polyfill/Number/EPSILON";
import "sky-core/polyfill/Number/parseFloat";
import "sky-core/polyfill/Number/parseInt";
/* Edge12+ Chrome34+ Firefox31+ Safari9+ */
import "sky-core/polyfill/Number/isSafeInteger";
/* Edge12+ Chrome34+ Firefox32+ Safari9+ */
import "sky-core/polyfill/Number/MAX_SAFE_INTEGER";
import "sky-core/polyfill/Number/MIN_SAFE_INTEGER";

/* IE11+ Chrome36 Firefox6+ Safari8+ */
import "sky-core/polyfill/WeakMap";
/* IE11+ Chrome36 Firefox34+ Safari9+ */
import "sky-core/polyfill/WeakSet";

/* IE11+ Chrome38 Firefox13+ Safari8+ */
import "sky-core/polyfill/Map";
/* IE11+ Chrome38 Firefox13+ Safari8+ */
import "sky-core/polyfill/Set";

/* Edge12+ Chrome38 Firefox17+ Safari9+ */
import "sky-core/polyfill/String/prototype/@@iterator";
/* Edge12+ Chrome38 Firefox17+ Safari10+ */
import "sky-core/polyfill/Array/prototype/@@iterator";
/* Edge12+ Chrome38 Firefox36+ Safari9+ */
import "sky-core/polyfill/Symbol";
import "sky-core/polyfill/Object/getOwnPropertySymbols";

/* Edge15+ Chrome41 Firefox17+ Safari9+ */
import "sky-core/polyfill/String/prototype/startsWith";
import "sky-core/polyfill/String/prototype/endsWith";
/* Edge12+ Chrome41 Firefox24+ Safari9+ */
import "sky-core/polyfill/String/prototype/repeat";
/* Edge12+ Chrome41 Firefox29+ Safari9+ */
import "sky-core/polyfill/String/prototype/codePointAt";
import "sky-core/polyfill/String/fromCodePoint";
/* Edge12+ Chrome41 Firefox34+ Safari9+ */
import "sky-core/polyfill/String/raw";
/* Edge12+ Chrome41 Firefox40+ Safari9+ */
import "sky-core/polyfill/String/prototype/includes";

/* Edge12+ Chrome40 Firefox36+ Safari9+ */
import "sky-core/polyfill/Symbol/for";
import "sky-core/polyfill/Symbol/keyFor";

/* Edge12+ Chrome45 Firefox25+ Safari7.1+ */
import "sky-core/polyfill/Array/prototype/findIndex";
import "sky-core/polyfill/Array/prototype/find";
/* Edge12+ Chrome45 Firefox25+ Safari9+ */
import "sky-core/polyfill/Array/of";
/* Edge12+ Chrome45 Firefox31+ Safari8+ */
import "sky-core/polyfill/Array/prototype/fill";
/* Edge12+ Chrome45 Firefox32+ Safari9+ */
import "sky-core/polyfill/Array/from";
/* Edge12+ Chrome45 Firefox32+ Safari9+ */
import "sky-core/polyfill/Array/prototype/copyWithin";

/* Edge12+ Chrome45 Firefox34+ Safari9+ */
import "sky-core/polyfill/Object/assign";

/* Edge12+ Chrome49 Firefox42+ Safari12+ */
import "sky-core/polyfill/Reflect/apply";
import "sky-core/polyfill/Reflect/construct";
import "sky-core/polyfill/Reflect/defineProperty";
import "sky-core/polyfill/Reflect/deleteProperty";
import "sky-core/polyfill/Reflect/get";
import "sky-core/polyfill/Reflect/getOwnPropertyDescriptor";
import "sky-core/polyfill/Reflect/getPrototypeOf";
import "sky-core/polyfill/Reflect/set";

/* ES2016 */
/* Chrome47 Firefox43+ Safari9+ Edge14+ */
import "sky-core/polyfill/Array/prototype/includes";

/* Web URL */
/* Chrome51+ Firefox31+ */
import "sky-core/polyfill/URLSearchParams";
import "sky-core/polyfill/URL";
import "sky-core/polyfill/location";

/* ES2017 */
/* Chrome54+ Firefox47+ Safari10.1+ Edge14+ */
import "sky-core/polyfill/Object/entries";
import "sky-core/polyfill/Object/values";
/* Chrome54+ Firefox50+ Safari10+ Edge15+ */
import "sky-core/polyfill/Object/getOwnPropertyDescriptors";
/* Chrome57+ Firefox40+ Safari9+ Edge15+ */
import "sky-core/polyfill/String/prototype/padStart";
import "sky-core/polyfill/String/prototype/padEnd";
/* Edge14+ Chrome66+ Firefox66+ Safari9 */
import "sky-core/polyfill/Array/prototype/values";

/* ==================== module ==================== */
/* ES2018 */
/* Chrome63+ Firefox57+ Safari11.1+ */
// import "./es/es.symbol.async-iterator";
/* Chrome63+ Firefox58+ Safari11.1+ Edge18+ */
import "sky-core/polyfill/Promise/prototype/finally";

/* Web AbortSignal */
/* Chrome66+ Firefox57+ Safari12.1+ Edge16+ */
import "sky-core/polyfill/AbortController";
import "sky-core/polyfill/AbortSignal";

/* Web fetch */
/* Chrome42 Firefox39+ Safari10.1+ Edge14+ */
import "sky-core/polyfill/Headers";
import "sky-core/polyfill/Response";
import "sky-core/polyfill/Request";
import "sky-core/polyfill/fetch";

/* ES2019 */
/* Chrome66+ Firefox61+ Safari12+ */
import "sky-core/polyfill/String/prototype/trimStart";
import "sky-core/polyfill/String/prototype/trimEnd";
/* Chrome69+ Firefox62+ Safari12+*/
import "sky-core/polyfill/Array/prototype/flat";
import "sky-core/polyfill/Array/prototype/flatMap";
/* Chrome70+ Firefox63+ Safari12+*/
// import "sky-core/polyfill/Symbol/prototype/description";
/* Chrome73+ Firefox63+ Safari12.1+ */
import "sky-core/polyfill/Object/fromEntries";

/* ES2020 */
/* Chrome71+ Firefox65+ Safari12.1+*/
import "sky-core/polyfill/globalThis";
/* Chrome73+ Firefox67+ Safari13+*/
import "sky-core/polyfill/String/prototype/matchAll";
/* Chrome76+ Firefox71+ Safari13+*/
import "sky-core/polyfill/Promise/allSettled";

/* ES2021 */
/* Chrome84+ Firefox79+ Safari14.1+*/
/* WeakRef FinalizationRegistry */
/* Intl */
/* Chrome85+ Firefox77+ Safari13.1+*/
import "sky-core/polyfill/String/prototype/replaceAll";
/* Chrome85+ Firefox79+ Safari14+*/
import "sky-core/polyfill/Promise/any";
import "sky-core/polyfill/AggregateError";
/* ES2022 */
/* Chrome92+ Firefox90+ Safari15.4+*/
import "sky-core/polyfill/Array/prototype/at";
import "sky-core/polyfill/String/prototype/at";
/* Chrome93+ Firefox92+ Safari15.4+*/
import "sky-core/polyfill/Object/hasOwn";
/* ES2023 */
/* Chrome97+ Firefox104+ Safari15.4+*/
import "sky-core/polyfill/Array/prototype/findLastIndex";
import "sky-core/polyfill/Array/prototype/findLast";
/* Chrome98+ Firefox94+ Safari15.4+*/
import "sky-core/polyfill/structuredClone";
/* Chrome110+ Firefox115+ Safari16+*/
import "sky-core/polyfill/Array/prototype/toReversed";
import "sky-core/polyfill/Array/prototype/toSorted";
import "sky-core/polyfill/Array/prototype/toSpliced";
import "sky-core/polyfill/Array/prototype/with";
/* ES2024 */
/* Chrome111+ Firefox119+ Safari16.4+ */
import "sky-core/polyfill/String/prototype/isWellFormed";
import "sky-core/polyfill/String/prototype/toWellFormed";
/* Chrome117+ Firefox119+ Safari17.4+ */
import "sky-core/polyfill/Object/groupBy";
import "sky-core/polyfill/Map/groupBy";
/* Chrome119+ Firefox121+ Safari17.4+ */
import "sky-core/polyfill/Promise/withResolvers";

