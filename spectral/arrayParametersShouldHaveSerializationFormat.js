export default (param, _, context) => {
  // if this is actually a property called properties, ignore
  if (context.path.join(".").includes("properties.properties")) {
    return;
  }

  // check if the param is an array
  if (!(param.schema && param.schema.type === "array")) return;

  if (!param.style || param.explode == null) {
    return [
      {
        message: `Array parameter "${param.name}" should have an explicit serialisation using 'style' and 'explode'`,
      },
    ];
  }
};
