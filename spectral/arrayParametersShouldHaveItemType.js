export default (param, _, context) => {
  // check if the param is an array
  if (!(param.schema && param.schema.type === "array")) return;

  if (
    !param.schema.items ||
    !(
      param.schema.items.type ||
      param.schema.items["$ref"] ||
      param.schema.items.oneOf ||
      param.schema.items.anyOf ||
      param.schema.items.allOf
    )
  ) {
    return [
      {
        message: "All parameters of type array need an item type or $ref",
      },
    ];
  }
};
