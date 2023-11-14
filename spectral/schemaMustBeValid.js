export default (schema, _, context) => {
  if (schema.oneOf || schema.anyOf || schema.allOf) return;

  if (
    schema.type === "object" &&
    (!schema.properties || Object.keys(schema.properties).length === 0) &&
    !schema.additionalProperties
  ) {
    return [
      {
        message: "Schema for type 'object' must define valid 'properties'",
      },
    ];
  }

  if (!schema.type && !schema.properties && !schema["$ref"]) {
    return [
      {
        message: "Schema must use '$ref' or 'type' with 'properties'",
      },
    ];
  }
};
