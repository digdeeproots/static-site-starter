import { multiselectField, simpleListField, imageField, objectListField, objectField, stringField } from "../../fields";
import { nestedFolderCollection, pageDefaults } from "../../patterns";

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
		simpleListField(imageField, 'Images', 'images', false),
		objectListField("Image resource info", 'resources', [
			stringField("file name pattern to match", 'src', true),
			stringField("Title", 'title', false),
			objectField("", 'params', [
				stringField('Byline', 'byline', true),
			], true),
		], false),
	]),
};
articlesCollection.view_groups.push({label: 'Primary Series', field: 'series', pattern: '(?<=").*?(?=")'});

export default articlesCollection;
