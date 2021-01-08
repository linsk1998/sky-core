import { stringify } from "../../impl/JSON/stringify";
export default this.JSON ? JSON.stringify : stringify;