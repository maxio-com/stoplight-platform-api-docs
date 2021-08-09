---
tags: [Basics]
---

# Components

Components are a great way to customize how your customers can use your products or services, and provide an excellent mechanism for increasing the [MRR](http://saasmetrics.co/monthly-recurring-revenue/) per subscription through new features you might develop.

----------

Components allow you to introduce additional “line items” to your products that are often expressed as “add-ons”, upsold features, or pay-per-use items. There are two basic concepts needed to use components that we will discuss:

 1. [Creating](#creating-components) components
 2. The [usage/allocation](#usageallocation) of components

For more information about components, see our [component](https://help.chargify.com/products/product-components.html) documentation.

## Creating Components

To use components, you must first create them. You can do this in a number of ways: by creating them via the Chargify user interface, or by creating them via the API. In the following example, let's create a component called "Text Messages" that costs $0.0075 per message:

```json
{
    "metered_component": {
        "name":"Text messages",
        "unit_name": "text message",
        "taxable": true,
        "pricing_scheme": "per_unit",
        "unit_price": 0.0075
    }
 }
```

The response for the creation of this component would provide you the ID necessary to use the component in all further subsequent API usage requests.

If you need to display component pricing to your customers, we recommend caching this information in your application rather than making repeated API calls for it, since the pricing structure of a component does not usually change very often.

For more information on components, please see the following:

 - About [components](https://help.chargify.com/products/product-components.html)
 - Creating components [via the API](../../reference/Chargify-API.v1.yaml/paths/~1product_families~1%7Bproduct_family_id%7D~1%7Bplural_kind%7D.json/post)

## Usage/Allocation

Associating components with a subscription is done by allocating (or adding usage, depending on the type of component).

* For metered components which reset to zero at each billing period, you would be adding "usage". For example, if your customer sent 10 text messages today then you would add usage for 10 of the "text message" component (see above).

* For quantity components, you would be "allocating" use. For example, if you had a component that represented the number of seats covered under their license, you would allocate that amount: ie. The customer is allocated 10 seats covered by their license to use your software.

* For "on/off" components, you would be turning them on or off. For example, let's say your customer could have "premium support" for an extra $25/month. That component, "premium support" could be turned on or off at will during the life time of the subscription - including prorating it during changes to the subscription plan.

The following is an example that adds 5 text messages as "usage":

```json
{
    "usage":{
        "quantity": 5,
        "memo": "Extra text messages"
    }
}
```

Components can be used in a huge number of varying ways to cover your business model - it's just up to you on how you want it to work.

----------

# Next Steps
- [Managing](./Subscriptions.md) your subscriptions
- API documentation for [components](../../reference/Chargify-API.v1.yaml/paths/~1product_families~1%7Bproduct_family_id%7D~1%7Bplural_kind%7D.json/post), [usage](./b3A6MTQxMDgzODQ-create-usage) or [allocations](./b3A6MTQxMDgzNzg-allocate-component)

