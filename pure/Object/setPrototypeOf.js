import { hasEnumBug } from "../../utils/hasEnumBug";
import { setPrototypeOf$ff } from "../../impl/object/setPrototypeOf$ff";
import { setPrototypeOf$ie } from "../../impl/object/setPrototypeOf$ie";
import { setPrototypeOf$jscript } from "../../impl/object/setPrototypeOf$jscript";
import { Object } from "../../native/Object";
import { setPrototypeOf } from "../../native/Object/setPrototypeOf";
export default setPrototypeOf || (
	Object.__proto__ ?
		setPrototypeOf$ff :
		hasEnumBug ?
			setPrototypeOf$jscript :
			setPrototypeOf$ie
);
