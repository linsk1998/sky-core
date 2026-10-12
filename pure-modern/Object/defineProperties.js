import { defineProperties } from "../../native/Object/defineProperties";
import { hasV8DefineBug } from "../../support/hasV8DefineBug";
import { defineProperties$v8 } from "../../impl/object/accessor/defineProperties$v8";

export default hasV8DefineBug ? defineProperties$v8 : defineProperties;
