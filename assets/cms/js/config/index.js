// Import the configuration of each collection from cms/config/collections
// import blogPostsCollection from "./collections/blog-posts";
import pagesCollection from "./collections/pages";
import articlesCollection from "./collections/articles";
// import pressReleasesCollection from "./collections/press-releases";
// import servicesCollection from "./collections/services";
// import siteConfigurationCollection from "./collections/site-configuration";
// import testimonialsCollection from "./collections/testimonials";

// Build the Netlify JS configuration object
const config = {
  backend: {
    name: "git-gateway",
    // name: "github",
    // repo: "website",
    branch: "staging",
    cms_label_prefix: "content/editorial/",
    // auth_type: "implicit",
    // app_id: "MY_APP_ID",
    // api_root: "https://my-self-hosted-gitlab.com/api/v4",
    // base_url: "https://my-self-hosted-gitlab.com",
    // auth_endpoint: "oauth/authorize",
  },
  load_config_file: false,
  publish_mode: "editorial_workflow",
  media_folder: "static/img",
  public_folder: "/img",
  collections: [
    pagesCollection,
		articlesCollection,
    // servicesCollection,
    // blogPostsCollection,
    // commonPageSectionsCollection,
    // testimonialsCollection,
    // pressReleasesCollection,
    // siteConfigurationCollection,
  ],
};

export default config;
