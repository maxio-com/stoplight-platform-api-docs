require 'psych'
require 'fileutils'

# Load the YAML file
openapi_doc = Psych.load_file('Chargify-API.v1.yaml')

# Create directories for components and endpoints
FileUtils.mkdir_p(['components', 'endpoints'])

# Extract each component to a separate file and replace it with a reference in the original document
openapi_doc['components']['schemas'].each do |name, schema|
  File.open("components/#{name}.yaml", 'w') { |file| file.write(Psych.dump(schema)) }
  openapi_doc['components']['schemas'][name] = { '$ref' => "./components/#{name}.yaml" }
end

# Group the endpoints by the first part of their path
endpoints = Hash.new { |h, k| h[k] = {} }
openapi_doc['paths'].each do |path, methods|
  group = path.split('/')[1]
  endpoints[group][path] = methods
end

# Extract each group of endpoints to a separate file and replace them with references in the original document
endpoints.each do |group, paths|
  File.open("endpoints/#{group}.yaml", 'w') { |file| file.write(Psych.dump(paths)) }
  paths.each_key { |path| openapi_doc['paths'][path] = { '$ref' => "./endpoints/#{group}.yaml" } }
end

# Save the updated YAML file
File.open('Chargify-API.v1.dev.yaml', 'w') { |file| file.write(Psych.dump(openapi_doc)) }
