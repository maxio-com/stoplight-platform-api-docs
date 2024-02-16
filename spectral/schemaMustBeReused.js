export default (schema, _, context) => {
  if (schema.oneOf) {
    return validateComplexSchema(schema.oneOf);
  }
  if (schema.anyOf) {
    return validateComplexSchema(schema.anyOf);
  }
  if (schema.allOf) {
    return validateComplexSchema(schema.allOf);
  }

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

  function validateComplexSchema(complexSchema) {
    if (complexSchema.filter((element) => !element["$ref"]).length > 0) {
      return [
        {
          message: "Only $ref can be used in 'oneOf/anyOf/allOf'",
        },
      ];
    }
  }
};
