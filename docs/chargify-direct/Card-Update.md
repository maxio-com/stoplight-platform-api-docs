---
tags: [Chargify Direct]
---

# Card Update

## Deprecation

| ❗️  Please note that Chargify Direct has been deprecated in favor of Chargify.js  |
|-----------------------------------------------------------------------------|

Chargify.js is a PCI compliant way of embedding payment forms on your site, while still making full use of our powerful API.

While Chargify Direct will still function and be supported, no new enhancements or features will be added.

## Chargify Direct

Updating a Subscription’s Payment Profile via Chargify Direct with new information, or creating a new Payment Profile for a Subscription where none currently exists.

## URI/Method

The card_update endpoint is only available for HTML forms and does not respond to JSON API calls.

## Input Attributes

In order for your request to be processed, you must set up secure parameters. See [Chargify Direct Introduction – Secure Parameters](./Authentication.md#chargify-direct-via-secure-parameters) for detailed information on how to authenticate requests to this endpoint.

Note: the `subscription_id` **MUST** be part of your `secure[data]` parameter for the card update request to be processed.

### Taxable Subscriptions

❗️ If your subscriber pays taxes on their purchased product, and you are attempting to update the `payment_profile`, complete address information is required. For information on required address formatting to allow your subscriber to be taxed, please see our documentation [here](../basics/Signups.md#taxes).

## Card Details

### Payment Profile

|          Parameter                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                    |
|----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `first_name`               | First name on card or bank account                                                                                                                                                                                                                                                                                                                                                                                             |
| `last_name`                | Last name on card or bank account                                                                                                                                                                                                                                                                                                                                                                                              |
| `card_number`              | The full credit card number (string representation, i.e. “5424000000000015”)                                                                                                                                                                                                                                                                                                                                                   |
| `cvv`                      | The 3 or 4 digit card verification value.(Optional if the payment method is a credit card)                                                                                                                                                                                                                                                                                                                                     |
| `expiration_month`         | The 1- or 2-digit credit card expiration month, as an integer or string, i.e. “5”                                                                                                                                                                                                                                                                                                                                              |
| `expiration_year`          | The 4-digit credit card expiration year, as an integer or string, i.e. “2012”                                                                                                                                                                                                                                                                                                                                                  |
| `billing_address`          | The credit card or bank account billing street address (i.e. “123 Main St.”). This value is merely passed through to the payment gateway.(Optional, may be required by your product configuration or gateway settings)                                                                                                                                                                                                         |
| `billing_address_2`        | Second line of the customer’s billing address i.e. “Apt. 100” (Optional)                                                                                                                                                                                                                                                                                                                                                       |
| `billing_city`             | The credit card or bank account billing address city (i.e. “Boston”). This value is merely passed through to the payment gateway. (Optional, may be required by your product configuration or gateway settings)                                                                                                                                                                                                                |
| `billing_state`            | The credit card or bank account billing address state (i.e. “MA”). This value is merely passed through to the payment gateway. (Optional, may be required by your product configuration or gateway settings)                                                                                                                                                                                                                   |
| `billing_zip`              | The credit card or bank account billing address zip code (i.e. “12345”). This value is merely passed through to the payment gateway.(Optional, may be required by your product configuration or gateway settings)                                                                                                                                                                                                              |
| `billing_country`          | The credit card or bank account billing address country, preferably in ISO 3166-1 alpha-2 format (i.e. “US”). This value is merely passed through to the payment gateway. Some gateways require country codes in a specific format. Please check your gateway’s documentation. At this time, when creating a bank account, only US is accepted.  (Optional, may be required by your product configuration or gateway settings) |
| `bank_name`                | (Required when creating a subscription with ACH) The name of the bank where the customer’s account resides                                                                                                                                                                                                                                                                                                                     |
| `bank_routing_number`      | (Required when creating a subscription with ACH) The routing number of the bank                                                                                                                                                                                                                                                                                                                                                |
| `bank_account_number`      | (Required when creating a subscription with ACH) The customer’s bank account number                                                                                                                                                                                                                                                                                                                                            |
| `bank_account_type`        | (Required when creating a subscription with ACH) Either checking or savings                                                                                                                                                                                                                                                                                                                                                    |
| `bank_account_holder_type` | (Required when creating a subscription with ACH) Either personal or business                                                                                                                                                                                                                                                                                                                                                   |
| `payment_type`             | Required for PayPal. Set to `paypal_account`.                                                                                                                                                                                                                                                                                                                                                                                  |
| `payment_method_nonce`     | Required for Paypal.                                                                                                                                                                                                                                                                                                                                                                                                           |
| `paypal_email`             | Required for PayPal, but only used for display.                                                                                                                                                                                                                                                                                                                                                                                |

## Example Form

```
<form method="post" action="https://api.chargify.com/api/v2/subscriptions/<subscription.id>/card_update">

  <!-- Secure parameters, for example: -->
  <input type="hidden" name="secure[data]" value="redirect_uri=http%3A%2F%2Fexample.com%2Fcallback%2Fsubscription_id=12345"/>

  <!-- For brevity, this form contains no labels, only inputs -->
  <input type="text" name="payment_profile[first_name]" />
  <input type="text" name="payment_profile[last_name]" />

  <!-- begin credit card fields -->
  <input type="text" name="payment_profile[card_number]" />
  <input type="text" name="payment_profile[expiration_month]" />
  <input type="text" name="payment_profile[expiration_year]" />
  <input type="text" name="payment_profile[cvv]" />
  <!-- end credit card fields -->

  <!-- begin bank account fields -->
  <input type="text" name="payment_profile[bank_name]" />
  <input type="text" name="payment_profile[bank_routing_number]" />
  <input type="text" name="payment_profile[bank_account_number]" />
  <input type="text" name="payment_profile[bank_account_type]" />
  <input type="text" name="payment_profile[bank_account_holder_type]" />
  <!-- end bank account fields -->

  <!-- begin paypal account fields -->
  <input type="text" name="payment_profile[payment_method_nonce]" />
  <input type="text" name="payment_profile[paypal_email]" />
  <!-- end paypal account fields -->

  <input type="submit" value="Update" />
</form>
```

## Reference implementation
The small Sinatra app constructed to serve as a reference implementation for Chargify Direct includes an example flow for a card update and is available here:

[https://github.com/chargify/chargify_direct_example](https://github.com/chargify/chargify_direct_example)

When the application is run, navigating to `http://localhost:9292/card_update/<SUBSCRIPTION_ID>` where `<SUBSCRIPTION_ID>` is a numeric subscription ID, the user is presented with a form to input the updated card information. If an error occurs after submitting, the form will be redisplayed along with error messaging. Otherwise, a success message is displayed along with the URI for retrieving the call data from the API V2.

## Output Attributes

When Chargify redirects back to your redirect URI, it will include the following query-string parameters:

| Parameters    | Description                                                                                                                                                                     |
|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `api_id`      | The API ID that made the original request                                                                                                                                       |
| `timestamp`   | The reflected or auto-generated timestamp                                                                                                                                       |
| `nonce`       | The reflected or auto-generated nonce                                                                                                                                           |
| `status_code` | An HTTP status code that represents the status of the request                                                                                                                   |
| `result_code` | A Chargify-specific result code, that is related to the status code but may give more specific information about the result of your request                                     |
| `call_id`     | The ID for the stored representation of the original Call (form post). The Call may be fetched via the API for full response information (for both success and fail scenarios). |
| `signature`   | The HMAC-SHA1 hexdigest of the previous parameters, to verify their integrity                                                                                                   |

+ See response signature for more information about these attributes and what you can use them for.

+ See result codes for more information about the result codes that Chargify returns.
