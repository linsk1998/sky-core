declare module "sky-core/utils" {
	export function overload(args: ArrayLike<any>, thisVal: any): any;
	export function overload(checks: ((arg: any) => boolean)[], thisVal: any, target: Function): void;

	export function isArray(arg: any): arg is any[];
	export function isDate(arg: any): arg is Date;
	export function isRegExp(arg: any): arg is RegExp;
	export function isString(arg: any): arg is (String | string);
	export function isFunction(arg: any): arg is Function;
	export function isNumber(arg: any): arg is (Number | number);
	export function isObject(arg: any): arg is Object;
	export function isDefined(arg?: any): arg is any;
	export function isWindow(arg: any): arg is Window;
	export function isPlainObject(arg: any): arg is Record<any, any>;
	export function isArrayLike(arg: any): arg is (ArrayLike<any> | string);
	export function isArrayLikeObject(arg: any): arg is ArrayLike<any>;
	export function isNumeric(arg: any): arg is number;
	export function isElement(obj: Node): obj is Element;
	export function isInput(obj: Element): obj is HTMLInputElement;

	export function noop(...args: any[]): void;
	export function times(n: number, iteratee: Function, args?: any[]): any[];

	export function random(a: number, b: number): number;

	export function escapeString(value: string): string;
	export function escapeHtml(value: string): string;
	export function escapeAttribute(value: string): string;
	export function escape(value: string): string;
	export function unescape(value: string): string;
	export function escapeRegExp(value: string): string;
	export function replaceAll(value: string): string;
	export function toString(value: string): string;

	export function findIndex(arr: Record<string, any>[], key: string, value: any): number;
	export function findLastIndex(arr: Record<string, any>[], key: string, value: any): number;
	export function findLast(arr: Record<string, any>[], key: string, value: any): any;
	export function find(arr: Record<string, any>[], key: string, value: any): any;
	export function sortBy(arr: Record<string, any>[], key: string): Record<string, any>[];
	export function pluck(arr: Record<string, any>[], key: string): Record<string, any>[];
	export function sortedIndex(arr: any[], value: any): number;
	export function sortedLastIndex(arr: any[], value: any): number;
	export function shuffle<T>(arr: T[]): T[];
	export function shuffle(arr: any[]): any[];
	export function union(...args: any[][]): any[];
	export function difference(arr: any[], arr2: any[]): any[];
	export function intersection(...args: any[][]): any[];

	export function forIn<T>(obj: any, callback: (this: T, value: any, key: string) => void, thisArg?: T): void;
	export function forOwn<T>(obj: any, callback: (this: T, value: any, key: string) => void, thisArg?: T): void;
	export function pick(obj: object, keys: string[]): Record<string, any>;
	export function omit(obj: object, keys: string[]): Record<string, any>;
	export function inherits(subClass: any, superClass: any): void;

	export function getCurrentScript(): HTMLScriptElement;
	export function getCurrentPath(): string;
	export function getScript(src: string, func: Function, charset?: string): HTMLScriptElement;

	export function attachEvent<K extends keyof DocumentEventMap>(ele: Document, evt: K, func: (this: Document, ev: DocumentEventMap[K]) => any, useCapture?: boolean): void;
	export function attachEvent<K extends keyof WindowEventMap>(ele: Window, evt: K, func: (this: Window, ev: WindowEventMap[K]) => any, useCapture?: boolean): void;
	export function attachEvent<K extends keyof HTMLElementEventMap>(ele: HTMLElement, evt: K, func: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, useCapture: boolean): void;
	export function attachEvent<K extends keyof ElementEventMap>(ele: Element, evt: K, func: (this: Element, ev: ElementEventMap[K]) => any, useCapture: boolean): void;
	export function attachEvent(ele: EventTarget, evt: string, func: Function): void;
	export function detachEvent(ele: EventTarget, evt: string, func: Function, useCapture?: boolean): void;
	export function fireEvent(ele: EventTarget, evt: string, props: {
		[key: string]: any,
		bubbles?: boolean,
		cancelable?: boolean;
	}): void;


	export function getCookie(key: string, value: string): void;
	export function setCookie(key: string, value: string, timeout?: number, path?: string, domain?: string): void;


}
declare module "sky-core/pure/Array/from" {
	export var from: typeof Array.from;
}
declare module "sky-core/pure/Array/isArray" {
	export var isArray: typeof Array.isArray;
}
declare module "sky-core/polyfill/Object/assign" { }
declare module "sky-core/pure/Object/assign" {
	export var assign: typeof Object.assign;
}
declare module "sky-core/polyfill/Object/create" { }
declare module "sky-core/pure/Object/create" {
	export var create: typeof Object.create;
}
declare module "sky-core/polyfill/Object/defineProperties" { }
declare module "sky-core/pure/Object/defineProperties" {
	export var defineProperties: typeof Object.defineProperties;
}
declare module "sky-core/polyfill/Object/defineProperty" { }
declare module "sky-core/pure/Object/defineProperty" {
	export var defineProperty: typeof Object.defineProperty;
}
declare module "sky-core/polyfill/Object/entries" { }
declare module "sky-core/pure/Object/entries" {
	export var entries: typeof Object.entries;
}
declare module "sky-core/polyfill/Object/fromEntries" { }
declare module "sky-core/pure/Object/fromEntries" {
	export var fromEntries: typeof Object.fromEntries;
}
declare module "sky-core/polyfill/Object/getOwnPropertyDescriptor" { }
declare module "sky-core/pure/Object/getOwnPropertyDescriptor" {
	export var getOwnPropertyDescriptor: typeof Object.getOwnPropertyDescriptor;
}
declare module "sky-core/polyfill/Object/getOwnPropertyDescriptors" { }
declare module "sky-core/pure/Object/getOwnPropertyDescriptors" {
	export var getOwnPropertyDescriptors: typeof Object.getOwnPropertyDescriptors;
}
declare module "sky-core/polyfill/Object/getOwnPropertyNames" { }
declare module "sky-core/pure/Object/getOwnPropertyNames" {
	export var getOwnPropertyNames: typeof Object.getOwnPropertyNames;
}
declare module "sky-core/polyfill/Object/getPrototypeOf" { }
declare module "sky-core/pure/Object/getPrototypeOf" {
	export var getPrototypeOf: typeof Object.getPrototypeOf;
}
declare module "sky-core/polyfill/Object/is" { }
declare module "sky-core/pure/Object/is" {
	export var is: typeof Object.is;
}
declare module "sky-core/polyfill/Object/keys" { }
declare module "sky-core/pure/Object/keys" {
	export var keys: typeof Object.keys;
}
declare module "sky-core/polyfill/Object/setPrototypeOf" { }
declare module "sky-core/pure/Object/setPrototypeOf" {
	export var setPrototypeOf: typeof Object.setPrototypeOf;
}
declare module "sky-core/polyfill/Object/values" { }
declare module "sky-core/pure/Object/values" {
	export var values: typeof Object.values;
}

