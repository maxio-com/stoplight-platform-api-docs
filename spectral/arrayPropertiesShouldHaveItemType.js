export default (param, _, context) => {
  // if this is actually a property called properties, ignore
  if (context.path.join(".").includes("properties.properties")) {
    return;
  }

  // check if the param is an array
  if (param.type !== "array") return;

  if (
    !param.items ||
    !(
      param.items.type ||
      param.items["$ref"] ||
      param.items.oneOf ||
      param.items.anyOf ||
      param.items.allOf
    )
  ) {
    return [
      {
        message: `All properties of type array need an item type or $ref`,
      },
    ];
  }
};
