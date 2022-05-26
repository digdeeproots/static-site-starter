export const textField = (label = "Text", name = "text", required = false) => ({
  label,
  name,
  widget: "text",
  required,
})

export const markdownField = (label = "Markdown", name = "markdown", required = true) => ({
  label,
  name,
  widget: "markdown",
  required,
})

export const stringField = (
  label = "String",
  name = "string",
  required = false
) => ({
  label,
  name,
  widget: "string",
  required,
})

export const dateField = (
  label = "Date",
  name = "date",
  required = false
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
  required = false
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
  required = false
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

export const listField = (
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

export const stringListField = (
  label = "List",
  name = "list",
  required = true
) => ({
  label,
  name,
  widget: "list",
	field: {name: "items", label: "Items", widget: "string"},
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
