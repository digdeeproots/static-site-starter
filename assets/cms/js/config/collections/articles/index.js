import { markdownField } from "../../fields";
import { nestedFolderCollection, pageDefaults } from "../../patterns";

const articlesCollection = {
  ...nestedFolderCollection('Articles', "Article", 'article', [...pageDefaults, markdownField('Body', 'body')]),
};

export default articlesCollection;
