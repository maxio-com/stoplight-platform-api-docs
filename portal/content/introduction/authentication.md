# Authentication

Learn how to use API authentication to communicate directly with Advanced Billing from any programming language that you wish.

---

There are two methods of authentication, depending on what you are accessing:

- [Chargify API]($e/Subscriptions)
- [Chargify.js](page:development-tools/chargify-js/chargify-js-overview)

Both methods of authentication assume you have previously generated API keys securely stored them for later use. For more information, see this help article on [Adding Users](https://maxio-chargify.zendesk.com/hc/en-us/articles/5404829390349-Users#adding-users).

## API

The first method of interaction is through the API. API Authentication is implemented as HTTP Basic Authentication over TLS (HTTPS).

Your API login credentials are not the same as the credentials you use to log in to the web interface. You must obtain your API credentials separately, and you must connect to the API via TLS 1.2 (or better).

> Advanced Billing no longer supports TLS 1.0 or TLS 1.1 over HTTPS on the chargify.com domain. Any older browsers or API clients that do not support TLS 1.2 will no longer work. This change is mandated by the PCI Security Council and affects all merchants and service providers processing or transmitting credit card data. For more information, please see our help article on [Security](https://maxio-chargify.zendesk.com/hc/en-us/articles/5404986900493).

One of the most common calls you will make via the API is to retrieve a list of subscriptions to retrieve additional information, such as the status of a specific subscription. A simple way to authenticate is to use the API Key as the _username_ and "X" as the _password_, like the following:

```
curl https://{subdomain}.chargify.com/subscriptions.{format} \
  -u '{API_key}:X' \
  -H 'content-type: application/json' \
  -X GET
```

If passing the Basic Authentication header, the API key and password require base64 encoding:

```
curl --request GET \
  --url 'https:///{subdomain}.chargify.com/subscriptions.{format}' \
  --header 'authorization: Basic PDxhcGlfa2V5Pj46...' \
  --header 'content-type: application/json'
```

> ❗️ Please note, the API is case-sensitive.

---

# Next Steps

After you've mastered authentication, you should check out the following articles:

- Managing [sites](page:introduction/connected-sites)
- Creating [products](page:core-concepts/product-catalog#product) and how they control what you bill customers
- Creating [subscriptions](page:core-concepts/subscription-signup), (ie. signing up customers)
