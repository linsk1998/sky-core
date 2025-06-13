import "./helpers/qunit-helpers";

import "./es/es.array.slice";
import "./es/es.array.splice";

import "./es/es.number.to-fixed";
import "./es/es.number.to-precision";

import "./es/es.date.to-json";
import "./es/es.date.to-iso-string";
import "./es/es.date.to-string";

/* ES5 */
import "./es/es.array.index-of";
import "./es/es.array.last-index-of";
import "./es/es.array.for-each";
import "./es/es.array.filter";
import "./es/es.array.map";
import "./es/es.array.some";
import "./es/es.array.every";

/* IE10+ */
import "./web/web.timers";

/* IE9+ Firefox3+ Safari4+ Opera11.5+ */
import "./es/es.array.reduce";
import "./es/es.array.reduce-right";

/* IE10+ Firefox3.5+ Safari5+ Opera11.5+ */
import "./es/es.string.trim";
/* Edge12+ Firefox3.5+ Safari12+ */
/* trim-left trim-right */

/* IE9+ Firefox3.5+ Safari5+ Opera12.1+ */
import "./es/es.object.get-prototype-of";
/* IE9+ Firefox4+ Safari5+ Opera12.5+ */
import "./es/es.object.create";

/* IE9+ Firefox4+ Safari5+ Opera12.1+ */
import "./es/es.object.keys";
/* IE9+ Firefox4+ Safari5+ Opera12.1+ */
import "./es/es.object.define-property";
/* IE9+ Firefox4+ Safari5+ Opera12.1+ */
import "./es/es.object.get-own-property-descriptor";
/* IE9+ Firefox4+ Safari5+ Opera12.1+ */
import "./es/es.object.get-own-property-names";
/* IE9+ Firefox4+ Safari5.1+ Opera12.1+ */
import "./es/es.object.define-properties";

/* IE11+ Firefox4+ Chrome7+ Safari5.1+ Opera12.1+ */
import "./es/es.function.bind";


/** ES2015 */
/* IE9+ Firefox4+ Safari5+ Opera11.5+ */
import "./es/es.array.is-array";
/* IE11+ Chrome34+ Firefox31+ Safari9+ Opera12.1+ */
import "./es/es.object.set-prototype-of";
/* Edge12+ Chrome19 Firefox22+ Safari9+ */
import "./es/es.object.is";


/* Edge12+ Chrome32 Firefox27+ Safari7+ */
import "./es/es.promise";

/* Edge12+ Chrome19+ Firefox16+ Safari9+ */
import "./es/es.number.is-nan";
import "./es/es.number.is-finite";
/* Edge12+ Chrome34+ Firefox16+ Safari9+ */
import "./es/es.number.is-integer";
/* Edge12+ Chrome34+ Firefox25+ Safari9+ */
import "./es/es.number.epsilon";
import "./es/es.number.parse-float";
import "./es/es.number.parse-int";
/* Edge12+ Chrome34+ Firefox31+ Safari9+ */
import "./es/es.number.is-safe-integer";
/* Edge12+ Chrome34+ Firefox32+ Safari9+ */
import "./es/es.number.max-safe-integer";
import "./es/es.number.min-safe-integer";

/* Edge12+ Chrome34+ Firefox31+ Safari10+ */
/* import "./es.string.normalize";*/

/* IE11+ Chrome36 Firefox6+ Safari8+ */
import "./es/es.weak-map";
/* IE11+ Chrome36 Firefox34+ Safari9+ */
import "./es/es.weak-set";

/* IE11+ Chrome38 Firefox13+ Safari8+ */
import "./es/es.map";
/* IE11+ Chrome38 Firefox13+ Safari8+ */
import "./es/es.set";

/* Edge12+ Chrome38 Firefox17+ Safari9+ */
import "./es/es.string.iterator";
/* Edge12+ Chrome38 Firefox17+ Safari10+ */
import "./es/es.array.iterator";
/* Edge12+ Chrome38 Firefox36+ Safari9+ */
import "./es/es.symbol";

/* Edge12+ Chrome28 Firefox20+ Safari7+ */
import "./es/es.math.imul";
/* Edge12+ Chrome38 Firefox25+ Safari8+ */
import "./es/es.math.acosh";
import "./es/es.math.asinh";
import "./es/es.math.atanh";
import "./es/es.math.cbrt";
import "./es/es.math.cosh";
import "./es/es.math.expm1";
import "./es/es.math.log10";
import "./es/es.math.log1p";
import "./es/es.math.log2";
import "./es/es.math.sinh";
import "./es/es.math.tanh";
import "./es/es.math.trunc";
/* Edge12+ Chrome38 Firefox25+ Safari9+ */
import "./es/es.math.sign";
/* Edge12+ Chrome38 Firefox26+ Safari8+ */
import "./es/es.math.fround";
/* Edge12+ Chrome38 Firefox27+ Safari8+ */
import "./es/es.math.hypot";
/* Edge12+ Chrome38 Firefox31+ Safari7+ */
import "./es/es.math.clz32";


