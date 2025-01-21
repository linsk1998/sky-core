import { quirks } from "../../support/quirks";

export default document.scrollingElement || quirks ? document.body : document.documentElement;