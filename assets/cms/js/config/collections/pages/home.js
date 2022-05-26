import { textField } from "../../fields";
import {
	pageDefaults,
} from "../../patterns";

export default {
	label: "Home page",
	name: "home",
	file: "content/en/_index.html",
	fields: [
		...pageDefaults,
		textField('Body', 'body', true),
	],
};
