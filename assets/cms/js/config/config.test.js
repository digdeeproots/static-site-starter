import config from ".";
import { pageDefaults, filesCollection, folderCollection } from "./patterns";

test('config exists', () => {
  expect(config).toBeDefined();
});

test('config defines editorial workflow', () => {
  expect(config).toEqual(expect.objectContaining({
		backend: {
			name: 'git-gateway',
			branch: expect.anything(),
			cms_label_prefix: expect.stringMatching(/^content\//)
		},
		load_config_file: false,
		publish_mode: 'editorial_workflow',
		media_folder: 'static/img',
		public_folder: '/img'
	}));
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
