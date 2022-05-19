import { stringField, textField, objectField, listField } from "../../fields";
import {
  pageDefaults,
  buttonDefaults,
  titleWithSubtitleDefaults,
} from "../../patterns";

export default {
  label: "Home page",
  name: "home",
  file: "content/en/_index.md",
  fields: [
    ...pageDefaults,
    objectField("Header", "header", [
      ...titleWithSubtitleDefaults(),
      buttonDefaults(),
    ]),
    objectField("Keyfacts section", "keyfacts_section", [
      ...titleWithSubtitleDefaults(),
      listField("Keyfacts", "keyfacts", [
        stringField("Title", "title", true),
        textField("Text", "text"),
        stringField("Icon", "icon", true),
      ]),
    ]),
  ],
};
