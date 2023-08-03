export default (param, _, context) => {
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
