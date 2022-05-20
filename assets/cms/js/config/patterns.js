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

export const folderCollection = (label, folder) => ({
  ...collectionDefaults(label, label.toLowerCase()),
  folder: `content/en/${folder}`,
	create: true,
	fields: [
		{label: "Title", name: "title", widget: "string"},
	],
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
