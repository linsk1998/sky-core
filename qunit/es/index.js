import "../helpers/qunit-helpers";

import "./es.number.to-fixed";
import "./es.number.to-precision";

import "./es.date.to-json";
import "./es.date.to-iso-string";
import "./es.date.to-string";

/* ES5 */
import "./es.array.index-of";
import "./es.array.last-index-of";
import "./es.array.for-each";
import "./es.array.filter";
import "./es.array.map";
import "./es.array.some";
import "./es.array.every";


/* IE9+ Firefox3+ Safari4+ Opera11.5+ */
import "./es.array.reduce";
import "./es.array.reduce-right";

/* IE10+ Firefox3.5+ Safari5+ Opera11.5+ */
import "./es.string.trim";
/* Edge12+ Firefox3.5+ Safari12+ */
/* trim-left trim-right */

/* IE9+ Firefox3.5+ Safari5+ Opera12.1+ */
import "./es.object.get-prototype-of";
/* IE9+ Firefox4+ Safari5+ Opera12.5+ */
import "./es.object.create";

/* IE9+ Firefox4+ Safari5+ Opera12.1+ */
import "./es.object.keys";
/* IE9+ Firefox4+ Safari5+ Opera12.1+ */
import "./es.object.define-property";
/* IE9+ Firefox4+ Safari5+ Opera12.1+ */
import "./es.object.get-own-property-descriptor";
/* IE9+ Firefox4+ Safari5+ Opera12.1+ */
import "./es.object.get-own-property-names";
/* IE9+ Firefox4+ Safari5.1+ Opera12.1+ */
import "./es.object.define-properties";

/* IE11+ Firefox4+ Chrome7+ Safari5.1+ Opera12.1+ */
import "./es.function.bind";


/** ES2015 */
/* IE9+ Firefox4+ Safari5+ Opera11.5+ */
import "./es.array.is-array";
/* IE11+ Chrome34+ Firefox31+ Safari9+ Opera12.1+ */
import "./es.object.set-prototype-of";
/* Edge12+ Chrome19 Firefox22+ Safari9+ */
import "./es.object.is";


/* Edge12+ Chrome32 Firefox27+ Safari7+ */
import "./es.promise";

/* Edge12+ Chrome19+ Firefox16+ Safari9+ */
import "./es.number.is-nan";
import "./es.number.is-finite";
/* Edge12+ Chrome34+ Firefox16+ Safari9+ */
import "./es.number.is-integer";
/* Edge12+ Chrome34+ Firefox25+ Safari9+ */
import "./es.number.epsilon";
import "./es.number.parse-float";
import "./es.number.parse-int";
/* Edge12+ Chrome34+ Firefox31+ Safari9+ */
import "./es.number.is-safe-integer";
/* Edge12+ Chrome34+ Firefox32+ Safari9+ */
import "./es.number.max-safe-integer";
import "./es.number.min-safe-integer";

/* Edge12+ Chrome34+ Firefox31+ Safari10+ */
/* import "./es.string.normalize";*/

/* IE11+ Chrome36 Firefox6+ Safari8+ */
import "./es.weak-map";
/* IE11+ Chrome36 Firefox34+ Safari9+ */
import "./es.weak-set";

/* IE11+ Chrome38 Firefox13+ Safari8+ */
import "./es.map";
/* IE11+ Chrome38 Firefox13+ Safari8+ */
import "./es.set";

/* Edge12+ Chrome38 Firefox17+ Safari9+ */
import "./es.string.iterator";
/* Edge12+ Chrome38 Firefox17+ Safari10+ */
import "./es.array.iterator";
/* Edge12+ Chrome38 Firefox36+ Safari9+ */
import "./es.symbol";

/* Edge12+ Chrome28 Firefox20+ Safari7+ */
import "./es.math.imul";
/* Edge12+ Chrome38 Firefox25+ Safari8+ */
import "./es.math.acosh";
import "./es.math.asinh";
import "./es.math.atanh";
import "./es.math.cbrt";
import "./es.math.cosh";
import "./es.math.expm1";
import "./es.math.log10";
import "./es.math.log1p";
import "./es.math.log2";
import "./es.math.sinh";
import "./es.math.tanh";
import "./es.math.trunc";
/* Edge12+ Chrome38 Firefox25+ Safari9+ */
import "./es.math.sign";
/* Edge12+ Chrome38 Firefox26+ Safari8+ */
import "./es.math.fround";
/* Edge12+ Chrome38 Firefox27+ Safari8+ */
import "./es.math.hypot";
/* Edge12+ Chrome38 Firefox31+ Safari7+ */
import "./es.math.clz32";


