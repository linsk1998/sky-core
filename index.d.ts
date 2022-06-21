declare module "sky-core" {
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
	export function loadCSS(href: string): Promise<void>;
	export function loadScript(src: string, charset?: string): Promise<void>;

	export function getElementsByClassName(className: string, ancestor?: ParentNode | Element | Document): Element[];
	export function getElementStyle(el: Element, prop: string): string;
	export function hasClass(el: Element, className: string): boolean;
	export function addClass(el: Element, className: string): void;
	export function removeClass(el: Element, className: string): void;
	export function toggleClass(el: Element, className: string): void;
	export function getNextElement(el: Element): Element | null;
	export function getPrevElement(el: Element): Element | null;
	export function querySelector(selector: string, ancestor?: ParentNode | Element | Document): Element | null;
	export function querySelectorAll(selector: string, ancestor?: ParentNode | Element | Document): Element[];

	export function attachEvent<K extends keyof DocumentEventMap>(ele: Document, type: K, func: (this: Document, ev: DocumentEventMap[K]) => any, useCapture?: boolean): void;
	export function attachEvent<K extends keyof WindowEventMap>(ele: Window, type: K, func: (this: Window, ev: WindowEventMap[K]) => any, useCapture?: boolean): void;
	export function attachEvent<K extends keyof HTMLElementEventMap>(ele: HTMLElement, type: K, func: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, useCapture: boolean): void;
	export function attachEvent<K extends keyof ElementEventMap>(ele: Element, type: K, func: (this: Element, ev: ElementEventMap[K]) => any, useCapture: boolean): void;
	export function attachEvent(ele: EventTarget, type: string, func: Function): void;
	export function detachEvent(ele: EventTarget, type: string, func: Function, useCapture?: boolean): void;
	export function fixEvent(ele: EventTarget, type: 'click' | 'mousedown' | 'mouseup' | 'mouseover' | 'mouseout', e: MouseEvent): MouseEvent;
	export function fixEvent<T = Event>(ele: EventTarget, type: string, e: T): T;
	export function fireEvent(currentTarget: EventTarget, type: string, props: Record<string, any>): void;
	/** @deprecated change to fireEvent */
	export function trigger(currentTarget: EventTarget, type: string, props: Record<string, any>): void;


	export function getCookie(key: string): string;
	export function setCookie(key: string, value: string, timeout?: number, path?: string, domain?: string): void;
	export function setCookie(key: string, value: string, path?: string, timeout?: number, domain?: string): void;
	export function setCookie(key: string, value: string, path?: string, domain?: string): void;

	export function addClass(ele: any, cls: string): void;
	export function hasClass(ele: any, cls: string): boolean;
	export function removeClass(ele: any, cls: string): void;

}