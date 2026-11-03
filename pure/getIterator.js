import iterator from "./Symbol/iterator";

export default function getIterator(iterable) {
	return iterable[iterator]();
}