/* Edge15+ Chrome41 Firefox17+ Safari9+ */
import "./es.string.starts-with";
import "./es.string.ends-with";
/* Edge12+ Chrome41 Firefox24+ Safari9+ */
import "./es.string.repeat";
/* Edge12+ Chrome41 Firefox29+ Safari9+ */
import "./es.string.code-point-at";
import "./es.string.from-code-point";
/* Edge12+ Chrome41 Firefox34+ Safari9+ */
import "./es.string.raw";
/* Edge12+ Chrome41 Firefox40+ Safari9+ */
import "./es.string.includes";

/* Edge12+ Chrome45 Firefox25+ Safari7.1+ */
import "./es.array.find-index";
import "./es.array.find";
/* Edge12+ Chrome45 Firefox25+ Safari9+ */
import "./es.array.of";
/* Edge12+ Chrome45 Firefox31+ Safari8+ */
import "./es.array.fill";
/* Edge12+ Chrome45 Firefox32+ Safari9+ */
import "./es.array.from";
/* Edge12+ Chrome45 Firefox32+ Safari9+ */
import "./es.array.copy-within";

/* Edge12+ Chrome45 Firefox34+ Safari9+ */
import "./es.object.assign";

/* Edge12+ Chrome46 Firefox34+ Safari9.1+ */
import "./es.function.name";


/* ES2016 */
/* Chrome47 Firefox43+ Safari9+ Edge14+ */
import "./es.array.includes";
/* ES2017 */
/* Chrome54+ Firefox47+ Safari10.1+ Edge14+ */
import "./es.object.entries";
import "./es.object.values";
/* Chrome54+ Firefox50+ Safari10+ Edge15+ */
import "./es.object.get-own-property-descriptors";
/* Chrome57+ Firefox40+ Safari9+ Edge15+ */
import "./es.string.pad-start";
import "./es.string.pad-end";
/* Chrome61+ Firefox60+ Safari10.1+ Edge16+ */
/* ==================== module ==================== */
/* ES2018 */
/* Chrome63+ Firefox57+ Safari11.1+ */
import "./es.symbol.async-iterator";
/* Chrome63+ Firefox58+ Safari11.1+ Edge18+ */
import "./es.promise.finally";
/* ES2019 */
/* Chrome66+ Firefox61+ Safari12+ */
import "./es.string.trim-start";
import "./es.string.trim-end";
/* Chrome69+ Firefox62+ Safari12+*/
import "./es.array.flat";
import "./es.array.flat-map";
/* Chrome70+ Firefox63+ Safari12+*/
import "./es.symbol.description";
/* Chrome73+ Firefox63+ Safari12.1+ */
import "./es.object.from-entries";
/* ES2020 */
/* Chrome71+ Firefox65+ Safari12.1+*/
import "./es.global-this";
/* Chrome73+ Firefox67+ Safari13+*/
import "./es.string.match-all";
/* Chrome76+ Firefox71+ Safari13+*/
import "./es.promise.all-settled";
/* ES2021 */
/* Chrome84+ Firefox79+ Safari14.1+*/
/* WeakRef FinalizationRegistry */
/* Intl */
/* Chrome85+ Firefox77+ Safari13.1+*/
import "./es.string.replace-all";
/* Chrome85+ Firefox79+ Safari14+*/
import "./es.promise.any";
import "./es.aggregate-error";
/* ES2022 */
/* Chrome92+ Firefox90+ Safari15.4+*/
import "./es.array.at";
import "./es.string.at";
/* Chrome93+ Firefox92+ Safari15.4+*/
import "./es.object.has-own";
/* ES2023 */
/* Chrome97+ Firefox104+ Safari15.4+*/
import "./es.array.find-last-index";
import "./es.array.find-last";
/* Chrome110+ Firefox115+ Safari16+*/
import "./es.array.to-reversed";
import "./es.array.to-sorted";
import "./es.array.to-spliced";
import "./es.array.with";
// /* ES2024 */
/* Chrome111+ Firefox119+ Safari16.4+ */
import "./es.string.is-well-formed";
/* Chrome117+ Firefox119+ Safari17.4+ */
import "./es.object.group-by";
import "./es.map.group-by";
/* Chrome119+ Firefox121+ Safari17.4+ */
import "./es.promise.with-resolvers";

// import "../web/web.url";
