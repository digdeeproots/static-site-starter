import { collectionDefaults } from "../../patterns";
import homePageConfig from "./home";
// import aboutPageConfig from "./about";

const pagesCollection = {
  ...collectionDefaults("Pages", "pages"),
  files: [homePageConfig],
};

export default pagesCollection;
