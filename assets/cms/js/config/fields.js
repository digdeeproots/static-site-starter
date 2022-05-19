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

export const hiddenField = (
  label = "Hidden",
  name = "hidden",
  default_value = ""
) => ({
  label,
  name,
  widget: "hidden",
  "default": default_value,
})