declare module "sky-core/polyfill/Reflect" { }

declare module "sky-core/polyfill/Reflect/apply" { }
declare module "sky-core/pure/Reflect/apply" {
	export var apply: typeof Reflect.apply;
}
declare module "sky-core/polyfill/Reflect/construct" { }
declare module "sky-core/pure/Reflect/construct" {
	export var construct: typeof Reflect.construct;
}
declare module "sky-core/polyfill/Reflect/defineProperty" { }
declare module "sky-core/pure/Reflect/defineProperty" {
	export var defineProperty: typeof Reflect.defineProperty;
}
declare module "sky-core/polyfill/Reflect/getPrototypeOf" { }
declare module "sky-core/pure/Reflect/getPrototypeOf" {
	export var getPrototypeOf: typeof Reflect.getPrototypeOf;
}
declare module "sky-core/polyfill/Reflect/getOwnPropertyDescriptor" { }
declare module "sky-core/pure/Reflect/getOwnPropertyDescriptor" {
	export var getOwnPropertyDescriptor: typeof Reflect.getOwnPropertyDescriptor;
}
declare module "sky-core/polyfill/Reflect/get" { }
declare module "sky-core/pure/Reflect/get" {
	export var get: typeof Reflect.get;
}
declare module "sky-core/polyfill/Reflect/set" { }
declare module "sky-core/pure/Reflect/set" {
	export var set: typeof Reflect.set;
}
declare module "sky-core/polyfill/Reflect/deleteProperty" { }
declare module "sky-core/pure/Reflect/deleteProperty" {
	export var deleteProperty: typeof Reflect.deleteProperty;
}


