import React from "react";
import CMS from "netlify-cms-app";

import HomePreview from "./cms-preview-templates/home";
import PostPreview from "./cms-preview-templates/post";
import ValuesPreview from "./cms-preview-templates/values";
import ContactPreview from "./cms-preview-templates/contact";

CMS.registerPreviewTemplate("home", HomePreview);
CMS.registerPreviewTemplate("post", PostPreview);
CMS.registerPreviewTemplate("values", ValuesPreview);
CMS.registerPreviewTemplate("contact", ContactPreview);

// import myCustomEditorComponent from "./editor-components";
// CMS.registerEditorComponent(myCustomEditorComponent);

import config from "./config";

window.CMS_MANUAL_INIT = true;
window.CMS_CONFIGURATION = config;
CMS.init({ config });
