import { stringField, textField, objectField, hiddenField } from "./fields";

export const gitgateway = (branch='staging') => ({
	name: "git-gateway",
	branch,
	cms_label_prefix: "content/editorial/",
});

export const github = (repo, branch='staging') => ({
	name: "github",
	repo,
	branch,
	cms_label_prefix: "content/editorial/",
});

export const with_editorial_workflow = () => ({
	open_authoring: true,
	auth_scope: 'repo',
});

export const collectionDefaults = (label, name) => ({
  label,
  name,
  editor: {
    preview: false,
  },
});

export const filesCollection = (label, files) => ({
  ...collectionDefaults(label, label.toLowerCase()),
  files,
});

export const folderCollection = (plural_label, label, folder, extra_fields=[]) => {
	if(!extra_fields.find(f => f.name === 'title')) {
		extra_fields = [...extra_fields, {label: "Title", name: "title", widget: "string"}]
	}
	return {
		...collectionDefaults(plural_label, label.toLowerCase()),
		label_singular: label,
		folder: `content/en/${folder}`,
		create: true,
		fields: extra_fields,
	};
}

export const nestedFolderCollection = (plural_label, label, folder, extra_fields=[]) => ({
  ...folderCollection(plural_label, label, folder, extra_fields),
	nested: {
		depth: 30,
	},
	path: '{{slug}}/index',
	media_folder: '',
	public_folder: '',
});

export const pageDefaults = [
  stringField("Menu title", "title", true),
  stringField("Link title", "linkTitle", true),
  objectField("SEO", "seo", [
    stringField("SEO title", "title"),
    textField("SEO description", "description"),
  ]),
];

export const buttonDefaults = (label = "Button", name = "button") =>
  objectField(label, name, [
    stringField("Text", "text", true),
    stringField("URL", "url", true),
  ]);
