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

For complete details of this method, please see [API Subscription Import](https://developers.chargify.com/docs/api-docs/b3A6MTQxMDgzODg-create-subscription#subscriptions-import)

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

For complete details about subscription creation, please see [create subscription](https://developers.chargify.com/docs/api-docs/b3A6MTQxMDgzODg-create-subscription).

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

For more API information about "metafields" (the containers of your metadata), please see [custom fields: Metafields](https://developers.chargify.com/docs/api-docs/b3A6MTQxMDgyOTM-create-metafields).

## Communication

Advanced Billing enables you to communicate with your subscribers through a variety of methods:

- [Email templating](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405217029261)
- The use of [Liquid Syntax](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405065579661) in your emails and communications
- [HTML/text emails](https://maxio-chargify.zendesk.com/hc/en-us/articles/5404761842317)
- [Mass emailing subscribers](https://maxio-chargify.zendesk.com/hc/en-us/articles/5404991667085)
- [Email archives](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405279311501)

## Dunning

Dunning is the process of how you communicate with your customers in regards to failed credit card transactions and expiring credit cards.

Advanced Billing helps manage the dunning process, or what we like to call the “unhappy path.” Or what happens when a credit card transaction fails. If you’re using Authorize.net, PayPal, or Google Checkout, you have to manually address each credit card issue as it arises. This is both tedious and time consuming and is certainly not the most efficient way to handle problems when executing a large number of transactions.

For more information about dunning - including how to setup your dunning plans, please see the [help article on Dunning](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405505141005).

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

For more information about referrals, please see the [Referrals help article](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405548589581).

## Notes

You can also enter and manage notes on a subscription. Notes allow you to keep non-structured data associated with individual subscriptions. If you need structured data, please consider using [Metafields/Metadata](https://developers.chargify.com/docs/api-docs/b3A6MTQxMDgyOTM-create-metafields).

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

For complete API information about notes, please see [API Notes](https://developers.chargify.com/docs/api-docs/b3A6MTQxMDgyNzA-create-subscription-note).
