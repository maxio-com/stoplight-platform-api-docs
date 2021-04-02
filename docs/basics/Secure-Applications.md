---
tags: [Basics]
---

# Secure Applications

Please note that it is NOT possible to make API requests directly from the customer's browser or device.  Doing so would expose your API key on the client side, and anyone who has that key has full access to all of your Chargify data. 

Instead you will need to take care to tokenize sensitive information by using [Chargify.js](https://developer.chargify.com/content/chargify-js/chargify-js.html) or a similar JavaScript library provided by your gateway, and then post the token and other information to your own server, from which you can make the API call to Chargify.

### Troubleshooting

If you attempt to make a Chargify API request directly from the customer's browser, you may see an error such as: 

```Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.```

```Origin 'https://example.com' is therefore not allowed access.` `The response had HTTP status code 404.```

This is an error message indicating that Cross-Origin Resource Sharing (CORS) is not enabled on the Chargify server.