/* Edge15+ Chrome41 Firefox17+ Safari9+ */
import "./es/es.string.starts-with";
import "./es/es.string.ends-with";
/* Edge12+ Chrome41 Firefox24+ Safari9+ */
import "./es/es.string.repeat";
/* Edge12+ Chrome41 Firefox29+ Safari9+ */
import "./es/es.string.code-point-at";
import "./es/es.string.from-code-point";
/* Edge12+ Chrome41 Firefox34+ Safari9+ */
import "./es/es.string.raw";
/* Edge12+ Chrome41 Firefox40+ Safari9+ */
import "./es/es.string.includes";

/* Edge12+ Chrome45 Firefox25+ Safari7.1+ */
import "./es/es.array.find-index";
import "./es/es.array.find";
/* Edge12+ Chrome45 Firefox25+ Safari9+ */
import "./es/es.array.of";
/* Edge12+ Chrome45 Firefox31+ Safari8+ */
import "./es/es.array.fill";
/* Edge12+ Chrome45 Firefox32+ Safari9+ */
import "./es/es.array.from";
/* Edge12+ Chrome45 Firefox32+ Safari9+ */
import "./es/es.array.copy-within";

/* Edge12+ Chrome45 Firefox34+ Safari9+ */
import "./es/es.object.assign";

/* Edge12+ Chrome46 Firefox34+ Safari9.1+ */
import "./es/es.function.name";


/* ES2016 */
/* Chrome47 Firefox43+ Safari9+ Edge14+ */
import "./es/es.array.includes";
/* ES2017 */
/* Chrome54+ Firefox47+ Safari10.1+ Edge14+ */
import "./es/es.object.entries";
import "./es/es.object.values";
/* Chrome54+ Firefox50+ Safari10+ Edge15+ */
import "./es/es.object.get-own-property-descriptors";
/* Chrome57+ Firefox40+ Safari9+ Edge15+ */
import "./es/es.string.pad-start";
import "./es/es.string.pad-end";
/* Chrome61+ Firefox60+ Safari10.1+ Edge16+ */
/* ==================== module ==================== */
/* ES2018 */
/* Chrome63+ Firefox57+ Safari11.1+ */
import "./es/es.symbol.async-iterator";
/* Chrome63+ Firefox58+ Safari11.1+ Edge18+ */
import "./es/es.promise.finally";
/* ES2019 */
/* Chrome66+ Firefox61+ Safari12+ */
import "./es/es.string.trim-start";
import "./es/es.string.trim-end";
/* Chrome69+ Firefox62+ Safari12+*/
import "./es/es.array.flat";
import "./es/es.array.flat-map";
/* Chrome70+ Firefox63+ Safari12+*/
import "./es/es.symbol.description";
/* Chrome73+ Firefox63+ Safari12.1+ */
import "./es/es.object.from-entries";
/* ES2020 */
/* Chrome71+ Firefox65+ Safari12.1+*/
import "./es/es.global-this";
/* Chrome73+ Firefox67+ Safari13+*/
import "./es/es.string.match-all";
/* Chrome76+ Firefox71+ Safari13+*/
import "./es/es.promise.all-settled";
/* ES2021 */
/* Chrome84+ Firefox79+ Safari14.1+*/
/* WeakRef FinalizationRegistry */
/* Intl */
/* Chrome85+ Firefox77+ Safari13.1+*/
import "./es/es.string.replace-all";
/* Chrome85+ Firefox79+ Safari14+*/
import "./es/es.promise.any";
import "./es/es.aggregate-error";
/* ES2022 */
/* Chrome92+ Firefox90+ Safari15.4+*/
import "./es/es.array.at";
import "./es/es.string.at";
/* Chrome93+ Firefox92+ Safari15.4+*/
import "./es/es.object.has-own";
/* ES2023 */
/* Chrome97+ Firefox104+ Safari15.4+*/
import "./es/es.array.find-last-index";
import "./es/es.array.find-last";
/* Chrome98+ Firefox94+ Safari15.4+*/
import "./web/web.structured-clone";
/* Chrome110+ Firefox115+ Safari16+*/
import "./es/es.array.to-reversed";
import "./es/es.array.to-sorted";
import "./es/es.array.to-spliced";
import "./es/es.array.with";
/* ES2024 */
/* Chrome111+ Firefox119+ Safari16.4+ */
import "./es/es.string.is-well-formed";
import "./es/es.string.to-well-formed";
/* Chrome117+ Firefox119+ Safari17.4+ */
import "./es/es.object.group-by";
import "./es/es.map.group-by";
/* Chrome119+ Firefox121+ Safari17.4+ */
import "./es/es.promise.with-resolvers";
// /* Chrome126+ Firefox126+ Safari18+ */
// import "./web.url-parse";
