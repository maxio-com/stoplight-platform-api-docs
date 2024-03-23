# Gateway Support

Please be aware that in all cases, tokens expire after 20 minutes.

## Supported Gateways

Chargify.js works with most Advanced Billing-supported gateways.

Chargify.js cannot be used with the **Square** gateway. To create a Square payment profile,
use the Square JavaScript library in your page, then do either of the following when
[creating a payment profile]($e/Payment%20Profiles/createPaymentProfile)
or [creating a subscription]($e/Subscriptions/createSubscription) in Advanced Billing:

- Supply the nonce it generates in the `payment_method_nonce` attribute

  OR

- Use the Square API to create the card in Square using the nonce, then supply both `customer_vault_token` and `vault_token`

## Extra Support for Deletion

Advanced Billing does provide extra support for a handful of gateways listed below. Extra support means that we delete payment sources that are connected with expired tokens in these gateways.

- Authorize.net
- Bambora / Beanstream
- Braintree
- CyberSource
- GoCardless
- Moneris US
- Orbital
- QuickPay
- Stripe
- TrustCommerce
- Adyen

For more information on Advanced Billing gateways, please view the [current list of gateways we support](https://www.maxio.com/payment-gateways).

## Multiple Gateways on a Single Site

When Multi-Gateway is enabled on a site, you can connect this site with multiple gateways. Please [contact support](mailto:support@maxio.com) to enable this feature, and feel free to read [this help article](https://maxio.zendesk.com/hc/en-us/articles/24286962154509-Gateway-Configuration#selecting-a-gateway).

Once enabled, you must set up a gateway handle for each connected gateway. This gateway handle can be optionally used in the Chargify.js to directly select a gateway where a payment profile will be stored in. [An example may be found here](./configurations.md).

You can still save payment profiles in different gateways if `gatewayHandle` is not specified in the Chargify.js form. The target gateway is determined based on the type of data passed to Advanced Billing and the gateway that is set as the default for a given payment type. The Multi-Gateway feature allows for setting a given gateway to be the default for a given payment type (credit card, ACH, Direct Debit, PayPal, Apple Pay). To specify this on the Chargify.js form, `type` is required.

> ❗️ Even if you pass a `gatewayHandle`, the `type` must be still be valid for that gateway. For example, if Stripe is not configured to handle ACH profiles, combining `type: 'bank'` and `gatewayHandle: 'stripe'` will not work.

The combination of a default gateway for a given payment type and the `type` configuration setting for Chargify.js lead to the following possibilities:

- A payment profile will be saved in the default gateway for credit cards if the Chargify.js `type` is set to `'card'`.
- A payment profile will be stored in Braintree is the `type` is `'card`' and the `gatewayHandle` is Braintree, even if the default for credit cards is Authorize.Net.
- A payment profile will be saved in the default gateway for ACH if the `type` is set to `'bank'` and `gatewayHandle` is not specified. If the default gateway is Stripe, the payment profile will be stored there.
- A payment profile will be saved in the default gateway for Direct Debit if the `type` is set to `'direct_debit'`.
