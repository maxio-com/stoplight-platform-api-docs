require 'psych'

def load_yaml_ref(ref)
  path = ref.sub(/^\.\//, '')
  Psych.load_file(path)  # Load the entire contents of the referenced YAML file
end

# Load the OpenAPI document
openapi_doc = Psych.load_file('reference/Chargify-API.v1.dev.yaml')

# Resolve $ref dependencies for components
openapi_doc['components']['schemas'].each do |name, schema|
  if schema.is_a?(Hash) && schema['$ref']  # Check that the schema is a hash before trying to access its $ref property
    openapi_doc['components']['schemas'][name] = load_yaml_ref(schema['$ref'])
  end
end

# Resolve $ref dependencies for paths
openapi_doc['paths'].each do |path, methods|
  if methods.is_a?(Hash) && methods['$ref']  # Check that the methods is a hash before trying to access its $ref property
    group = path.split('/')[1]
    openapi_doc['paths'][path] = load_yaml_ref(methods['$ref'])[path]
  end
end

# Save the resolved OpenAPI document
File.open('reference/Chargify-API.v1.yaml', 'w') { |file| file.write(Psych.dump(openapi_doc)) }

puts "Chargify-API.v1.dev.yaml refs were resolved into Chargify-API.v1.yaml"
