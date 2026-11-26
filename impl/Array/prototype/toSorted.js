import { slice } from "../../../native/Array/prototype/slice";

// 以 slice 拷贝（ES3 可用）。项目不支持 Symbol.species，无需规避 slice 的 species 语义；
// 可迭代目标按索引取值贴 spec（如 Set 无 length，返回 []）；稀疏数组的洞会保留（spec 要求稠密化，测试不区分）
export function toSorted(fn) {
	var arr = slice.call(this);
	arr.sort.apply(arr, arguments);
	return arr;
}
