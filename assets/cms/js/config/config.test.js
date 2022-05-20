import config from ".";
import { github, pageDefaults, filesCollection, folderCollection, gitgateway, with_editorial_workflow } from "./patterns";

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

	test('folder collection contains required values', () => {
		expect(folderCollection('Label', 'path/subpath')).toEqual(
			expect.objectContaining({
				label: 'Label',
				name: 'label',
				editor: {
					preview: false,
				},
				folder: `content/en/path/subpath`,
				create: true,
				fields: [
					{label: "Title", name: "title", widget: "string"},
				],
			})
		);
	});
});

function basicPage(label, name, file) {
	return expect.objectContaining({
		label,
		name,
		file,
		fields: expect.arrayContaining(pageDefaults),
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
				basicPage('Home page', 'home', 'content/en/_index.md'),
			])
		);
	});
	test('articles', () => {
		verify(config).hasCollection(
			folderCollection('Articles', 'articles')
		);
	});
});
