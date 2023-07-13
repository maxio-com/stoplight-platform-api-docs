require 'psych'

# Load the YAML file
openapi_doc = Psych.load_file('Chargify-API.v1.yaml')

# Create new components
openapi_doc['components']['schemas']['Update-Subscription-Group'] = openapi_doc['paths']['/subscription_groups/{uid}.json']['put']['requestBody']['content']['application/json']['schema']['properties']['subscription_group']

openapi_doc['components']['schemas']['Update-Subscription-Group-Request'] = {
  'type' => 'object',
  'properties' => {
    'subscription_group' => { '$ref' => '#/components/schemas/Update-Subscription-Group' }
  }
}

openapi_doc['components']['schemas']['Update-Subscription-Group-Response'] = openapi_doc['paths']['/subscription_groups/{uid}.json']['put']['responses']['200']['content']['application/json']['schema']

# Update the PUT method of the '/subscription_groups/{uid}.json' endpoint
openapi_doc['paths']['/subscription_groups/{uid}.json']['put']['requestBody']['content']['application/json']['schema'] = {
  '$ref' => '#/components/schemas/Update-Subscription-Group-Request'
}
openapi_doc['paths']['/subscription_groups/{uid}.json']['put']['responses']['200']['content']['application/json']['schema'] = {
  '$ref' => '#/components/schemas/Update-Subscription-Group-Response'
}

# Dump the updated OpenAPI document to a string
updated_yaml = Psych.dump(openapi_doc)

# Save the updated OpenAPI document as a new YAML file
File.open('Chargify-API.v1.yaml', 'w') { |file| file.write(updated_yaml) }
