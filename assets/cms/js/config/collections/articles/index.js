import { markdownField } from "../../fields";
import { nestedFolderCollection, pageDefaults } from "../../patterns";

const articlesCollection = {
  ...nestedFolderCollection('Articles', "Article", 'blog', [...pageDefaults, markdownField('Body', 'body')]),
};

export default articlesCollection;
