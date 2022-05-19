import pagesCollection from "./collections/pages";
import articlesCollection from "./collections/articles";

const config = {
  backend: {
    name: "git-gateway",
    branch: "staging",
    cms_label_prefix: "content/editorial/",
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
