const _capitalize = (word) => (word.charAt(0).toUpperCase + word.substr(1));

const _makeField = (widget_name) => (
	(label = _capitalize(widget_name), name = widget_name, required = true) => ({
		label,
		name,
		widget: widget_name,
		required,
	})
);

export const textField = _makeField('text');
export const markdownField = _makeField('markdown');
export const imageField = _makeField('image');
export const stringField = _makeField('string');

export const intField = (
	label = "String",
	name = "string",
	required = true
) => ({
	label,
	name,
	widget: "number",
	required,
	value_type: 'int',
})

export const dateField = (
	label = "Date",
	name = "date",
	required = true
) => ({
	label,
	name,
	widget: "datetime",
	required,
	format: "YYYY-MM-DD",
	time_format: false,
})

export const dateTimeField = (
  label = "DateTime",
  name = "datetime",
  required = true
) => ({
  label,
  name,
  widget: "datetime",
  required,
	format: "YYYY-MM-DDTHH:mm:ssZZ",
	time_format: true,
})

export const multiselectField = (
  label = "Options",
  name = "options",
	options = [],
  required = true
) => ({
  label,
  name,
  widget: "select",
  required,
	options,
	multiple: true,
})

export const objectField = (
  label = "Object",
  name = "object",
  fields = [],
  required = true
) => ({
  label,
  name,
  widget: "object",
  fields,
  required,
})

export const objectListField = (
  label = "List",
  name = "list",
  fields = [],
  required = true
) => ({
  label,
  name,
  widget: "list",
  fields,
  required,
})

export const simpleListField = (
	item_widget = stringField,
  label = "List",
  name = "list",
  required = true
) => ({
  label,
  name,
  widget: "list",
	field: item_widget('Value', 'value', true),
  required,
})

export const hiddenField = (
  label = "Hidden",
  name = "hidden",
  default_value = ""
) => ({
  label,
  name,
  widget: "hidden",
  default: default_value,
	required: true,
})
