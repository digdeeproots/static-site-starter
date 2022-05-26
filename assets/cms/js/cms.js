window.CMS_MANUAL_INIT = true;

import React from "react";
import CMS from "netlify-cms-app";
import { ParentControl, ParentPreview} from "./ParentWidget";

// import HomePreview from "./cms-preview-templates/home";
// import PostPreview from "./cms-preview-templates/post";

// CMS.registerPreviewTemplate("home", HomePreview);
// CMS.registerPreviewTemplate("article", PostPreview);

// import myCustomEditorComponent from "./editor-components";
// CMS.registerEditorComponent(myCustomEditorComponent);

CMS.registerWidget('parent', ParentControl, ParentPreview);
CMS.registerPreviewStyle(window._DR_MAIN_CSS_FILE);

import { config } from "./config";

window.CMS_CONFIGURATION = config;
CMS.init({ config });
