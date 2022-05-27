const _capitalize = (word) => (word.charAt(0).toUpperCase + word.substr(1));

const _makeField = (widget_name, extra_widget_params = {}) => (
	(label = _capitalize(widget_name), name = widget_name, required = true) => ({
		label,
		name,
		widget: widget_name,
		required,
		...extra_widget_params,
	})
);

export const textField = _makeField('text');
export const markdownField = _makeField('markdown');
export const imageField = _makeField('image');
export const stringField = _makeField('string');
export const intField = _makeField('number', {value_type: 'int'});
export const dateField = _makeField('datetime', {format: "YYYY-MM-DD", time_format: false});
export const dateTimeField = _makeField('datetime', {format: "YYYY-MM-DDTHH:mm:ssZZ", time_format: true});

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
  label = "List",
  name = "list",
	item_widget = stringField,
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
