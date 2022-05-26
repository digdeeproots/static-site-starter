import { multiselectField, markdownField } from "../../fields";
import { nestedCollectionFileChoiceMetaFields, nestedFolderCollection, pageDefaults } from "../../patterns";

let articlesCollection = {
  ...nestedFolderCollection('Articles', "Article", 'articles', [
		...pageDefaults,
		multiselectField('Series', 'series', [
			'Naming as a Process',
			'Legacy to DevOps',
			'Monolith Busting',
			'Intentional Learning',
			'Legacy Newsletter',
		]),
		markdownField('Body', 'body'),
	]),
};
articlesCollection.view_groups.push({label: 'Primary Series', field: 'series', pattern: '(?<=").*?(?=")'});

export default articlesCollection;
