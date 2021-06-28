---
tags: [Chargify.js]
---

# Gateway Support

Please be aware that in all cases, tokens expire after 20 minutes.

## Supported Gateways

Chargify.js works with most of Chargify's supported gateways.

Chargify.js cannot be used with the **Square** gateway. To create a Square payment profile,
use the Square JavaScript library in your page, then either

* supply the nonce it generates in the `payment_method_nonce` attribute, or
* use the Square API to create the card in Square using the nonce, then supply both `customer_vault_token` and `vault_token`

when
[creating a payment profile](https://chargify.stoplight.io/docs/api-documentation/reference/Chargify-API.v1.yaml/paths/~1payment_profiles.json/post)
or
[creating a subscription](https://chargify.stoplight.io/docs/api-documentation/reference/Chargify-API.v1.yaml/paths/~1subscriptions.json/post) in Chargify.

## Extra Support for Deletion

Chargify does provide extra support for a handful of gateways listed below. Extra support means that we delete payment sources that are connected with expired tokens in these gateways.

* Authorize.net
* Bambora / Beanstream
* Braintree
* CyberSource
* GoCardless
* Moneris US
* Orbital
* QuickPay
* Stripe
* TrustCommerce
* Adyen

For more information on Chargify gateways, please view the [current list of gateways we support.](https://www.chargify.com/payment-gateways/)

## Multiple Gateways on a Single Site

When Multi-Gateway is enabled on a site, you can connect this site with multiple gateways. Please [contact support](mailto:support@chargify.com) to enable this feature, and feel free to peruse our [help documentation on the topic](https://help.chargify.com/payment-gateways/gateway-configuration.html#connecting-with-multiple-gateways).

Once enabled, you must set up a gateway handle for each connected gateway. This gateway handle can be optionally used in the Chargify.js to directly select a gateway where a payment profile will be stored in. [An example may be found here](configurations.html#multi-gateway-configuration).

You can still save payment profiles in different gateways if `gatewayHandle` is not specified in the Chargify.js form. The target gateway is determined based on the type of data passed to Chargify and the gateway that is set as the default for a given payment type. The Multi-Gateway feature allows for setting a given gateway to be the default for a given payment type (credit card, ACH, Direct Debit, PayPal, Apple Pay). To specify this on the Chargify.js form, `type` is required.

<div class="alert alert-info">
  Even if you pass a `gatewayHandle`, the `type` must be still be valid for that gateway. For example, if Stripe is not configured to handle ACH profiles, combining `type: 'bank'` and `gatewayHandle: 'stripe'` will not work.
</div>

The combination of a default gateway for a given payment type and the `type` configuration setting for Chargify.js lead to the following possibilities:

* a payment profile will be saved in the default gateway for credit cards if the Chargify.js `type` is set to  `'card'`.
* a payment profile will be stored in Braintree is the `type` is `'card`' and the `gatewayHandle` is Braintree, even if the default for credit cards is Authorize.Net.
* a payment profile will be saved in the default gateway for ACH if the `type` is set to `'bank'` and `gatewayHandle` is not specified. If the default gateway is Stripe, the payment profile will be stored there.
* a payment profile will be saved in the default gateway for Direct Debit if the `type` is set to `'direct_debit'`.
