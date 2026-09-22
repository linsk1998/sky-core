import { quirks } from "../../support/quirks";

export default quirks ? document.body : document.documentElement;