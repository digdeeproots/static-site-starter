import { stringField, textField, objectField, hiddenField, listField, dateField, markdownField } from "./fields";

export const gitgateway = (branch='staging') => ({
	name: "git-gateway",
	branch,
	cms_label_prefix: "content/",
});

export const github = (repo, branch='staging') => ({
	name: "github",
	repo,
	branch,
	cms_label_prefix: "content/",
});

export const with_editorial_workflow = () => ({
	open_authoring: true,
	auth_scope: 'repo',
});

export const collectionDefaults = (label, name) => ({
  label,
  name,
  editor: {
    preview: true,
  },
});

export const pageDefaults = [
	dateField('Publish date', 'date', true),
	stringField('Default title (used in search engine results, browser tab, file name, etc)', 'title', true),
	stringField("Title used in menus - within the context of the section's title", 'linkTitle', true),
	hiddenField('Author', 'author', 'Deep Roots ([@digdeeproots](https://twitter.com/digdeeproots/))'),
	textField("SEO description", "description"),
	// lististField("Resources", 'resources', []),
];

export const buttonDefaults = (label = "Button", name = "button") =>
  objectField(label, name, [
    stringField("Text", "text", true),
    stringField("URL", "url", true),
  ]);

export const filesCollection = (label, files) => ({
  ...collectionDefaults(label, label.toLowerCase()),
  files,
});

const folderCollectionSharedElements = (plural_label, label, folder, extra_fields=[]) => {
	if(!extra_fields.find(f => f.name === 'userfilename')) {
		extra_fields = [stringField("Slug used in URLs", "userfilename", true), ...extra_fields]
	}
	return {
		...collectionDefaults(plural_label, label.toLowerCase()),
		label_singular: label,
		identifier_field: 'userfilename',
		slug: '{{userfilename}}',
		folder: `content/en/${folder}`,
		create: true,
		sortable_fields: ['userfilename', 'date'],
		view_groups: [
			{label: 'Year', field: 'date', pattern: '\\d{4}'},
		],
		fields: [...extra_fields, markdownField('Body', 'body')],
	};
}

export const folderCollection = (plural_label, label, folder, extra_fields=[]) => {
	return {
		...folderCollectionSharedElements(plural_label, label, folder, extra_fields),
		summary: '{{filename}} --- {{title}} ({{date}})',
	};
}

export const nestedFolderCollection = (plural_label, label, folder, extra_fields=[]) => ({
  ...folderCollectionSharedElements(plural_label, label, folder, extra_fields),
	summary: '{{dirname}} --- {{title}} ({{date}})',
	nested: {
		depth: 30,
		summary: "{{linkTitle}}",
	},
	media_folder: '',
	public_folder: '',
	meta: {
		path: { label: 'Parent', widget: 'parent', index_file: 'index' }
	},
});
