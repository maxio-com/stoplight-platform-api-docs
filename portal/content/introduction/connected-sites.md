# Connected Site Subdomains

Learn how to use sites to organize your business and provide the setup necessary to interact with Advanced Billing via the API. If you need help after reading this, please [let us know](./Overview.md#support) so we can help and also improve this documentation.

---

When you are new to Advanced Billing, we will create your first site for you after you choose a currency. Sites are simply "containers" for your products, customers, and subscriptions. You can use Advanced Billing with just one site, although most merchants will want two sites at a minimum – one for **testing** and one for **production.**

## Site Access

To manage your sites, [login to Advanced Billing](https://app.chargify.com/login) and view your sites.

From here you can:

- Create a new site
- Go to any site dashboard
- Clone any site (ie. Make a copy of the structure of a site, including: products, components, families, etc)
- Edit any site (currency, name, date/time format, timezone, etc)
- Delete any site

To begin, create a site (make sure to put it in test mode) and pick a subdomain that you will remember for use in your API calls.

For more information about sites, including: switching sites, clearing site data, cloning - please see [this help article on Sites Introduction](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405551351693-Sites-Introduction).

## Site API Subdomain

Every site has the ability to have one or more API keys associated with it to allow API access. The subdomain name is used in API calls to direct what site should be used in the context of the API call.

For example, if you have a site called "Acme, Inc." with the subdomain "acme" then you would use a call similar to:

```perl
curl -u <API_KEY>:X -H Accept:application/json -X GET https://acme.chargify.com/subscriptions.json
```

The host is always in the form `https://<SUBDOMAIN>.chargify.com` followed by the URI for the API resource you are trying to access. In this last example, that would be `/subscriptions.json` as that is the URI of the resource to get a list of subscriptions in JSON.

Please see our [API documentation](https://developers.chargify.com/docs/api-docs/YXBpOjE0MTA4MjYx-chargify-api) for more information.

## Clearing Site Data

Clearing your site data is very useful in specific circumstances:

- When in **development/test**, clearing your site data allows you remove records that you added in for testing.
- When moving to **production/live mode**, clearing your site data is necessary for allowing your gateway to actually process real money.

Clearing your site data can be done in the following methods:

1. Clearing site data via the [website](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405551351693-Sites-Introduction#creating-sites)
2. Clearing site data via [API](https://developers.chargify.com/docs/api-docs/c912e634019c9-clear-site-data)

### Clearing via Website

To clear your site data via the website, please see the [help article, "Clearing Site Data"](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405428327309).

### Clearing via API

There are a few options for clearing your site data, which match the settings available if you perform this action through the website. The most basic is clearing _all your data_:

```perl
curl -u <API_KEY>:X -H Accept:application/json -X POST https://acme.chargify.com/sites/clear_data.json
```

For more information about the parameters for clearing your site data using the API, please see the [API documentation](https://developers.chargify.com/docs/api-docs/b3A6MTQxMDgyNjk-clear-site-data).

---

# Next Steps

After you've created a new site, you should check out the following articles:

- [Products](./Products.md)
- [Subscriptions](../basics/Signups.md)
