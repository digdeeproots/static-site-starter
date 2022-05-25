import { markdownField } from "../../fields";
import { nestedCollectionFileChoiceMetaFields, nestedFolderCollection, pageDefaults } from "../../patterns";

const articlesCollection = {
  ...nestedFolderCollection('Articles', "Article", 'articles', [...pageDefaults, markdownField('Body', 'body')]),
	meta: nestedCollectionFileChoiceMetaFields,
};

export default articlesCollection;
