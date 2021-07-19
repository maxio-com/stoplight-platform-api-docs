---
tags: [Basics]
---

# Signups

Learn how to create signups (also called subscriptions) by signing up customers to products on your site. Before proceeding, we recommend familiarizing yourself with the  basis of how subscriptions work. Please review our [subscription documentation introduction](https://help.chargify.com/subscriptions/subscription-intro.html) for further details. 

----------

This guide on signups runs through the basics on creating subscriptions in Chargify, though Chargify can almost handle any scenario using API integration.

1. Chargify's [signup methods](#signup-methods)
2. The [payment methods](#payment-methods) available for subscriptions
3. How to handle customers with [multiple subscriptions](#multiple-subscriptions)
4. Component [quantities](#components) and how they can be used to customize billing

## Signup Methods

There are a number of methods of actually signing up customers to your business. Please explore the following and see how they might be used in your scenario:

* [Manually (within Chargify)](https://help.chargify.com/subscriptions/new-subscriptions.html)
* [Public Signup Pages (PSP)](https://help.chargify.com/public-pages/signup-details.html)
* [API](#api)
* [Chargify Direct](#chargify-direct)

Not all methods will be applicable to your unique business, but the methods we provide can work for just about any business model you could possibly come up with.

### Manually (within Chargify)

The first opportunity for you to create simple subscriptions is within your Chargify account. Make sure you have at least one product that we can use in the following example. Please refer to this condensed [guide](https://help.chargify.com/subscriptions/new-subscriptions.html) in order to create a simple subscription through the Chargify application.

This form of signup is useful for businesses that are of low volume (low number of subscriptions), and it's the fastest to work with since you don't need to integrate a thing.

For more information about subscriptions, please see the [subscriptions](https://help.chargify.com/subscriptions/subscription-intro.html) documentation.

You'll see just how simple this method is, but obviously you can't just sign up customers manually forever - there's a great solution for that!

### Public Signup Pages (PSP)

Public Pages are highly customizable white label pages that you can use as the public-facing side of your subscription business. They are a quick and easy way to integrate with the Chargify platform without having to worry about collecting credit card information or writing custom code yourself.

There are two types of Public Signup Pages available to merchants in all Chargify plans:

1. A Public Signup Page is automatically created for each new product and allows people to sign up for any of your current active products.
2. A [Self-Service Page](https://help.chargify.com/public-pages/self-service-pages.html) is automatically created for each active subscription and allows the customer to manage payment methods.  

If you need information on configuring the look, feel, and behavior of your Public Page, please see [Public Page Default Settings](https://help.chargify.com/public-pages/public-page-default-settings.html).

When using Public Signup Pages, you have a specific URL to which customers can be sent that will allow them to sign themselves up - creating the subscription that is then added to your site.

We recommend reviewing how [Public Signup Pages work](https://help.chargify.com/public-pages/signup-details.html), in order to better understand the many ways Chargify can be integrated with your systems. Public Signup Pages can also be a useful tool during development to test a simple signup with our pre-made forms versus your form in order to troubleshoot.

In some cases, the Public Signup Pages can't quite handle the specific scenario that you might need in your integration with Chargify - that's why we expose a public API for you to consume by your application.

### API

Creating a subscription using the public API can be as simple as sending the following basic information:

1. The **product** - A subscription links a customer to a product available on your site, so it needs to be specified when creating a subscription.
2. The **customer** - A customer is the person who is consuming your product/service. This can either be a reference to an existing customer in your site, or a completely new customer.
3. The **payment details** - For paid products or products that have any billable component, we need to know how to capture payment from them. 

-----
 
+ For [automatic](#payment-methods) billing, that would be through a credit card or banking details (called Automated Clearing House (ACH)). 

+ For [invoice](https://help.chargify.com/invoices/invoice-intro.html) billing, the payment does not happen automatically but can still be done manually either through: non-electronic means and marked manually, or by using a credit card.

For example, the following `POST` to the subscription create API endpoint would create a subscription:

```json
{
  "subscription": {
    "product_handle": "basic",
    "customer_attributes": {
      "first_name": "Alysa",
      "last_name": "Test",
      "email": "alysa@example.com",
      "reference": "1234-AB"
    },
    "credit_card_attributes": {
      "full_number": "1",
      "expiration_month": "10",
      "expiration_year": "2020"
    }
  }
}
```

For more information, see [API Documentation for Creating a Subscription](../../reference/Chargify-API.v1.yaml/paths/~1subscriptions.json/post).

For more advanced subscription creation scenarios, please see [Advanced Subscription Creation Examples](../advanced/Expert-Usage.md#advanced-signup-examples).

### Chargify Direct

Chargify Direct allows you to create Chargify resources (such as Subscriptions) via a form on your own website that posts directly to Chargify. After Chargify receives the form submission, the user is redirected back to your own site. The redirection communicates the result of the submission so that your website can decide how to respond to the user. This flow is sometimes called “transparent redirect” within the industry.

Example:

```html
<form action="https://api.chargify.com/api/v2/signups" method="post">
  <!-- Secure Parameters -->
  <input type="hidden" name="secure[api_id]" value="my_api_id"/>
  <input type="hidden" name="secure[data]" value="redirect_uri=#"/>
  <input type="hidden" name="secure[signature]" value="the_calculated_signature_here"/>
  <!-- Resource parameters here-->
  <!-- For brevity, this form contains no labels, only inputs :) -->
  <input type="hidden" name="signup[product][handle]" value="basic" />
  <input type="text" name="signup[customer][first_name]" value="Alysa" />
  <input type="text" name="signup[customer][last_name]" value="Test" />
  <input type="text" name="signup[customer][reference]" value="1234-AB" />
  <input type="text" name="signup[customer][email]" value="alysa@example.com" />
  <input type="text" name="signup[payment_profile][first_name]" value="Alysa" />
  <input type="text" name="signup[payment_profile][last_name]" value="Test" />
  <input type="text" name="signup[payment_profile][card_number]" value="1" />
  <input type="text" name="signup[payment_profile][expiration_month]" value="10" />
  <input type="text" name="signup[payment_profile][expiration_year]" value="2020" />
  <input type="submit" value="Submit"/>
</form>
```

In the above example, you would need to use the correct `api_id`, set an appropriate `data` value and calculate the correct `signature`. The system will not allow submissions if the basic [authentication](../getting-started/Authentication.md) requirements are not met.

## Payment Methods

The Payment Method for a subscriber can be either automatic or invoice Billing. As a reminder, with automatic billing, the customer is automatically charged when the subscription renews. With invoice billing, the customer is not automatically charged when the subscription is renewed. At the time of renewal, an invoice is created and optionally sent to the customer. You can then record the payments manually for the invoice when you receive them from the customer.

For more information, see [Payment Methods](https://help.chargify.com/subscriptions/subscription-summary.html#payment-method).

## Taxes

If your intent is to charge your subscribers tax via [Avalara taxes](https://help.chargify.com/taxes/avalara-managed-sales-tax.html) or [custom taxes](https://help.chargify.com/taxes/custom-taxes.html), there are a few considerations to be made regarding collecting subscription data. For subscribers to be eligible to be taxed, the following information for the `customer` object or `payment_profile` object must by supplied:

+ A subscription to a [taxable product](https://help.chargify.com/products/product-editing.html#tax-settings)
+ [Full valid billing or shipping address](https://help.chargify.com/taxes/avalara-managed-sales-tax.html#full-address-required-for-taxable-subscriptions) to identify the tax locale
+ The portion of the address that houses the [state information](https://help.chargify.com/taxes/avalara-managed-sales-tax.html#required-state-format-for-taxable-subscriptions) of either adddress must adhere to the ISO standard of a 2-3 character limit/format.
The portion of the address that houses the [country information](https://help.chargify.com/taxes/avalara-managed-sales-tax.html#required-country-format-for-taxable-subscriptions) must adhere to the ISO standard of a 2 character limit/format.

## Multiple Subscriptions

Chargify doesn't limit you to only allowing one single subscription per customer, you can have multiple subscriptions for a single customer using separate or linked payment methods.

In the following example, the existing customer with `reference` (shown as `customer_reference` below) value `1234-AB` will be subscribed to the product specified. You may also specify the customer_id, but it's far more useful to map a user on your system to a customer on Chargify using this reference value. It's commonly filled with the user's unique identifier (ie. the userID) which makes referencing the customer in Chargify very simple as there are customer reference value filters in many methods.

```json
{
  "subscription": {
    "product_handle": "basic",
    "customer_reference": "1234-AB",
    "credit_card_attributes": {
      "full_number": "1",
      "expiration_month": "10",
      "expiration_year": "2020"
    }
  }
}
```
For more information about the `customer_reference` and `customer_id` values, please see the [API documentation](../../reference/Chargify-API.v1.yaml/paths/~1subscriptions.json/post).

Chargify Direct can also be used to create an additional subscription for an existing customer by including the customer reference or customer ID. The subscription can optionally re-use an existing payment profile by including a payment profile ID belonging to that customer.

```html
<input type="hidden" name="signup[customer][reference]" value="abc-123" />
or
<input type="hidden" name="signup[customer][id]" value="12345" />

<input type="hidden" name="signup[payment_profile][id]" value="67890" />
```

## Components

One very common initial signup step is to allocate a quantity of one or more components that correspond to the initial state of their subscription. A quick example is a subscription service that ships X number of widgets every month. The customer has signed up for the "5 widgets per month" product, so you could allocate five of the widget component like the following:

```json
{
  "subscription": {
    "product_handle": "basic",
    "customer_attributes": {
      "first_name": "Alysa",
      "last_name": "Test",
      "email": "alysa@example.com",
      "reference": "1234-AB"
    },
    "credit_card_attributes": {
      "full_number": "1",
      "expiration_month": "10",
      "expiration_year": "2020"
    },
    "components":[
      {
        "component_id": 1,
        "allocated_quantity": 5
      }
    ]
  }
}
```

For more information about components and how to use this great feature to customize your signup process - see [components](./Components.md).

For deeper learning about how components function within Chargify, we recommend the following resources:

+ [Setting component allocations](https://help.chargify.com/subscriptions/setting-component-allocations.html)
+ [Building components in Chargify](https://help.chargify.com/products/product-components.html)


----------

# Next Steps

* Customizing your billing with [components](./Components.md)
* API documentation for [subscriptions](../../reference/Chargify-API.v1.yaml/paths/~1subscriptions.json/post)
