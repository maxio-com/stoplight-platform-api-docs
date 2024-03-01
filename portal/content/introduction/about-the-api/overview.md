# Tips and Best Practices

> Maxio Advanced Billing (formerly Chargify) provides an HTTP-based API that conforms to the principles of REST. One of the many reasons to use Advanced Billing is the immense feature set and surrounding community [client libraries](https://developers.chargify.com/docs/developer-docs/ZG9jOjE0NjAzNDI2-api-code-samples). The Maxio API returns JSON responses as the primary and recommended format, but XML is also provided as a backwards compatible option for Merchants who require it.

Our many merchants all use our API for different purposes. API access is included on all plans at no charge because we believe that you are the owner of your data and you should never feel like your data is "locked up".

However, because the API means there is little or no user-interaction, it can be very easy to create a program or routine that causes an unnecessarily high burden on our system. Even small accounts can generate huge numbers of expensive API requests by accident.

In order to maintain a high quality of service for everyone, we ask that you be cautious when implementing your API integration to avoid run-away usage that is disproportionate to the size of your account.

Here are some tips and best-practices to help keep both your site and ours running smoothly.

## Development

If you’re having difficulty executing a request via our API, try the simplest thing and attempt your request via the curl command-line tool, as shown in the below example. Add the `--verbose` flag to your request to receive even more debugging information.

Another handy tool is [Webhook.site](https://webhook.site/). You could send your request to their temporary URL instead of us to see visually what it is you’re sending, if you’re not sure.

While you can certainly write your own code to interact with Advanced Billing, it's likely someone has already written code for your platform.

## Getting Subscription States

You likely want to check if your customer has an active account, has cancelled, or is behind on his/her payments. The best approach is to keep a local cached copy of the subscription’s state in your own database. You can use [Webhooks](https://developers.chargify.com/docs/api-docs/b3A6MTQxMDgyNjU-create-endpoint) to keep up-to-date in near real-time on any changes that occur. This keeps your website up, reduces your coupling to Advanced Billing, and ensures both sites remain as fast as possible.

Avoid querying Advanced Billing in-line as part of a customer’s request to your site. Doing so could result in:

- Slowing down your own site while the customer waits for a check to Advanced Billing on every request.
- If there is a network connectivity issue or in the unlikely event that Advanced Billing is down, your site will also break.
- As you grow and your customers are more active, you will use up huge numbers of API requests that could result in being blocked because of our automatic abuse prevention.

## Synchronizing Your Database

Normally you should keep your local customer database in sync by using [webhooks](https://developers.chargify.com/docs/api-docs/b3A6MTQxMDgyNjU-create-endpoint). But if you think your database has become out of sync with Advanced Billing, then using the API to check the state of all subscriptions may be the only way to ensure consistency.

It’s perfectly okay to do this as needed. But it should generally only be relied upon in exceptional circumstances or for periodic reconciliation (usually no more than once a month).

## Reporting Usage

When reporting component usage, avoid sending lots of tiny usage amounts. If you charge by the minute for phone calls, for instance:

- **Don’t** send in a usage for every minute or every phone call individually.
- **Don’t** send all usage for all customers all at once. Spread it out or wait a short period of time between each request

Instead:

- **Do** send a usage report once a day with how much a customer used for the whole day.

For more information on reporting component usage or allocations, please see the specific section for the type of component used:

- [API docs for reporting metered usage](https://developers.chargify.com/docs/api-docs/b3A6MTQxMDgzODQ-create-usage)
- [API docs for allocating quantity-based components](https://developers.chargify.com/docs/api-docs/b3A6MTQxMDgzNzg-allocate-component)

## Downloading Bulk Data

Periodically exporting transaction, subscription, or customer data is a common use case. When possible, we recommend using the built-in [export](https://maxio-chargify.zendesk.com/hc/en-us/articles/5404681593741) functions inside Advanced Billing to generate reports and download the data. This can often be much faster and can significantly lower your API usage.

## Secure Applications

Please note that it is NOT possible to make API requests directly from the customer's browser or device. Doing so would expose your API key on the client side, and anyone who has that key has full access to all of your Chargify data.

Instead you will need to take care to tokenize sensitive information by using [Chargify.js](https://developers.chargify.com/docs/developer-docs/ZG9jOjE0NjAzNDI0-overview) or a similar JavaScript library provided by your gateway, and then post the token and other information to your own server, from which you can make the API call to Chargify.

#### Troubleshooting

If you attempt to make a Chargify API request directly from the customer's browser, you may see an error such as:

```
Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

or

```
Origin 'https://example.com' is therefore not allowed access.` `The response had HTTP status code 404.
```

This is an error message indicating that Cross-Origin Resource Sharing (CORS) is not enabled on the Chargify server.

## Sync

After creating and managing subscriptions, you might need a way for your application to know about the state of a customers subscription. This can be done either directly through the API or by Advanced Billing notifying your application using the handy [webhooks](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405568068365-Webhooks-Introduction) feature.

---

There are three basic methods of either allowing or notifying your application about the state of a customers subscription:

- Using the [API](#api) to retrieve subscription information
- Recieving [webhooks](#receiving-a-webhook-notification)
- Manually [export](https://maxio-chargify.zendesk.com/hc/en-us/articles/5404681593741-Exporting-Data#locating-exports)

One of the easiest methods is just to have your application request the current state (or history) of a subscription using the API. This will provide the current state of the subscription at the time of the request.

### Subscription State

To get the current state of a subscription, it's as simple as the following:

    HTTP GET https://{subdomain}.chargify.com/subscriptions/{subscription_id}.{format}

You will receive all the current information about the subscription, including (but not limited to):

- Subscription details (subscription state, creation, balance, next assessment date, cancellation information, etc).
- Customer details
- Payment details

For more detailed information, see API documentation on [reading the subscription](https://developers.chargify.com/docs/api-docs/b3A6MTQxMDg0MDM-read-subscription).

### Best Practices

The following are some best practices that we would suggest regarding using API and how you synchronize your application with your Advanced Billing data:

1. Your application should try and not depend on another service to control access directly. Should your API call fail, for any reason, then your customer might not receive the best user experience depending on how you've implemented this.
2. You should try and limit the direct calls to Advanced Billing if (and when) possible as there is a limit to how fast (and how often) the Advanced Billing API will respond to very quick and numerous API calls. For more information, see [limits and blocks](https://developers.chargify.com/docs/developer-docs/fb8406f1615d1-api-guidelines#about-limits--blocks).
