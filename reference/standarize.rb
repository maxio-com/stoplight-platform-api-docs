require 'psych'

# Load the YAML file
openapi_doc = Psych.load_file('Chargify-API.v1.yaml')

# Save the YAML file, which will standardize the formatting
File.open('Chargify-API.v1.yaml', 'w') { |file| file.write(Psych.dump(openapi_doc)) }
