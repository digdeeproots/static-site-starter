import pagesCollection from "./collections/pages";
import articlesCollection from "./collections/articles";
import { github, with_editorial_workflow } from "./patterns";

const config = {
  backend: {
		...github('digdeeproots/static-site-starter', 'main'),
		...with_editorial_workflow(),
  },
  load_config_file: false,
  publish_mode: "editorial_workflow",
  media_folder: "static/img",
  public_folder: "/img",
  collections: [
    pagesCollection,
		articlesCollection,
  ],
};

export default config;
