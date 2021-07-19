---
tags: [Chargify Direct]
---

# Migrating to Chargify.js

Chargify Direct has been deprecated in favor of Chargify.js. We strongly recommend migrating to Chargify.js following the guide below. No new features will be developed on Chargify Direct.

## Benefits of Switching

In addition to being simpler to setup and implement compared to Chargify Direct, the following functionality is available on Chargify.js and not Chargify Direct:

+ Creating invoice billing or remittance subscriptions
+ Subscription groups and WhoPays
+ Multi-Gateway
+ Multi-Currency
+ Apple Pay
+ PayPal
+ GoCardless
+ 3D Secure for PSD2 compliance

In terms of security, Chargify.js is SAQ-A compliant, whereas Chargify Direct is only SAQ-A-EP; this means that Chargify Direct requires more security compliance on your end than Chargify.js does. SAQ-A is the same compliance level as using one of our hosted Public Signup Pages. For more information on PCI compliance, [please visit our help docs](https://help.chargify.com/my-account/pci-compliance.html).

## Implementation Comparison

Please feel free to peruse our [Chargify.js documentation for a full overview](../chargify.js/Overview.md).

Chargify Direct involves building a form that is hosted on your website. When a customer signs up, the form is submitted directly to Chargify, then we transparently redirect the customer back to the website for information on the state of their signup.

By comparison, Chargify.js still requires a page to be hosted on your website. However, Chargify provides iframes for collecting all the credit card information, meaning that all credit card information is sent directly to Chargify without passing through your server. Chargify.js is used to create a payment profile at the gateway and returns a time-sensitive, one-time use token. This token is used to create a subscription with a credit card or bank account through our API. Because the card information is tokenized, passing it through the API on your server is completely secure.

### Card Updates

In terms of card updates, Chargify Direct allows direct updates to be made to the card on file. Through Chargify.js, the process involves 1) generating a new token to create a new payment profile under the customer, and 2) making the new card default on the subscription.

## Migration Path

We strongly recommend building a Chargify.js form against a sandbox site prior to moving the changes to production. Most popular gateways have a free development account that can replicate the same errors and behavior a customer might encounter in a production instance. Thorough testing helps ensure the least disruption for customers attempting to sign up.

1. Review the current signup flow through Chargify Direct. 
    - Is it being used for just signups, or for card updates as well? 
    - What information is being passed, such as addresses, custom fields, bank accounts?
    - Can existing customers sign up for a second subscription under their existing account? 
    - Are there any after-signup triggers to consider, such as requisitioning an account for the customer on your application?
2. Build and design your Chargify.js form, and implement the necessary API calls needed to create the subscription. This will match the functionality already in place from step 1, as well as take advantage of any new Relationship Invoicing features you are interested in. We recommend checking out the [getting started guide](../chargify.js/Overview.md#getting-started) to build the form and API connection.
3. Test the full signup flow: 
    - from generating the one-time use token with Chargify.js 
    - to using the token to create a subscription via API
    - to any other non-Chargify-related workflows that occur after a signup
    - to allowing the new subscription to then update their card
4. Once the full solution has been vetted on a test site, implement the changes in your production instance.
5. Be sure to remove any existing Chargify Direct forms.

## API Calls

A signup API payload passing a Chargify.js token would resemble the following; any billing address information would be passed in with the original token creation.

```
{
  "subscription": {
    "product_handle": "pro-plan",
    "customer_attributes": {
      "first_name": "Joe",
      "last_name": "Smith",
      "email": "j.smith@example.com"
    },
    "credit_card_attributes": {
      "chargify_token": "tok_cwhvpfcnbtgkd8nfkzf9dnjn"
    }
  }
}
```

Here are some example API calls for signups that may be helpful:

+ [Request body examples](../../reference/Chargify-API.v1.yaml/paths/~1subscriptions.json/post) 

These API calls pertain to handling card updates, which involves creating a new payment profile and swapping it to the default.

+ [Creating a new payment profile](../../reference/Chargify-API.v1.yaml/paths/~1payment_profiles.json/post)
+ [Changing the default payment profile](../../reference/Chargify-API.v1.yaml/paths/~1subscriptions~1%7Bidentifier%7D~1payment_profiles~1%7Bpayment_profile_id%7D~1change_payment_profile.json/post)
