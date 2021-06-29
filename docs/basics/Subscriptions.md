---
tags: [Basics]
---

# Subscriptions

After creating subscriptions, either you or your customers will need to manage them to maintain them under a number of different scenarios.

<hr/>
     
## One-Time Charges

Chargify allows you to add charges to a subscription outside of the regular recurring billing cycle. This is called a ["one-time" charge](https://help.chargify.com/subscriptions/one-time-charges.html) though it simply refers to a charge that happens once and occurs from either submitting a charge via the API or by manually creating the charge in the app.

For example, if you wanted to add a charge of $1 - it would look like the following:

```json
// POST /subscriptions/{subscription_id}/charges.json
{
    "charge":
    {
        "amount_in_cents": 100,
        "memo": "This is the description of the reason for the $1 charge."
    }
}
```

For more information on the API details for creating charges, see [here](../../reference/Chargify-Legacy-API.yaml/paths/~1subscriptions~1%7Bsubscription_id%7D~1charges.json/post).

## Coupons and Adjustments

In general, coupons and adjustments are other methods of changing the amount billed to a customer either on a recurring basis (as with repeat use coupons) or on a more singular basis (as with single use coupons or balance adjustments).

### Coupons

Are you looking to offer current or potential customers a discount? Chargify handles all of your promotional codes, discounts, and coupons with ease. Simply name the promotion, set your desired promo code, and enter the discount. You even have the power to control the expiration date and how long the promotion runs for in conjunction with your products.

Let's create a coupon that we can then use when creating our next subscription.

```json
// POST /coupons.json
{
    "coupon": {
        "name": "15% off",
        "code": "15OFF",
        "description": "15% off for life",
        "percentage": "15",
        "allow_negative_balance": "false",
        "recurring": "false",
        "end_date": "2012-08-29T12:00:00-04:00",
        "product_family_id": "2"
    }
}
```

To create a coupon, see [here](../../reference/Chargify-API.v1.yaml/paths/~1product_families~1%7Bproduct_family_id%7D~1coupons.json/post).

To use a coupon when creating a new subscription, please see [here](../../reference/Chargify-API.v1.yaml/paths/~1subscriptions.json/post).

Please see the full API documentation for [coupons](../../reference/Chargify-API.v1.yaml/paths/~1product_families~1%7Bproduct_family_id%7D~1coupons.json/post) for more detailed information.

### Adjustments

Adjustments are similar to coupons, but they are much more simple. They are one-time changes to the balance of a subscription.

Let's say you wanted to increase the balance of a subscription by $4 (perhaps for some error in billing), you would perform the following:

```json
// POST /subscriptions/{subscription_id}/adjustments.json
{
    "adjustment": {
        "amount": "4.00",
        "memo": "This is the description of an adjustment on a subscription that increases the balance by a certain dollar amount."
    }
}
```

Please see the full API documentation for [adjustments](../../reference/Chargify-Legacy-API.yaml/paths/~1subscriptions~1%7Bsubscription_id%7D~1adjustments.json/post) for more detailed information.

## Billing Dates

A common method of managing a subscription might be for the billing date to change (as in the date the subscription is next processed/assessed and charges may potentially be captured from the payment method of the subscription). This is generally done: as a common method of extending or shortening trials, or processing the subscription "immediately" or just changing the billing date for use in [calandar billing](https://help.chargify.com/subscriptions/billing-dates.html#calendar-billing) scenarios.

A quick example of updating the billing date for a subscription would look like the following:

```json
/// POST /subscriptions/{subsciption_id}.json
{
    "subscription": {
        "next_billing_at": "2016-08-29T12:00:00-04:00"
    }
}
```

Please see the full API documentation for [updating subscription assessment date](../../reference/Chargify-API.v1.yaml/paths/~1subscriptions~1%7Bsubscription_id%7D.json/put) for more information.

## Product Price Points

Product price points allow you to charge customers different amounts and at different frequencies for the same product.

Please see the full documentation on [Product Price Points](https://help.chargify.com/products/product-price-points.html)

## Updating Payment Details

Updating the payment details is how you would change the card that somebody uses for their subscription. You can also use this method to simply change the expiration date of the card.

❗️ If your subscriber pays taxes on their purchased product, and you are attempting to update the `payment_profile`, complete address information is required. For information on required address formatting to allow your subscriber to be taxed, please see our documentation [here](./Signups.md#taxes).

You can update the payment details in a few different ways:

* Update via [Self-Service Pages](#updating-via-self-service-pages)
* Update via [API](#updating-via-api)
* Update via [Chargify.js](../chargify.js/Overview.md#updating-existing-payment-methods)

### Updating via Self-Service Pages

You may allow your users to update their information themselves, using the self-service public hosted pages or even the new billing portal.

For the public service page card update, you merely direct them to a specific URL:

`https://{subdomain}.chargify.com/update_payment/{subscription_id}/{token}`

* The `subdomain` is just your subdomain. Our imaginary company "Acme"'s URL would start like the following: `https://acme.chargify.com`

* The `subscription_id` would be the integer ID of the subscription as it is in the Chargify site/subdomain.

* The `token` is calculated using the first 10 characters of the SHA-1 hex digest of this message:

```
message = "update_payment--{subscription_id}--{shared_key}"
token = SHA1(message)[0..9]
```

For more information about the self-service card update public page, please see [the following](https://help.chargify.com/public-pages/self-service-pages.html#self-service-page-urls).

Your users can also self-service update their payment method if using the Chargify Billing Portal feature, please see [here](https://help.chargify.com/billing-portal/billing-portal-interface.html#update-payment-method) for more information.

### Updating via API

Updating the API is very useful in situations where you are more directly integrating with Chargify.

There are many methods of performing this action via the API, you can:

1. Update the payment profile indirectly through a subscription update
2. Update the payment profile directly

Updating the payment profile through a subscription update would look like the following:

_**Note**_ - Partial card updates for Authorize.Net are not allowed via this endpoint.

```json
/// PUT /subscriptions/{subscription_id}.json
{
    "subscription": {
        "credit_card_attributes": {
          "full_number": "2",
          "expiration_month": "10",
          "expiration_year": "2030"
        }
    }
}
```

Updating the payment profile directly would look like the following:

```json
// PUT /payment_profiles/{payment_profile_id}.json
{
    "payment_profile": {
        "full_number": "2",
        "expiration_month": "10",
        "expiration_year": "2030"
    }
}
```

Please see the full [API documentation](../../reference/Chargify-API.v1.yaml/paths/~1payment_profiles~1%7Bpayment_profile_id%7D.json/put) for more complete documentation about updating payment profiles via the API.

## Cancelling

Cancelling subscriptions is another common task that users will need to perform, or that is performed on their behalf when payment cannot be captured.

For example, if you wanted to cancel a subscription using the API:

```json
// DELETE /subscriptions/{subscription_id}.json
{
    "subscription": {
        "cancellation_message": "Canceling the subscription via the API"
    }
}
```

It is also possible to cancel a subscription at the end of the current billing period, this is called a "delayed cancellation" and it's API call would look like the following:

```json
// DELETE /subscriptions/{subscription_id}.json
{
    "subscription": {
        "cancel_at_end_of_period": 1,
        "cancellation_message": "Canceling the subscription via the API"
    }
}
```

For information about cancelling using the API, please see [Cancelling via API](../../reference/Chargify-API.v1.yaml/paths/~1subscriptions~1%7Bsubscription_id%7D.json/delete).

For information about cancelling subscriptions in general, please see [cancellation](https://help.chargify.com/subscriptions/cancellation.html).

## Refunds

When handing charging to any payment method, there are times when you will be required to refund. Refunds are only supported for the following gateways that are listed in our [help documentation](https://help.chargify.com/subscriptions/refunds.html). Please refer to the previously linked document for up to the minute information on what gateways support refunds. 

For gateways like Bambora, you will need to perform a "manual refund" in that you record the refund as a transaction directly after you perform the actual refund in your gateway account.

You can perform a non-manual refund using the API, like in the following example:

```json
{
    "refund": {
        "payment_id": "{payment_id}",
        "amount": "4.00",
        "memo": "Your memo here."
    }
}
```

You will substitute values for `payment_id`, `amount` and `memo` in this example. The `payment_id` is the ID of the payment transaction that the credit will be applied to.

For more information, see [API refunds](../../reference/Chargify-Legacy-API.yaml/paths/~1subscriptions~1%7Bsubscription_id%7D~1refunds.json/post).

For a manual/external refund, the API call will be almost the exact same except you also supply a value for `external`:

```json
{
    "refund": {
        "payment_id": "{payment_id}",
        "amount": "4.00",
        "memo": "Your memo here."
    },
    "external": 1
}
```

In the case of a manual or external refund, there will be nothing which is passed through on to your gateway - it will simply be added to the subscription, modifying the balance and adding a transaction record.

For more information, see [API Refunds (External)](../../reference/Chargify-Legacy-API.yaml/paths/~1subscriptions~1%7Bsubscription_id%7D~1refunds.json/post).

## Subscription Updates via Billing Portal

Subscriptions can also be updated, at the hands of the subscriber, via the Billing Portal. The Billing Portal serves as a method to allow your subscribers to perform certain managerial actions against their current subscription. As a merchant, you have the ability to also restrict what actions can be performed by a subscriber. 

As an example, here are a few examples of actions that can be performed via the Billing Portal:

+ Plan changes
+ Subscription cancellation
+ Credit card updates
+ Component purchase / allocation updates 

For more information on the Chargify Billing Portal, we encourage you to view our full documentation [here.](https://help.chargify.com/billing-portal/introduction.html)

----------

# Next Steps
- Keeping your application data [synchronized](./Sync.md) with Chargify
- Subscription API [documentation](../../reference/Chargify-API.v1.yaml/paths/~1subscriptions.json/post)
