import { nestedFolderCollection } from "../../patterns";

const articlesCollection = {
  ...nestedFolderCollection("Article", 'article'),
};

export default articlesCollection;
