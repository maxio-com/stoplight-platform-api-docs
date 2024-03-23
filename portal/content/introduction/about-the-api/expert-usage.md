# Expert Usage

The following are some additional useful topics that you might need to handle or read up on, and are here as reference. These generally are topics which may be useful for expert usage of Advanced Billing.

## Advanced Signup Examples

The following are a few advanced/expert examples of new signups/subscriptions that you might encounter. These may be common, but it entirely depends on what features of Advanced Billing you use and how you integrate your use of Advanced Billing.

1. Import as new signup/subscription

**Example**

```json
// POST /subscriptions.json
{
  "subscription": {
    "product_handle": "basic",
    "next_billing_at": "2010-08-29T12:00:00-04:00",
    "customer_attributes": {
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "reference": "123",
      "organization": "Acme Widgets"
    },
    "payment_profile_attributes": {
      "vault_token": "12345",
      "customer_vault_token": "67890",
      "current_vault": "authorizenet",
      "expiration_year": "2020",
      "expiration_month": "12",
      "card_type": "visa",
      "last_four": "1111"
    }
  }
}
```

For complete details of this method, please see [API Subscription Import]($e/Subscriptions/createSubscription)

2. New Subscription with Coupon/Trial/Component

Signups can implement coupons, custom trial periods and components right from the initial creation of the subscription, like in the following:

**Example**

```json
{
  "subscription": {
    "product_handle": "basic",
    "customer_attributes": {
      "first_name": "John",
      "last_name": "Smith",
      "email": "john@example.com"
    },
    "credit_card_attributes": {
      "full_number": "1",
      "expiration_month": "10",
      "expiration_year": "2020"
    },
    "coupon_code": "SUB111",
    "next_billing_at": "2020-06-01",
    "components": [
      {
        "component_id": 123456,
        "unit_balance": 20
      }
    ]
  }
}
```

For complete details about subscription creation, please see [create subscription]($e/Subscriptions/createSubscription).

3. New Subscription with Existing Payment Profile

## Metafields/Metadata

You might find that you need to store more information in a customer or subscription object in Advanced Billing to align better with your integration. In that case, you can add/use metafields to store this metadata.

**Example**

First, you would create your metafield. In this example, we're going to add a color field to our customer:

```json
// POST /customers/metafields.json
{
  "metafields": {
    "name": "Color",
    "scope": {
      "hosted": ["all"],
      "csv": "1",
      "invoices": "1",
      "statements": "1"
    }
  }
}
```

The options for `scope` here would show this metafield on all public/hosted pages, show the metadata on invoices and subscriptions and allow the metadata to be exported via CSV.

Second, you would then set the color for a particular cutomer:

```json
// POST /customers/{customer_id}/metadata.json
{
  "metadata": {
    "name": "Color",
    "value": "Blue"
  }
}
```

The particular customer would then have metadata for metafield "Color" set to "Blue".

For more API information about "metafields" (the containers of your metadata), please see [custom fields: Metafields]($e/Custom%20Fields/createMetafields).

## Communication

Advanced Billing enables you to communicate with your subscribers through a variety of methods. For more information on these methods, read the given help article:

- [Email templating](https://maxio.zendesk.com/hc/en-us/articles/24266086168461-Email-Templates)
- The use of [Liquid Syntax](https://maxio.zendesk.com/hc/en-us/articles/24266086916877-Liquid-Examples) in your emails and communications
- [HTML/text emails](https://maxio.zendesk.com/hc/en-us/articles/24266101040781-HTML-Emails)
- [Mass emailing subscribers](https://maxio.zendesk.com/hc/en-us/articles/24266110860045-Bulk-Email-Mass-Emailing-Subscribers)
- [Email archives](https://maxio.zendesk.com/hc/en-us/articles/24266109347853-Email-Archives)

## Dunning

Dunning is the process of how you communicate with your customers in regards to failed credit card transactions and expiring credit cards.

Advanced Billing helps manage the dunning process, or what we like to call the “unhappy path.” Or what happens when a credit card transaction fails. If you’re using Authorize.net, PayPal, or Google Checkout, you have to manually address each credit card issue as it arises. This is both tedious and time consuming and is certainly not the most efficient way to handle problems when executing a large number of transactions.

For more information about dunning - including how to setup your dunning plans, please see the [Dunning](https://maxio.zendesk.com/hc/en-us/articles/24287076583565-Dunning-Overview) help article.

## Referrals

Referrals are a great way to reward your customers for sharing information about your application with new potential users. Advanced Billing generates a referral code for each of your subscriptions and rewards the new customer, as well as the referrer, when a new signup is created with the code.

If referrals are enabled, then every subscription will have a `ref` (short for "referral code") as part of the available data in the subscription API response.

**Example**

```json
// GET /subscriptions/{subscription_id}.{format}
{
  "subscription": {
    "id": "123456789",
    "state": "active",
    // ...
    "ref": "trdgzp"
  }
}
```

To validate the code, you can do the following:

HTTP GET: `https://{subdomain}.chargify.com/referral_codes/validate.{format}?code={ref/referral_code}`

If the referral code is valid, the response will be `200 OK`. Otherwise, the response will be `404 NOT FOUND`.

For more information about referrals, please see the [Referrals](https://maxio.zendesk.com/hc/en-us/articles/24287008467725-Referrals-Overview) help article.

## Notes

You can also enter and manage notes on a subscription. Notes allow you to keep non-structured data associated with individual subscriptions. If you need structured data, please consider using [Metafields/Metadata]($e/Custom%20Fields/createMetafields).

To create a simple note on a subscription, see the following:

```json
// POST /subscriptions/{subscription_id}/notes.{format}
{
  "note": {
    "body": "This is the note that never ends, it just goes on and on ..",
    "sticky": true
  }
}
```

Setting the value for `sticky` to `true` will show the note prominently when viewing the subscription.

For complete API information about notes, please see [API Notes]($e/Subscription%20Notes/createSubscriptionNote).
