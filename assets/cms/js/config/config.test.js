import { config, using_github, using_localgit } from ".";
import { dateField, hiddenField, markdownField, stringField, textField } from './fields'
import { github, pageDefaults, filesCollection, folderCollection, nestedFolderCollection, gitgateway, with_editorial_workflow, nestedCollectionFileChoiceMetaFields } from "./patterns";

test('default config should be to use local git', () => {
  expect(config).toBe(using_localgit);
});

test('config defines GH editorial workflow', () => {
  expect(using_github).toEqual(expect.objectContaining({
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

test('config defines local git workflow', () => {
  expect(using_localgit).toEqual(expect.objectContaining({
		backend: {
			cms_label_prefix: expect.stringMatching(/^content\//),
			name: "git-gateway",
		},
		load_config_file: false,
		local_backend: true,
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

	test('default per-page content fields are correct', () => {
		expect(pageDefaults).toEqual(
			expect.arrayContaining([
				dateField('Publish date', 'date', true),
				stringField('Default title (used in search engine results, browser tab, file name, etc)', 'title', true),
				stringField("Title used in menus - within the context of the section's title", 'linkTitle', true),
				hiddenField('Author', 'author', 'Deep Roots ([@digdeeproots](https://twitter.com/digdeeproots/))'),
				textField("SEO description", "description", false),
			])
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
			fields: expect.arrayContaining([
				{label: "Title", name: "title", widget: "string", required: true},
			]),
		});

	test('non-nested folder collection contains shared collection values', () => {
		expect(folderCollection('Labels', 'Label', 'path/subpath')).toEqual(
			basic_folder_collection('Labels', 'Label', 'path/subpath')
		);
	});

	test('nested folder collection contains shared collection values', () => {
		expect(nestedFolderCollection('Labels', 'Label', 'path/subpath')).toEqual(
			basic_folder_collection('Labels', 'Label', 'path/subpath')
		);
	});

	test('non-nested folder collection has way to set filename (slug)', () => {
		expect(folderCollection('Labels', 'Label', 'path/subpath')).toEqual(
			expect.objectContaining({
				slug: '{{fields.slug}}',
				fields: expect.arrayContaining([
					{label: "Slug used in URLs", name: "slug", widget: "string", required: true},
				]),
			})
		);
	});

	test('nested folder collection has way to set file path and store media', () => {
		expect(nestedFolderCollection('Labels', 'Label', 'path/subpath')).toEqual(
			expect.objectContaining({
				nested: {
					depth: 30,
				},
				media_folder: '',
				public_folder: '',
			})
		);
		expect(nestedFolderCollection('Labels', 'Label', 'path/subpath')).toEqual(
			expect.not.objectContaining({
				slug: expect.anything(),
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
		verify(config).hasCollection({
			...nestedFolderCollection('Articles', 'Article', 'articles', [
				...pageDefaults,
				markdownField('Body', 'body'),
			]),
			meta: nestedCollectionFileChoiceMetaFields,
		});
	});
});
