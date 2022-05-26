import { multiselectField, markdownField } from "../../fields";
import { nestedCollectionFileChoiceMetaFields, nestedFolderCollection, pageDefaults } from "../../patterns";

const articlesCollection = {
  ...nestedFolderCollection('Articles', "Article", 'articles', [
		...pageDefaults,
		multiselectField('Series', 'xseries', [
			'Naming as a Process',
			'Legacy to DevOps',
			'Monolith Busting',
			'Intentional Learning',
			'Legacy Newsletter',
		]),
		markdownField('Body', 'body'),
	]),
	meta: nestedCollectionFileChoiceMetaFields,
};

export default articlesCollection;
