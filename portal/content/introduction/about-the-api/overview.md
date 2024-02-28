# Overview

Maxio Advanced Billing (formerly Chargify) provides an HTTP-based API that conforms to the principles of REST. One of the many reasons to use Advanced Billing is the immense feature set and surrounding community [client libraries](https://developers.chargify.com/docs/developer-docs/ZG9jOjE0NjAzNDI2-api-code-samples). The Maxio API returns JSON responses as the primary and recommended format, but XML is also provided as a backwards compatible option for Merchants who require it.

# Tips and Best Practices

Our many merchants all use our API for different purposes. API access is included on all plans at no charge because we believe that you are the owner of your data and you should never feel like your data is "locked up".

However, because the API means there is little or no user-interaction, it can be very easy to create a program or routine that causes an unnecessarily high burden on our system. Even small accounts can generate huge numbers of expensive API requests by accident.

In order to maintain a high quality of service for everyone, we ask that you be cautious when implementing your API integration to avoid run-away usage that is disproportionate to the size of your account.

Here are some tips and best-practices to help keep both your site and ours running smoothly.

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

## About Limits and Blocks

There are two different types of limits/blocks you may encounter: rate-based and account-based. Please familiarize yourself with both types of limits, as they are vastly different.

Our rate limiting rules are primarily intended to prevent runaway scripts, infinite loops, or crushing amounts of concurrency. Working, good-hygiene code should not experience any blocks. The single most important guidelines are to write code that will properly handle 429 responses by slowing or pausing requests without crashing, and to not parallelize into simultaneous requests that will compete for resources and flood our systems.

Advanced Billing uses a custom algorithmic slot-based limiting that isn't based on typical rate limit / seconds. Rather, we handle call limiting based on concurrency, and API calls can be requested at a max of 4 concurrent requests. This does not mean that only 4 requests are allowed per second -- rather, 4 server threads / workers can be running concurrently per subdomain at a time. Any concurrency that goes above 4 is at risk for being queued for processing after the concurrency once again drops to acceptable ranges. As such, we recommend when building out your API processes to focus on the number of concurrent calls rather than the actual rate of calls per hour.

To help illustrate this, we've provided a diagram below. Presume that each API call takes a full minute. While this will likely not be the case for your own processes, it does illustrate the limitations for calls.

| ![Concurrency Graphic](../../assets/images/docs/getting-started/API-Guidelines.md/concurrency_graphic.jpg) |
| ---------------------------------------------------------------------------------------------------------- |
| **Diagram of concurrency-based rate limiting presuming a limit of 2 threads at a time**                    |

### Rate-based Blocks

When doing a large synchronization or retrieving a large amount of data, you may trigger a security failsafe used to prevent abuse and protect our site from attacks. We don’t want to block small bursts in usage. So instead of immediately rejecting your requests, Advanced Billing will slow and throttle requests.

❗️ If you see your responses coming in slower, do not parallelize your requests or try to make more concurrent requests to speed things up. You’ll only have to wait longer for your requests to get through.

If you have too many slowed requests, or your individual account queue gets too full with too many concurrent requests, you’ll likely receive an HTTP `429 Too Many Requests` response code with a message and a reference code:

`Your request was denied due to a usage violation. You can track this request with support by referencing …`

If you receive a `429 Too Many Requests` response, your code should be prepared to handle it by pausing its queries, waiting a few minutes, and then proceeding slower (or with less concurrency). Please feel free to [contact support and open a support ticket](https://maxio-chargify.zendesk.com/hc/en-us/requests/new) so we can help describe what happened and why the request was blocked.

### Account-based Blocks

There are a few scenarios that may end up in causing an API request to be blocked even with correct credentials. You can read about them [here](https://developers.chargify.com/docs/api-docs/YXBpOjE0MTA4MjYx-chargify-api#api-access-limitations). If you have a request blocked with a `422` status code and an error message, it may be due to this account-based blocking.

### Prioritization of Endpoints

We consider certain endpoints as "critical", such as new customer signups and component allocations. We first and foremost want to ensure that we don't prevent a new signup except under the most extreme situations. Many merchants have a mix of all different types of calls. By dynamically balancing, we can slow down "low priority" requests (reports and exports), while still handling large unexpected surges in signups.

### Endpoint Variances

Each endpoint is different within Advanced Billing. Expensive endpoints have lower limits than fast endpoints. But in general, your requests will slow down because of sending too many simultaneous requests to the same endpoint(s). When you do that, your requests will be "queued" behind yourself. One request must wait for the one in front of it to finish. In that way, we 'level out' spikes of requests over a longer period of time so that it doesn't cause a negative impact for other merchants. This is why you'd see requests be processed at a slower rate.

### Timeout Limitation

Advanced Billing imposes a cut-off time of 120 seconds for all requests to all endpoints. It's important to note that when you make requests for specific actions, Advanced Billing is also sending these requests off to your associated gateway. If a request is not processed by the combination of Advanced Billing and your gateway within the 120 second guideline, the request will time out.

Please keep in mind that if you encounter a timeout issue, it is worth inspecting your gateway's [current status.](https://maxio-chargify.zendesk.com/hc/en-us/articles/5404860594189) This is also important to do if you feel there is a processing issue, outside of Advanced Billing's control, that is affecting your requests.

# Sync

After creating and managing subscriptions, you might need a way for your application to know about the state of a customers subscription. This can be done either directly through the API or by Advanced Billing notifying your application using the handy [webhooks](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405568068365-Webhooks-Introduction) feature.

---

There are three basic methods of either allowing or notifying your application about the state of a customers subscription:

- Using the [API](#api) to retrieve subscription information
- Recieving [webhooks](#receiving-a-webhook-notification)
- Manually [export](https://maxio-chargify.zendesk.com/hc/en-us/articles/5404681593741-Exporting-Data#locating-exports)

## API

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

## Webhooks

Webhooks offer a way to quickly find out about changes to your Subscriptions that happen within Advanced Billing. You can subscribe to events of interest, and we’ll post data to the URL you specify when one of those events occurs.

For more general information, see the [help article on Webhooks](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405568068365-Webhooks-Introduction).

### Using Webhooks

To begin using webhooks, you must first create an publicly accessible endpoint which has the following characteristics:

1. We allow HTTP endpoints only while in test mode. You'll be required to switch to HTTPS before you can move to live mode.
2. The endpoint you provide to Advanced Billing must be on port 80 or 443, these are the only supported ports.
3. Your endpoint must accept HTTP POST requests to your URL with a form-encoded body.

Once you have a public URL which Advanced Billing can attempt to send data to, then you can begin accepting requests and sending the expected `200 OK` response.

In general, the normal process for using webhooks is:

1. In Advanced Billing, some event to which your webhook URL is subscribed occurs. For example, a new customer has signed up on your site - creating a new subscription.
2. At some point, Advanced Billing makes a request to your webhook URL which contains the signup event data.
3. You receive the signup event data.
4. You verify the signup event data (using signature validation).
5. You perform some action using the validated event data, like sending a welcome email to the customer or provision your services.
6. You respond `200 OK` to the initial request, thereby completing the webhook transaction with Advanced Billing.

Please see the [help article on webhook events](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405357509645-Webhooks-Reference#events) for more information.

### Configuring Webhooks

Webhooks are a simple method of allowing Advanced Billing system to "speak" directly with yours, rather than having your system poll Advanced Billing to always obtain the latest information.

Webhooks, as configured in your Advanced Billing account, are as simple as:

- A [URL](https://en.wikipedia.org/wiki/Uniform_Resource_Locator)
- A set of [events](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405357509645#events) that you wish to subscribe to

You may enable/disable webhooks as you require them, they are not required to be used but they do have considerable benefit.

Please see [configuring webhooks](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405357509645#configuring-webhooks) documentation for more information.

### Testing Webhooks

For initial testing, there are a number of options that you can use.

Before you have a publicly accessible endpoint available, or if you just are looking at webhook for troubleshooting - we suggest using a tool like https://webhook.site/. Webhook.site provides a temporary URL that Advanced Billing may send messages to, allowing you to view them easily within their application. The "bins" are temporary. This can provide quick insight into the content or headers Advanced Billing will be sending.

Advanced Billing webhooks provide a test method that will send a simple message to any single webhook URL you specify. This test message is useful for verifying connectivity between your URL and Advanced Billing.

### Receiving a Webhook Notification

To enable the receipt of webhooks, simply enable them from within your site settings - selecting which events the endpoint should be receiving. A good flow for testing the receipt of webhooks and getting started is the following:

1. Setup publically accessible webhook handler
2. Enable webhooks at that endpoint, enable events you need to interact with (at the very least `subscription_state_change`, triggered when subscriptions move from active to cancelled)
3. Send a test event
4. Check your signature verification code, check that you are responding `200 OK`
5. Add the specific event processing code you need

### Responding to a Webhook

Upon receipt of a webhook, you should accept it by returning an HTTP `200 OK` response as quickly as possible. Sending any other response (i.e. `500 Internal Server Error`, `404 Not Found`, etc.) OR failing to return a response within approximately 15 seconds will result in automatic retries of the webhooks.

For more details on the retry mechanism and webhook replay, see our [documentation](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405357509645#webhook-acknowledgement-and-automatic-retries).

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

Please see the [webhook signature verification help article](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405357509645-Webhooks-Reference#webhook-verification) for more information.

### Best Practices

The following are some best practices that we would suggest regarding webhooks:

- Webhooks are **asynchronous events**. We do our best to always send them in a timely manner, but we **DO NOT** recommend on relying on webhooks for events that are time sensitive.
- We **DO NOT** recommend that you block a user from moving forward with provisioning or signup on your side based on a webhook response. The appropriate method is to query the subscriptions API to verify a subscription.

---

# Next Steps

- [Managing](./Subscriptions.md) your subscriptions
- API documentation for [webhooks](https://developers.chargify.com/docs/api-docs/b3A6MTQxMDgyNjU-create-endpoint)
