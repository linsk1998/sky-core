import { getPrototypeOf$ie } from "../../impl/object/proto/getPrototypeOf$ie";
import { getPrototypeOf } from "../../native/Object/getPrototypeOf";
import { setPrototypeOf } from "../../native/Object/setPrototypeOf";
export default getPrototypeOf && setPrototypeOf ? getPrototypeOf : getPrototypeOf$ie;
