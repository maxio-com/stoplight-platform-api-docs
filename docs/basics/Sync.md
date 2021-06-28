---
tags: [Basics]
---

# Sync

After creating and managing subscriptions, you might need a way for your application to know about the state of a customers subscription. This can be done either directly through the API or by Chargify notifying your application using the handy [webhooks](https://help.chargify.com/webhooks/introduction.html) feature.

----------

There are three basic methods of either allowing or notifying your application about the state of a customers subscription:

- Using the [API](/content/basics/sync.html#api) to retrieve subscription information
- Recieving [webhooks](/content/basics/sync.html#receiving-a-webhook-notification)
- Manually export

## API

One of the easiest methods is just to have your application request the current state (or history) of a subscription using the API. This will provide the current state of the subscription at the time of the request.

### Subscription State

To get the current state of a subscription, it's as simple as the following:

    HTTP GET https://{subdomain}.chargify.com/subscriptions/{subscription_id}.{format}

You will receive all the current information about the subscription, including (but not limited to):

 - Subscription details (subscription state, creation, balance, next assessment date, cancellation information, etc).
 - Customer details
 - Payment details

For more detailed information, see API documentation on [reading the subscription](https://chargify.stoplight.io/docs/api-documentation/reference/Chargify-API.v1.yaml/paths/~1subscriptions~1%7Bsubscription_id%7D.json/get).

### Best Practices

The following are some best practices that we would suggest regarding using API and how you synchronize your application with your Chargify data:

1. Your application should try and not depend on another service to control access directly. Should your API call fail, for any reason, then your customer might not receive the best user experience depending on how you've implemented this.
2. You should try and limit the direct calls to Chargify if (and when) possible as there is a limit to how fast (and how often) the Chargify API will respond to very quick and numerous API calls. For more information, see [limits and blocks](https://chargify.stoplight.io/docs/api-documentation/docs/basics/API-Access-Limitations.md).

## Webhooks

Webhooks offer a way to quickly find out about changes to your Subscriptions that happen within Chargify. You can subscribe to events of interest, and we’ll post data to the URL you specify when one of those events occurs.

For more general information, see [webhooks](https://help.chargify.com/webhooks/introduction.html).

### Using Webhooks

To begin using webhooks, you must first create an publicly accessible endpoint which has the following characteristics:

1. We allow HTTP endpoints only while in test mode. You'll be required to switch to HTTPS before you can move to live mode.
2. The endpoint you provide to Chargify must be on port 80 or 443, these are the only supported ports.
3. Your endpoint must accept HTTP POST requests to your URL with a form-encoded body.

Once you have a public URL which Chargify can attempt to send data to, then you can begin accepting requests and sending the expected `200 OK` response.

In general, the normal process for using webhooks is:

1. At Chargify, some event to which your webhook URL is subscribed occurs. For example, a new customer has signed up on your site - creating a new subscription.
2. At some point, Chargify makes a request to your webhook URL which contains the signup event data.
3. You receive the signup event data.
4. You verify the signup event data (using signature validation).
5. You perform some action using the validated event data, like sending a welcome email to the customer or provision your services.
6. You respond `200 OK` to the initial request, thereby completing the webhook transaction with Chargify.

Please see [webhooks](https://help.chargify.com/webhooks/introduction.html) documentation for more information.

### Configuring Webhooks

Webhooks are a simple method of allowing Chargify system to "speak" directly with yours, rather than having your system poll Chargify to always obtain the latest information.

Webhooks, as configured in your Chargify account, are as simple as:

* A [URL](https://en.wikipedia.org/wiki/Uniform_Resource_Locator)
* A set of [events](https://help.chargify.com/webhooks/webhooks-reference.html#events) that you wish to subscribe to

You may enable/disable webhooks as you require them, they are not required to be used but they do have considerable benefit.

Please see [configuring webhooks](https://help.chargify.com/webhooks/webhooks-reference.html#configuring-webhooks) documentation for more information.

### Testing Webhooks

For initial testing, there are a number of options that you can use.

Before you have a publicly accessible endpoint available, or if you just are looking at webhook for troubleshooting - we suggest using a tool like https://requestbin.fullcontact.com/. Requestbin provides a temporary URL that Chargify may send messages to, allowing you to view them easily within their application. The "bins" are temporary. This can provide quick insight into the content or headers Chargify will be sending.

Chargify's webhook feature provides a test method that will send a simple message to any single webhook URL you specify. This test message is useful for verifying connectivity between your URL and Chargify,

### Receiving a Webhook Notification

To enable the receipt of webhooks, simply enable them from within your site settings - selecting which events the endpoint should be receiving. A good flow for testing the receipt of webhooks and getting started is the following:

1. Setup publically accessible webhook handler
2. Enable webhooks at that endpoint, enable events you need to interact with (at the very least `subscription_state_change`, triggered when subscriptions move from active to cancelled)
3. Send a test event
4. Check your signature verification code, check that you are responding `200 OK`
5. Add the specific event processing code you need

### Responding to a Webhook

Upon receipt of a webhook, you should accept it by returning an HTTP `200 OK` response as quickly as possible. Sending any other response (i.e. `500 Internal Server Error`, `404 Not Found`, etc.) OR failing to return a response within approximately 15 seconds will result in automatic retries of the webhooks.

For more details on the retry mechanism and webhook replay, see our [documentation](https://help.chargify.com/webhooks/webhooks-reference.html#webhook-acknowledgement-and-automatic-retries).

### Verifying Events

Webhooks are signed with a signature generated by taking an HMAC-SHA-256 hex digest of the raw HTTP body of the webhook post, using your shared key as the secret.

For example, in Ruby:
```ruby
OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new('sha256'), site.shared_key, webhook.body)
```

To verify events, you will need to perform signature validation - that is validate that the signature included with the request matches exactly what is expected given the content being delivered.

You may either retrieve the signature value through the header `X-Chargify-Webhook-Signature-Hmac-Sha-256` or by specifying that the signature should be included in the query string by using the `{signature_hmac_sha_256} `replacement variable:

```http
http://example.com/?signature={signature_hmac_sha_256}
```
Please see [webhook signature verification](https://help.chargify.com/webhooks/webhooks-reference.html#webhook-verification) for more information.

### Best Practices

The following are some best practices that we would suggest regarding webhooks:

* Webhooks are **asynchronous events**. We do our best to always send them in a timely manner, but we **DO NOT** recommend on relying on webhooks for events that are time sensitive.
* We **DO NOT** recommend that you block a user from moving forward with provisioning or signup on your side based on a webhook response. The appropriate method is to query the subscriptions API to verify a subscription.

----------

# Next Steps
- [Managing](/content/basics/subscriptions.html) your subscriptions
- API documentation for [webhooks](https://chargify.stoplight.io/docs/api-documentation/reference/Chargify-API.v1.yaml/paths/~1endpoints.json/post)
