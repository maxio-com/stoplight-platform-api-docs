---
tags: [Chargify Direct]
---

# Signups

## Deprecation

| ❗️  Please note that Chargify Direct has been deprecated in favor of Chargify.js  |
|-----------------------------------------------------------------------------|

Chargify.js is a PCI compliant way of embedding payment forms on your site, while still making full use of our powerful API.

While Chargify Direct will still function and be supported, no new enhancements or features will be added.

## Chargify Direct Authentication

Chargify Direct resources use different credentials than the regular Chargify API. If you receive a 401 Unauthorized response, please see the section on Authentication in the Chargify Direct Introduction.

## Signup Input Attributes

When creating a signup, you must specify a product, customer, and payment_profile, all within the signup object. Credit card details may be required, depending on the options for the Product being subscribed (see Product Options).

## Taxable Subscriptions

If your intent is to charge your subscribers tax via [Avalara Taxes](https://help.chargify.com/taxes/avalara-managed-sales-tax.html) or [Custom Taxes](https://help.chargify.com/taxes/custom-taxes.html), there are a few considerations to be made regarding collecting subscription data. For subscribers to be eligible to be taxed, the following information for the `customer` object or `payment_profile` object must by supplied:

+ A subscription to a [taxable product](https://help.chargify.com/products/product-editing.html#tax-settings)
+ [Full valid billing or shipping address](https://help.chargify.com/taxes/avalara-managed-sales-tax.html#full-address-required-for-taxable-subscriptions) to identify the tax locale
+ The portion of the address that houses the [state information](https://help.chargify.com/taxes/avalara-managed-sales-tax.html#required-state-format-for-taxable-subscriptions) of either adddress must adhere to the ISO standard of a 2-3 character limit/format.
+ The portion of the address that houses the [country information](https://help.chargify.com/taxes/avalara-managed-sales-tax.html#required-country-format-for-taxable-subscriptions) must adhere to the ISO standard of a 2 character limit/format.

+ **Example: Full country name, such as "United States" is not acceptable, use US.**
+ **Example: Full state name, such as "Idaho", use ID**

## Signup Details

The product may be specified by either `product[id]` or by `product[handle]`, or, if signing up from an [offer](https://help.chargify.com/offers/offers-introduction.html), an `offer_id`.

### Product Details

+ `product`

  + `id` The id of the product your customer is signing up for
  + `handle` The API handle of the product your customer is signing up for

+ `subscription`

  + `snap_day` (Optional) Used for Calendar Billing. Set to a number between 1 and 28, or end.

### Offer Details

| Parameter      | Description                                                                         | Required |
|----------------|-------------------------------------------------------------------------------------|----------|
| `offer_id`     | The `id` or `handle` of the [offer](https://help.chargify.com/offers/offers-introduction.html) your customer is signing up for. | Optional, but required if using offers |


**Offer Handles**

If specifying a `handle`, then you must add the `"handle:"` prefix. For example, if your offer's `handle` is `"my-offer"`, then you would pass `offer_id: "handle:my-offer"` in your request parameters.

**Restrictions**

Note that you **cannot** specify either a `product[id]/product[handle]`, and an `offer_id`. Similarly, you cannot specify any components or coupons if you are
passing an `offer_id`. An offer has its own product/component/coupon configuration.

### Customer Details

The customer may be specified by customer[id] or by customer[reference] or by the following attributes as part of the `customer` object.

| Parameter      | Description                                                                         | Required |
|----------------|-------------------------------------------------------------------------------------|----------|
| `first_name`   | The first name of the customer                                                      | Yes      |
| `last_name`    | The last name of the customer                                                       | Yes      |
| `email`        | The email address of the customer                                                   | Yes      |
| `cc_emails`    | Any cc emails needed for the customer                                               |          |
| `organization` | Customer's organization                                                             |          |
| `reference`    | The unique identifier used within your own application for this customer.           |          |
| `address`      | The customer’s shipping street address (i.e. “123 Main St.”).                       |          |
| `address_2`    | Second line of the customer’s shipping address i.e. “Apt. 100”                      |          |
| `city`         | The customer’s shipping address city (i.e. “Boston”).                               |          |
| `state`        | The customer’s shipping address state (i.e. “MA”)                                   |          |
| `zip`          | The customer’s shipping address zip code (i.e. “12345”).                            |          |
| `country`      | The customer shipping address country in ISO 3166-1 alpha-2 format (i.e. **“US”**). |          |
| `phone`        | The phone number of the customer.                                                   |          |

### Payment Profile

The payment profile may be specified by either payment_profile[id] or by the following attributes as part of the `payment_profile` object.

Parameters that are not marked as required, may be required by your product configuration or gateway settings. Please be aware of this potential requirement.

| Parameter                  | Description                                                                                                                                                                                                                                                                                                                                  | Required                                                                                       |
|----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| `first_name`               | First name on card or bank account                                                                                                                                                                                                                                                                                                           | Yes                                                                                            |
| `last_name`                | Last name on card or bank account                                                                                                                                                                                                                                                                                                            | Yes                                                                                            |
| `card_number`              | The full credit card number (string representation, i.e. “5424000000000015”)                                                                                                                                                                                                                                                                 | Yes                                                                                            |
| `cvv`                      | (Optional if the payment method is a credit card) The 3 or 4 digit card verification value.                                                                                                                                                                                                                                                  | Yes                                                                                            |
| `expiration_month`         | The 1- or 2-digit credit card expiration month, as an integer or string, i.e. “5”                                                                                                                                                                                                                                                            | Yes                                                                                            |
| `expiration_year`          | The 4-digit credit card expiration year, as an integer or string, i.e. “2012”                                                                                                                                                                                                                                                                | Yes                                                                                            |
| `billing_address`          | The credit card or bank account billing street address (i.e. “123 Main St.”). This value is merely passed through to the payment gateway.                                                                                                                                                                                                    |                                                                                                |
| `address_2`                | Second line of the customer’s billing address i.e. “Apt. 100”                                                                                                                                                                                                                                                                                |                                                                                                |
| `city`                     | The credit card or bank account billing address city (i.e. “Boston”).                                                                                                                                                                                                                                                                        |                                                                                                |
| `state`                    | The credit card or bank account billing address state (i.e. “MA”).                                                                                                                                                                                                                                                                           |                                                                                                |
| `zip`                      | The credit card or bank account billing address zip code (i.e. “12345”).                                                                                                                                                                                                                                                                     |                                                                                                |
| `country`                  | The credit card or bank account billing address country, must be in ISO 3166-1 alpha-2 format (i.e. “US”). This value is merely passed through to the payment gateway. Some gateways require country codes in a specific format. Please check your gateway’s documentation. At this time, when creating a bank account, only US is accepted. |                                                                                                |
| `bank_name`                | The name of the bank where the customer’s account resides                                                                                                                                                                                                                                                                                    | Required when creating a subscription with ACH                                                 |
| `bank_routing_number`      | The routing number of the bank                                                                                                                                                                                                                                                                                                               | Required when creating a subscription with ACH                                                 |
| `bank_account_number`      | The customer’s bank account number                                                                                                                                                                                                                                                                                                           | Required when creating a subscription with ACH                                                 |
| `bank_account_type`        | Either checking or savings                                                                                                                                                                                                                                                                                                                   | Required when creating a subscription with ACH                                                 |
| `bank_account_holder_type` | Either personal or business                                                                                                                                                                                                                                                                                                                  | Required when creating a subscription with ACH                                                 |
| `agreement_terms`          | The ACH agreement terms, if creating a subscription with a bank_account as the payment profile                                                                                                                                                                                                                                               | The ACH agreement terms, if creating a subscription with a bank_account as the payment profile |
| `payment_type`             | Set to `paypal_account`                                                                                                                                                                                                                                                                                                                      | Required for PayPal                                                                            |
| `payment_method_nonce`     |                                                                                                                                                                                                                                                                                                                                              | Required for Paypal                                                                            |
| `paypal_email`             |                                                                                                                                                                                                                                                                                                                                              | Required for PayPal, but only used for display                                                 |
| `device_data` | Generated by Braintree JS. Example: <https://github.com/chargify/chargify_direct_example/tree/device_data> | Optional. Must be enabled in Braintree. |

### Component Details

Components are attached/allocated to the signup by including the component key. The sub-keys should be component IDs, and the values are the allocated quantities.

### Other Fields

| Parameter     | Description                                                                                                                                                                  | Required |
|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `metafields`  | set of key/value pairs representing custom fields and their values. Metafields will be created “on-the-fly” in your site for a given key, if they have not been created yet. |          |
| `ref`         | (Optional, see Referrals for more details.) A valid referral code.                                                                                                           |          |
| `coupon_code` | (Optional, see Coupons for more details.) A valid coupon code.                                                                                                               |          |

## HTML Signup Request

To create a subscription with Chargify Direct, add an HTML form to your website that includes the following elements.  The form will POST directly to Chargify, and we will redirect the customer back to you after processing the signup.

`URL: https://api.chargify.com/api/v2/signups`
`Method: POST`

```html
<form method="post" action="https://api.chargify.com/api/v2/signups">
  <!-- Secure parameters would go here here -->
  <!-- For brevity, this form contains no labels, only inputs -->
  <input type="hidden" name="signup[product][handle]" value="basic" />
  <input type="text" name="signup[customer][first_name]" />
  <input type="text" name="signup[customer][last_name]" />
  <input type="text" name="signup[customer][email]" />
  <input type="text" name="signup[customer][organization]" />
  <input type="text" name="signup[customer][address]" />
  <input type="text" name="signup[customer][address_2]" />
  <input type="text" name="signup[customer][city]" />
  <input type="text" name="signup[customer][state]" />
  <input type="text" name="signup[customer][zip]" />
  <input type="text" name="signup[customer][country]" />
  <input type="text" name="signup[customer][phone]" />
  <input type="text" name="signup[payment_profile][first_name]" />
  <input type="text" name="signup[payment_profile][last_name]" />

  <!-- begin credit card fields -->
  <input type="text" name="signup[payment_profile][card_number]" />
  <input type="text" name="signup[payment_profile][expiration_month]" />
  <input type="text" name="signup[payment_profile][expiration_year]" />
  <!-- end credit card fields -->

  <!-- begin bank account fields -->
  <input type="text" name="signup[payment_profile][bank_name]" />
  <input type="text" name="signup[payment_profile][bank_routing_number]" />
  <input type="text" name="signup[payment_profile][bank_account_number]" />
  <input type="text" name="signup[payment_profile][bank_account_type]" />
  <input type="text" name="signup[payment_profile][bank_account_holder_type]" />
  <!-- end bank account fields -->

  <input type="text" name="signup[payment_profile][billing_address]" />
  <input type="text" name="signup[payment_profile][billing_address_2]" />
  <input type="text" name="signup[payment_profile][billing_city]" />
  <input type="text" name="signup[payment_profile][billing_state]" />
  <input type="text" name="signup[payment_profile][billing_country]" />
  <input type="text" name="signup[payment_profile][billing_zip]" />
  <input type="text" name="signup[payment_profile][payment_type]" />
  <input type="text" name="signup[agreement_terms]" />
  <input type="submit" value="Sign Up" />
</form>
```

### HTML Example with Offer

**Using the Offer's ID**

Assuming the Offer has an `id` of `12345`:

```html
<form method="post" action="https://api.chargify.com/api/v2/signups">
  <!-- Secure parameters would go here here -->
  <!-- This form omits customer, and payment profile information for brevity -->
  <!-- Note that we are not adding any product, component, or coupon-related fields -->

  <input type="hidden" name="signup[offer_id]" value="12345" />

  <input type="submit" value="Sign Up" />
</form>
```

**Using the Offer's handle**

Assuming the Offer has a `handle` of `"my-offer"`:

```html
<form method="post" action="https://api.chargify.com/api/v2/signups">
  <!-- Secure parameters would go here here -->
  <!-- This form omits customer, and payment profile information for brevity -->
  <!-- Note that we are not adding any product, component, or coupon-related fields -->

  <input type="hidden" name="signup[offer_id]" value="handle:my-offer" />

  <input type="submit" value="Sign Up" />
</form>
```

### HTML Example with Components

In order to set components via a Chargify Direct form, you can create form elements similar to the following:

**Component Allocation**

Assume that there is a Quantity-based Component called “Widgets” with ID 1234 and an On/Off Component with ID 5678 called “Support”

You would like to allow your users to select 1 – 5 Widgets, and turn support On or Off.

```html
<form method="post" action="https://api.chargify.com/api/v2/signups">
  <!-- Secure parameters would go here here -->
  <!-- This form omits product, customer, and payment profile information for brevity -->

  <label for="signup_widgets">How Many Widgets?</label>
  <select name="signup[components][1234]" id="signup_widgets">
    <option value="">Please Select</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
  </select>

  <label><input type="radio" name="signup[components][5678]" value="1">SSL Support On</label>
  <label><input type="radio" name="signup[components][5678]" value="0">SSL Support Off</label>

  <input type="submit" value="Sign Up" />
</form>
```

**Using A Non-Default Component Price Point**

Passing in a hidden field for `price_point_id` will override the component's default price point. It's important to note that the order of the
fields matter; always include the hidden field for `component_id` first for each component that you add.

Note: if the `price_point_id` that is passed in is invalid, the signup will still proceed but will default to the component's default price point.

```html
<form method="post" action="https://api.chargify.com/api/v2/signups">
  <!-- Secure parameters would go here here -->
  <!-- This form omits product, customer, and payment profile information for brevity -->

  <input type="hidden" name="signup[components][][component_id]" value="75" />
  <input type="hidden" name="signup[components][][price_point_id]" value="94" />
  <input type="text" name="signup[components][][quantity]" value="3" />

  <input type="hidden" name="signup[components][][component_id]" value="18" />
  <input type="text" name="signup[components][][quantity]" value="10" />

  <input type="submit" value="Sign Up" />
</form>
```

### HTML Example with Custom Fields

Custom Fields (or Metafields) can be included in Chargify Direct forms as follows:

```html
<input type="text" name="signup[metafields][color]" />
<input type="text" name="signup[metafields][size]" />
```

### HTML Example with a Coupon Code

A coupon code can be included in Chargify Direct forms as follows:

```html
<input type="text" name="signup[coupon_code]" value="" />
```

### HTML Example with Multiple Coupon Codes

Multiple coupon codes can be included in Chargify Direct forms as follows:

```html
<input type="text" name="signup[coupon_codes][]" value="" />
<input type="text" name="signup[coupon_codes][]" value="" />
<input type="text" name="signup[coupon_codes][]" value="" />
```

### HTML Example with Calendar Billing

A subscription can be signed up on calendar billing as follows, where the value of `snap_day` can be 1 - 28 or `end` (for the last day of the month):

```html
<input type="hidden" name="signup[subscription][snap_day]" value="1" />
```

### HTML Redirect after Successful Signup

```html
<input type="hidden" name="secure[data]" value="redirect_uri=http%3A%2F%2Fwww.example.com%2Fparameter=value%26parameter2=value"/>
```

For another example on how redirects can be achieved, please see our [Chargify Direct Example](./Example.md).

## CORS

If you are trying to avoid the redirect and full-page reload, for example if you are developing a single-page application and would like to programmatically submit the form with JavaScript, please note that Cross-Origin Resource Sharing (CORS) is not supported by default.  Chargify Direct is deprecated and no new requests for CORS support will be granted. (Merchants with existing Chargify Direct integrations may request to be grandfathered in for newly added sites in their accounts.)

Please see the [Chargify.js Overview](../chargify.js/Overview.md) for new integrations.

### JSON Signup Example

The `signups` endpoint also responds to JSON, however since this means sending a request from your own server to Chargify's server, it is not generally appropriate if you are collecting credit card details. We recommend reviewing Chargify's [What You Need to Know About PCI](https://www.chargify.com/blog/what-you-need-to-know-about-pci/) blog post for more information.

If you are going to use this method, you must set the `Content-Type` header of your HTTP POST request to `application/json`, otherwise the request will be processed as a Chargify Direct request.

It is not possible to POST the JSON payload directly to Chargify from the customer's web browser, since doing so would require exposing your API credentials on the client side.

JSON Example Request


    URL: https://api.chargify.com/api/v2/signups
    Method: POST
    Content-Type: application/json

```json
{
  "signup": {
    "product": {
      "handle": "pro"
    },
    "customer": {
      "first_name": "Marky",
      "last_name": "Mark",
      "email": "marky@example.com",
      "organization": "Funky Company",
      "reference": "funky-123",
      "phone": "555-555-5555",
      "address": "123 2nd Street",
      "address_2": "Apt 5B",
      "city": "New York",
      "state": "NY",
      "country": "US",
      "zip": "10004"
    },
    "payment_profile": {
      "first_name": "Marky",
      "last_name": "Mark",
      "card_number": "1234123412341234",
      "expiration_month": "02",
      "expiration_year": "2022",
      "billing_address": "123 2nd Street",
      "billing_address_2": "Apt 5B",
      "billing_city": "New York",
      "billing_state": "NY",
      "billing_country": "US",
      "billing_zip": "10004"
    },
    "components": {
      "1234": 4,
      "5678": 0
    }
  }
}
```

Note that the above example shows setting a Quantity-based Component with ID “1234” to an allocated quantity of 4, and an On/Off Component with ID “5678” to “Off”.

### JSON Example with ACH

```json
{
  "signup": {
    "agreement_terms": "I hereby agree to ACH.",
    "product": {
      "handle": "pro"
    },
    "customer": {
      "first_name": "Marky",
      "last_name": "Mark",
      "email": "marky@example.com",
      "organization": "Funky Company",
      "reference": "funky-123",
      "phone": "555-555-5555",
      "address": "123 2nd Street",
      "address_2": "Apt 5B",
      "city": "New York",
      "state": "NY",
      "country": "US",
      "zip": "10004"
    },
    "payment_profile": {
      "first_name": "Marky",
      "last_name": "Mark",
      "payment_type": "bank_account",
      "bank_name": "My Bank",
      "bank_routing_number": "123412341",
      "bank_account_number": "123412341234",
      "bank_account_type": "checking",
      "bank_account_holder_type": "personal",
      "billing_address": "123 2nd Street",
      "billing_address_2": "Apt 5B",
      "billing_city": "New York",
      "billing_state": "NY",
      "billing_country": "US",
      "billing_zip": "10004"
    }
  }
}
```

### JSON Example with Custom Fields

```json
{
  "signup": {
    [...]
    "metafields": {
      "color": "blue",
      "size": "large"
    }
  }
}

```


## JSON Example Signup Response

See Chargify Direct Response Parameters for details on [Chargify Direct responses.
JSON.](http://www.example.com)

The following is an example of a successful `JSON POST` to `/signups`:

```json
{
  "result": {
    "status_code": "200",
    "result_code": "2000",
    "errors": []
  },
  "meta": {
    "status_code": "200",
    "result_code": "2000",
    "errors": []
  },
  "signup": {
    "product": {
      "id": 100002,
      "handle": "pro",
      "name": "Pro",
      "accounting_code": "",
      "description": "Pro Super Widget",
      "price_in_cents": 9900,
      "interval_unit": "month",
      "interval": 1,
      "initial_charge_in_cents": null,
      "trial_price_in_cents": null,
      "trial_interval": null,
      "trial_interval_unit": "month",
      "expiration_interval_unit": "never",
      "expiration_interval": null,
      "return_url": "",
      "return_params": "",
      "require_credit_card": false,
      "request_credit_card": true,
      "created_at": "2013-08-23T14:39:41-04:00",
      "updated_at": "2013-09-05T22:58:29-04:00",
      "archived_at": null,
      "product_family_id": 100000
    },
    "customer": {
      "id": 100016,
      "reference": "funky-123",
      "first_name": "Marky",
      "last_name": "Mark",
      "email": "marky@example.com",
      "organization": "Funky Company",
      "address": "123 2nd Street",
      "address_2": "Apt 5B",
      "city": "New York",
      "state": "NY",
      "zip": "10004",
      "country": "US",
      "phone": "555-555-5555",
      "created_at": "2013-09-20T11:19:11-04:00",
      "updated_at": "2013-09-20T11:19:12-04:00"
    },
    "payment_profile": {
      "id": 56,
      "first_name": "Marky",
      "last_name": "Mark",
      "masked_card_number": "XXXX-XXXX-XXXX-1234",
      "card_type": "bogus",
      "expiration_month": 2,
      "expiration_year": 2022,
      "billing_address": "123 2nd Street",
      "billing_address_2": "Apt 5B",
      "billing_city": "New York",
      "billing_state": "NY",
      "billing_country": "US",
      "billing_zip": "10004",
      "current_vault": "bogus",
      "vault_token": "1",
      "customer_vault_token": null,
      "customer_id": 100016,
      "created_at": "2013-09-20T11:19:11-04:00",
      "updated_at": "2013-09-20T11:19:11-04:00"
    },
    "subscription": {
      "id": 100051,
      "state": "active",
      "balance_in_cents": 9900,
      "current_period_ends_at": "2013-10-20T11:19:11-04:00",
      "next_assessment_at": "2013-10-20T11:19:11-04:00",
      "trial_started_at": null,
      "trial_ended_at": null,
      "activated_at": "2013-09-20T11:19:11-04:00",
      "expires_at": null,
      "created_at": "2013-09-20T11:19:11-04:00",
      "updated_at": "2013-09-20T11:19:11-04:00",
      "cancellation_message": null,
      "cancel_at_end_of_period": false,
      "canceled_at": null,
      "current_period_started_at": "2013-09-20T11:19:11-04:00",
      "previous_state": "active",
      "signup_payment_id": 146,
      "signup_revenue": "99.00",
      "delayed_cancel_at": null,
      "customer_id": 100016,
      "product_id": 100002,
      "payment_profile_id": 56
    },
    "next_billing_manifest": {
      "total_tax_in_cents": 0,
      "start_date": "2013-10-20T11:19:11-04:00",
      "line_items": [
        {
          "discount_amount_in_cents": 0,
          "taxable_amount_in_cents": 9900,
          "transaction_type": "charge",
          "kind": "baseline",
          "amount_in_cents": 9900,
          "memo": "Pro (10/20/2013 - 11/20/2013)"
        }
      ],
      "total_discount_in_cents": 0,
      "end_date": "2013-11-20T11:19:11-05:00",
      "subtotal_in_cents": 9900,
      "total_in_cents": 9900,
      "period_type": "recurring"
    }
  }
}
```

## Unsuccessful Responses

Any errors will be returned within the `meta[errors]` and `result[errors]` objects. For example, when trying to create a new subscription without passing in the `payment_profile[expiration_month]`, the following is returned:

```json
{
  "result": {
    "status_code": "422",
    "result_code": "4000",
    "errors": [
      {
        "attribute": "payment_profile.expiration_month",
        "message": "Credit card expiration month: cannot be blank."
      }
    ]
  },
  "meta": {
    "status_code": "422",
    "result_code": "4000",
    "errors": [
      {
        "attribute": "payment_profile.expiration_month",
        "message": "Credit card expiration month: cannot be blank."
      }
    ]
  }
}
```

Not passing in a `customer` at all will yield the following response:

```json
{
  "result": {
    "status_code": "422",
    "result_code": "4000",
    "errors": [
      {
        "attribute": "customer",
        "message": "A Customer must be specified for the subscription to be valid."
      }
    ]
  },
  "meta": {
    "status_code": "422",
    "result_code": "4000",
    "errors": [
      {
        "attribute": "customer",
        "message": "A Customer must be specified for the subscription to be valid."
      }
    ]
  }
}
```
