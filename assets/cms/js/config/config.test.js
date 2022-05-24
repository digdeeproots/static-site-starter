import config from ".";
import { markdownField, textField } from './fields'
import { github, pageDefaults, filesCollection, folderCollection, nestedFolderCollection, gitgateway, with_editorial_workflow } from "./patterns";

test('config exists', () => {
  expect(config).toBeDefined();
});

test('config defines editorial workflow', () => {
  expect(config).toEqual(expect.objectContaining({
		backend: {
			branch: expect.anything(),
			cms_label_prefix: expect.stringMatching(/^content\//),
			name: "github",
			repo: 'digdeeproots/static-site-starter',
			open_authoring: true,
			auth_scope: 'repo',
		},
		load_config_file: false,
		publish_mode: 'editorial_workflow',
		media_folder: 'static/img',
		public_folder: '/img'
	}));
});

describe('generate config for recurring patterns', () => {
	test('github backend basic values', () => {
		expect(github('the/repo', 'some/branch')).toEqual(
			expect.objectContaining({
				name: 'github',
				repo: 'the/repo',
				branch: 'some/branch',
				cms_label_prefix: 'content/editorial/',
			})
		);
	});

	test('git gateway backend basic values', () => {
		expect(gitgateway('some/branch')).toEqual(
			expect.objectContaining({
				name: 'git-gateway',
				branch: 'some/branch',
				cms_label_prefix: 'content/editorial/',
			})
		);
	});

	test('additional values for open authoring', () => {
		expect(with_editorial_workflow()).toEqual(
			expect.objectContaining({
				open_authoring: true,
				auth_scope: 'repo',
			})
		);
	});

	const basic_folder_collection = (plural_label, singular_label, folder) =>
		expect.objectContaining({
			label: plural_label,
			label_singular: singular_label,
			name: singular_label.toLowerCase(),
			editor: {
				preview: false,
			},
			folder: `content/en/${folder}`,
			create: true,
			fields: [
				{label: "Title", name: "title", widget: "string"},
			],
		});

	test('folder collection contains required values', () => {
		expect(folderCollection('Labels', 'Label', 'path/subpath')).toEqual(
			basic_folder_collection('Labels', 'Label', 'path/subpath')
		);
	});

	test('nested folder collection contains same basic values as any other folder collection', () => {
		expect(nestedFolderCollection('Labels', 'Label', 'path/subpath')).toEqual(
			basic_folder_collection('Labels', 'Label', 'path/subpath')
		);
	});

	test('nested folder collection contains required values', () => {
		expect(nestedFolderCollection('Labels', 'Label', 'path/subpath')).toEqual(
			expect.objectContaining({
				nested: {
					depth: 30,
				},
				path: '{{slug}}/index',
				media_folder: '',
				public_folder: '',
			})
		);
	});
});

function basicPage(label, name, file, extra_fields = []) {
	return expect.objectContaining({
		label,
		name,
		file,
		fields: expect.arrayContaining([...pageDefaults, ...extra_fields]),
	});
}

function verify(conf) {
	return {
		hasCollection: (collection) => {
			expect(conf.collections).toContainEqual(
				expect.objectContaining(collection));
		}
	}
}

describe('configuring CMS collections', () => {
	test('basic pages', () => {
		verify(config).hasCollection(
			filesCollection('Pages', [
				basicPage('Home page', 'home', 'content/en/_index.html', [textField("Body", "body", true)]),
			])
		);
	});

	test('articles', () => {
		verify(config).hasCollection(
			nestedFolderCollection('Articles', 'Article', 'articles', [
				...pageDefaults,
				markdownField('Body', 'body'),
			])
		);
	});
});
