export default (schema, _, context) => {
  if (schema.oneOf || schema.anyOf || schema.allOf) return;

  if (schema.type === "array") {
    if (schema.items && schema.items["$ref"] === "object") {
      return [
        {
          message: "Use $ref in 'items' field for 'array' type",
        },
      ];
    } else return;
  }

  if (schema.type !== "object") return;

  if (!schema["$ref"]) {
    return [
      {
        message: "Use $ref instead of inline schema",
      },
    ];
  }
};