declare module "sky-core/polyfill/Symbol" { }
declare module "sky-core/pure/Symbol" {
	export function Symbol(description?: string): Symbol;
	export namespace Symbol {
		export var asyncIterator: typeof globalThis.Symbol.asyncIterator;
		export var hasInstance: typeof globalThis.Symbol.hasInstance;
		export var isConcatSpreadable: typeof globalThis.Symbol.isConcatSpreadable;
		export var iterator: typeof globalThis.Symbol.iterator;
		export var match: typeof globalThis.Symbol.match;
		export var matchAll: typeof globalThis.Symbol.matchAll;
		export var replace: typeof globalThis.Symbol.replace;
		export var search: typeof globalThis.Symbol.search;
		export var species: typeof globalThis.Symbol.species;
		export var split: typeof globalThis.Symbol.split;
		export var toPrimitive: typeof globalThis.Symbol.toPrimitive;
		export var toStringTag: typeof globalThis.Symbol.toStringTag;
		export var unscopables: typeof globalThis.Symbol.unscopables;
	}
}
declare module "sky-core/polyfill/Symbol/for" { }
declare module "sky-core/pure/Symbol/for" {
	export default Symbol.for;
}
declare module "sky-core/polyfill/Symbol/keyFor" { }
declare module "sky-core/pure/Symbol/keyFor" {
	export var keyFor: typeof Symbol.keyFor;
}


declare module "sky-core/polyfill/Array/from" { }
declare module "sky-core/pure/Array/from" {
	export var from: typeof Array.from;
}
declare module "sky-core/polyfill/Array/isArray" { }
declare module "sky-core/pure/Array/isArray" {
	export var isArray: typeof Array.isArray;
}
declare module "sky-core/polyfill/Array/of" { }
declare module "sky-core/pure/Array/of" {
	export var of: typeof Array.of;
}
declare module "sky-core/polyfill/Array/prototype/every" { }
declare module "sky-core/polyfill/Array/prototype/filter" { }
declare module "sky-core/polyfill/Array/prototype/forEach" { }
declare module "sky-core/polyfill/Array/prototype/indexOf" { }
declare module "sky-core/polyfill/Array/prototype/lastIndexOf" { }
declare module "sky-core/polyfill/Array/prototype/reduce" { }
declare module "sky-core/polyfill/Array/prototype/reduceRight" { }
declare module "sky-core/polyfill/Array/prototype/some" { }
declare module "sky-core/polyfill/Array/prototype/@@iterator" { }
declare module "sky-core/polyfill/Array/prototype/entries" { }
declare module "sky-core/polyfill/Array/prototype/fill" { }
declare module "sky-core/polyfill/Array/prototype/find" { }
declare module "sky-core/polyfill/Array/prototype/findIndex" { }
declare module "sky-core/polyfill/Array/prototype/flat" { }
declare module "sky-core/polyfill/Array/prototype/flatMap" { }
declare module "sky-core/polyfill/Array/prototype/includes" { }
declare module "sky-core/polyfill/Array/prototype/map" { }

declare module "sky-core/polyfill/Date/prototype/toLocaleDateString" { }
declare module "sky-core/polyfill/Date/prototype/toLocaleFormat" { }
declare module "sky-core/polyfill/Date/prototype/toLocaleString" { }
declare module "sky-core/polyfill/Date/prototype/toLocaleTimeString" { }
declare module "sky-core/polyfill/Date/now" { }
declare module "sky-core/polyfill/Date/prototype/toISOString" { }
declare module "sky-core/polyfill/Date/prototype/toJSON" { }

declare module "sky-core/polyfill/Function/prototype/@@hasInstance" { }
declare module "sky-core/polyfill/Function/prototype/bind" { }
declare module "sky-core/polyfill/Function/prototype/name" { }