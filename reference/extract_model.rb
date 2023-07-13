require 'psych'

# Load the YAML file
openapi_doc = Psych.load_file('Chargify-API.v1.yaml')

# Extract the "subscription_group" property from the "Update-Subscription-Group-Response"
subscription_group = openapi_doc['components']['schemas']['Update-Subscription-Group-Response']['properties']['subscription_group']

# Save the extracted property to a new YAML file
File.open('../models/Subscription-Group.yaml', 'w') { |file| file.write(Psych.dump(subscription_group)) }

# Load the Subscription-Group model
subscription_group_model = Psych.load_file('../models/Subscription-Group.yaml')

# Replace the "subscription_group" property in the "Update-Subscription-Group-Response" with a reference to the model
openapi_doc['components']['schemas']['Update-Subscription-Group-Response']['properties']['subscription_group'] = {
    '$ref' => '../models/Subscription-Group.yaml'
}

# Save the updated YAML file
File.open('Chargify-API.v1.yaml', 'w') { |file| file.write(Psych.dump(openapi_doc)) }
