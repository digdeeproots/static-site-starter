import { markdownField } from "../../fields";
import { nestedFolderCollection, pageDefaults } from "../../patterns";

const articlesCollection = {
  ...nestedFolderCollection("Article", 'article', [...pageDefaults, markdownField('Body', 'body')]),
};

export default articlesCollection;
