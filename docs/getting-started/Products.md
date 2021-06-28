---
tags: [Getting Started]
---

# Products

Learn how to setup products for use when creating subscriptions. Products control what is charged and how often charges are assessed/billed to a subscription. If you need help after reading this, please [let us know](https://help.chargify.com/#contact) so we can help and also improve this documentation.

----------
With regards to products, there are three important aspects that are required for using products when interacting with the API:

* Creating the [product family](#product-family)
* Creating the [product](#product)

Before delving into this section, we recommend reviewing our [product documentation](https://help.chargify.com/products/products-intro.html) located in the main section of the Chargify help documents. 

## Product Family

Products have to belong to a product family. Think of them as a logical grouping of products. In our Acme, Inc. example - one possible product family would be "Acme Projects".

To create a product family using the API you need to do the following:

Input attributes:

* `name` (required) - The product family name. For example, if your app had two levels of service, "Basic" and "Premium" then these might be the product names.
* `handle` (optional) - The handle of the product family. This is generated automatically if not specified.
* `description` (optional) - A quick description of what the product family is.

An example of our input attributes might look like the following:

```json
// product_family.json
{
    "product_family": {
        "name":"Acme Projects",
        "description":"Amazing project management tool"
    }
}
```

That data should be posted to the [Product Family Create](../../reference/Chargify-API.v1.yaml/paths/~1product_families~1%7Bproduct_family_id%7D~1products.json/post) API Endpoint.

A simple curl example would be the following: 

```perl
curl -u <API_KEY>:X -H Accept:application/json -d @product_family.json -X POST https://<SUBDOMAIN>.chargify.com/product_families.json
```

To create a product family using the application, please see the following documentation: [Creating Product Families](https://help.chargify.com/products/product-families.html#creating-product-families)

Please see [API Documentation](../../reference/Chargify-API.v1.yaml/paths/~1product_families~1%7Bproduct_family_id%7D~1products.json/post) for complete listing of input/output schema along with code examples in multiple programming languages.

## Product

In Chargify, you sell Subscriptions to your Products. You must first create and configure a Product before you can sell anything to a Customer. Products are administered on a Site-by-Site basis, on the main “Products” tab.

In your app or business, you might call these Products your “Plans” or “Feature Levels”. For example, if you have “Basic”, “Pro”, and “Max” plans, each of these would be a separate Product within Chargify.

You can create a product using the API, like so:

```json
{
    "product":
    {
        "name": "Basic Plan",
        "handle": "basic",
        "description": "This is our basic plan.",
        "accounting_code": "123",
        "request_credit_card": true,
        "price_in_cents": 1000,
        "interval": 1,
        "interval_unit": "month",
        "auto_create_signup_page": true
    }
}
```

That data should be posted to the [Product Create](../../reference/Chargify-API.v1.yaml/paths/~1product_families~1%7Bproduct_family_id%7D~1products.json/post) API Endpoint.

To create a product family using the Admin UI, please see the following documentation: [Creating Product Families](https://help.chargify.com/products/creating-a-product.html)

# Next Steps

After you've created a product to use, you should check out the following articles:

* [Create Components](../basics/Components.md)
* [Create Coupons](../basics/Subscriptions.md#coupons-and-adjustments)
* [Signup Customers](../basics/Signups.md)

