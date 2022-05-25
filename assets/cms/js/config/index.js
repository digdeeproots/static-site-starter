import pagesCollection from "./collections/pages";
import articlesCollection from "./collections/articles";
import { gitgateway, github, with_editorial_workflow } from "./patterns";

const github_with_editorial = {
	backend: {
		...github('digdeeproots/static-site-starter', 'main'),
		...with_editorial_workflow(),
	},
	publish_mode: "editorial_workflow",
}

const gitlocal = {
	backend: {
		...gitgateway(),
		branch: undefined,
	},
	local_backend: true,
}

const make_config = (backend) => ({
	...backend,
	load_config_file: false,
	media_folder: "static/img",
	public_folder: "/img",
	collections: [
		pagesCollection,
		articlesCollection,
	],
});

export const using_github = make_config(github_with_editorial);
export const using_localgit = make_config(gitlocal);
export const config = using_localgit;
