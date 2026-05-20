import { defineProperty } from "../../native/Object/defineProperty";
import { hasV8DefineBug } from "../../support/hasV8DefineBug";
import { ff_defineProperty, v8_defineProperty } from "../../impl-modern/Object/defineProperty";

export default defineProperty && hasV8DefineBug ? v8_defineProperty : defineProperty || ff_defineProperty;
