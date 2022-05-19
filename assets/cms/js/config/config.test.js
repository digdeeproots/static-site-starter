import config from ".";

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
