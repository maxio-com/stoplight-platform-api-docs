async function SubscriptionManagment(workflowCtx, portal) {
  return {
    Guide: {
      name: "Subscription Management Guide",
      stepCallback: async () => {
        return workflowCtx.showContent(`## Introduction
This is a guided walkthrough that will showcase Subscription Management in the Maxio.

Learn how to create signups (also called subscriptions) by signing up customers to products on your site. Before proceeding, we recommend familiarizing yourself with the basis of how subscriptions work. Please review our ["Subscription" help article](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405577172749) for further details.

This guide on signups runs through the basics on creating subscriptions in Advanced Billing, though Advanced Billing can almost handle any scenario using API integration.

1. Advanced Billing [signup methods](#signup-methods)
2. The [payment methods](#payment-methods) available for subscriptions
3. How to handle customers with [multiple subscriptions](#multiple-subscriptions)
4. Component [quantities](#components) and how they can be used to customize billing

## Signup Methods
There are a number of methods of actually signing up customers to your business. Please explore the following help articles and see how they might be used in your scenario:

- [Manually (within Advanced Billing)](https://maxio-chargify.zendesk.com/hc/en-us/articles/6418438887309-Create-Subscriptions-Inside-Advanced-Billing)
- [Public Signup Pages (PSP)](https://maxio-chargify.zendesk.com/hc/en-us/articles/6427493725453-Accept-Signups-with-Public-Signup-Pages?method=themes)
- [API](#api)

Not all methods will be applicable to your unique business, but the methods we provide can work for just about any business model you could possibly come up with.

### Manually (within Advanced Billing)
The first opportunity for you to create simple subscriptions is within your Advanced Billing account. Make sure you have at least one product that we can use in the following example. Please refer to [this help article](https://maxio-chargify.zendesk.com/hc/en-us/articles/6418438887309-Create-Subscriptions-Inside-Advanced-Billing?method=standard) in order to create a simple subscription through the Advanced Billing application.

This form of signup is useful for businesses that are of low volume (low number of subscriptions), and it's the fastest to work with since you don't need to integrate a thing.

For more information about subscriptions, please see the ["Subscriptions" help article](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405577172749).

You'll see just how simple this method is, but obviously you can't just sign up customers manually forever - there's a great solution for that!

### Public Signup Pages (PSP)

Public Pages are highly customizable white label pages that you can use as the public-facing side of your subscription business. They are a quick and easy way to integrate with Advanced Billing without having to worry about collecting credit card information or writing custom code yourself.

There are two types of Public Signup Pages available to merchants in all Advanced Billing plans:

1. A Public Signup Page is automatically created for each new product and allows people to sign up for any of your current active products.
2. A [Self-Service Page](https://maxio-chargify.zendesk.com/hc/en-us/articles/5404759627021#example-self-service-page) is automatically created for each active subscription and allows the customer to manage payment methods.

If you need information on configuring the look, feel, and behavior of your Public Page, please see [Public Page Default Settings](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405398868749) and [Individual Page Settings](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405267754381).

When using Public Signup Pages, you have a specific URL to which customers can be sent that will allow them to sign themselves up - creating the subscription that is then added to your site.

We recommend reviewing how [Public Signup Pages work](https://maxio-chargify.zendesk.com/hc/en-us/articles/6418438887309-Create-Subscriptions-Inside-Advanced-Billing), in order to better understand the many ways Advanced Billing can be integrated with your systems. Public Signup Pages can also be a useful tool during development to test a simple signup with our pre-made forms versus your form in order to troubleshoot.

In some cases, the Public Signup Pages can't quite handle the specific scenario that you might need in your integration with Advanced Billing - that's why we expose a public API for you to consume by your application.

### API
Creating a subscription using the public API can be as simple as sending the following basic information:

1. The **product** - A subscription links a customer to a product available on your site, so it needs to be specified when creating a subscription.
2. The **customer** - A customer is the person who is consuming your product/service. This can either be a reference to an existing customer in your site, or a completely new customer.
3. The **payment details** - For paid products or products that have any billable component, we need to know how to capture payment from them.

---

- For [automatic](#payment-methods) billing, that would be through a credit card or banking details (called Automated Clearing House (ACH)).

- For [invoice](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405485162253) billing, the payment does not happen automatically but can still be done manually either through: non-electronic means and marked manually, or by using a credit card.

## Multiple Subscriptions

Advanced Billing doesn't limit you to only allowing one single subscription per customer, you can have multiple subscriptions for a single customer using separate or linked payment methods.

In the following example, the existing customer with \`reference\` (shown as \`customer_reference\` below) value \`1234-AB\` will be subscribed to the product specified. You may also specify the customer_id, but it's far more useful to map a user on your system to a customer on Advanced Billing using this reference value. It's commonly filled with the user's unique identifier (ie. the userID) which makes referencing the customer in Advanced Billing very simple as there are customer reference value filters in many methods.

For more information about the \`customer_reference\` and \`customer_id\` values, please see the [API documentation]($e/Subscriptions/createSubscription).

## Billing Dates
A common method of managing a subscription might be for the billing date to change (as in the date the subscription is next processed/assessed and charges may potentially be captured from the payment method of the subscription). This is generally done: as a common method of extending or shortening trials, or processing the subscription "immediately" or just changing the billing date for use in [calandar billing](https://maxio-chargify.zendesk.com/hc/en-us/articles/5404938778125#calendar-billing-0-0) scenarios.

Please see the full API documentation for [updating subscription assessment date]($e/Subscriptions/updateSubscription) for more information.

## Updating Methods
COPY

### Updating Payment Details
Updating the payment details is how you would change the card that somebody uses for their subscription. You can also use this method to simply change the expiration date of the card.

> ❗️ If your subscriber pays taxes on their purchased product, and you are attempting to update the \`payment_profile\`, complete address information is required. For information on required address formatting to allow your subscriber to be taxed, please see the section on [sign-up taxes](./Signups.md#taxes).

You can update the payment details in a few different ways:

- Update via [Self-Service Pages](#updating-via-self-service-pages)
- Update via [API](#updating-via-api)
- Update via [Chargify.js](page:development-tools/chargify-js/overview#updating-existing-payment-methods)

### Updating via Self-Service Pages
You may allow your users to update their information themselves, using the self-service public hosted pages or even the new billing portal.

For the public service page card update, you merely direct them to a specific URL:

\`https://{subdomain}.chargify.com/update_payment/{subscription_id}/{token}\`

- The \`subdomain\` is just your subdomain. Our imaginary company "Acme"'s URL would start like the following: \`https://acme.chargify.com\`

- The \`subscription_id\` would be the integer ID of the subscription as it is in the Advanced Billing site/subdomain.

- The \`token\` is calculated using the first 10 characters of the SHA-1 hex digest of this message:

\`\`\`
message = "update_payment--{subscription_id}--{shared_key}"
token = SHA1(message)[0..9]
\`\`\`

For more information about the self-service card update public page, please see [this help article](https://maxio-chargify.zendesk.com/hc/en-us/articles/5404759627021#obtaining-the-self-service-page-url).

Your users can also self-service update their payment method if using the Advanced Billing Portal feature, please see [this help article](https://maxio-chargify.zendesk.com/hc/en-us/articles/5404759627021#updating-payment-information-via-the-billing-portal) for more information.

### Updating via API
Updating the API is very useful in situations where you are more directly integrating with Advanced Billing.

There are many methods of performing this action via the API, you can:

1. Update the payment profile indirectly through a subscription update
2. Update the payment profile directly

Updating the payment profile through a subscription update would look like the following:

_**Note**_ - Partial card updates for Authorize.Net are not allowed via this endpoint.

\`\`\`json
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
\`\`\`

Updating the payment profile directly would look like the following:

\`\`\`json
// PUT /payment_profiles/{payment_profile_id}.json
{
  "payment_profile": {
    "full_number": "2",
    "expiration_month": "10",
    "expiration_year": "2030"
  }
}
\`\`\`

Please see the full [API documentation]($e/Payment%20Profiles/updatePaymentProfile) for more complete documentation about updating payment profiles via the API.

### Cancelling
Cancelling subscriptions is another common task that users will need to perform, or that is performed on their behalf when payment cannot be captured.

For example, if you wanted to cancel a subscription using the API:

\`\`\`json
// DELETE /subscriptions/{subscription_id}.json
{
  "subscription": {
    "cancellation_message": "Canceling the subscription via the API"
  }
}
\`\`\`

It is also possible to cancel a subscription at the end of the current billing period, this is called a "delayed cancellation" and it's API call would look like the following:

\`\`\`json
// DELETE /subscriptions/{subscription_id}.json
{
  "subscription": {
    "cancel_at_end_of_period": 1,
    "cancellation_message": "Canceling the subscription via the API"
  }
}
\`\`\`

For information about cancelling using the API, please see [Cancelling via API]($e/Subscription%20Status/cancelSubscription).

For information about cancelling subscriptions in general, please see the ["Cancellation" help article](https://maxio-chargify.zendesk.com/hc/en-us/articles/5404968574605).

### Refunds
When handing charging to any payment method, there are times when you will be required to refund. Refunds are only supported for the following gateways that are listed in [this help article](https://maxio-chargify.zendesk.com/hc/en-us/articles/5404572583693#refunds-0-0). Please refer to the previously linked document for up to the minute information on what gateways support refunds.

For gateways like Bambora, you will need to perform a "manual refund" in that you record the refund as a transaction directly after you perform the actual refund in your gateway account.

You can perform a non-manual refund using the API, like in the following example:

\`\`\`json
{
  "refund": {
    "payment_id": "{payment_id}",
    "amount": "4.00",
    "memo": "Your memo here."
  }
}
\`\`\`

You will substitute values for \`payment_id\`, \`amount\` and \`memo\` in this example. The \`payment_id\` is the ID of the payment transaction that the credit will be applied to.

For more information, see [API refunds](https://prod-developers.maxio.com/legacy/index.html#/http/api-endpoints/legacy-subscription-balance/create-refund).

For a manual/external refund, the API call will be almost the exact same except you also supply a value for \`external\`:

\`\`\`json
{
  "refund": {
    "payment_id": "{payment_id}",
    "amount": "4.00",
    "memo": "Your memo here."
  },
  "external": 1
}
\`\`\`

In the case of a manual or external refund, there will be nothing which is passed through on to your gateway - it will simply be added to the subscription, modifying the balance and adding a transaction record.

For more information, see [API Refunds (External)](https://prod-developers.maxio.com/legacy/index.html#/http/api-endpoints/legacy-subscription-balance/create-refund).

`);
      },
    },
    "Step 1": {
      name: "Preview Subscription Order",
      stepCallback: async (stepState) => {
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
          auth: {
            ...defaultConfig.auth,
            BasicAuth: {
              BasicAuthUserName: "API_KEY",
              BasicAuthPassword: "x",
            },
          },
          config: {
            ...defaultConfig.config,
            subdomain: "your-site",
          },
        }));
        return workflowCtx.showEndpoint({
          description: "This endpoint is used to preview a subscription order.",
          endpointPermalink: "$e/Subscriptions/previewSubscription",
          args: {
            body: {
              customer_attributes: {
                first_name: "John",
                last_name: "Doe",
                email: "john.doe@example.com",
              },
            },
          },
          verify: (response, setError) => {
            if (response.StatusCode == 200) {
              return true;
            }
            setError(
              "API Call wasn't able to get a valid response. Please try again.",
            );
            return false;
          },
        });
      },
    },
    "Step 2": {
      name: "Create Subscription",
      stepCallback: async (stepState) => {
        const step1State = stepState?.["Step 1"];
        console.log(step1State?.data[0]?.["product"]?.id);
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description: "This endpoint is used to create a subscription order.",
          endpointPermalink: "$e/Subscriptions/createSubscription",
          args: {
            body: {
              subscription: {
                product_id: step1State?.data[0]?.["product"]?.id,
                customer_attributes: {
                  first_name: "John",
                  last_name: "Doe",
                  email: "John@example.com",
                },
                credit_card_attributes: {
                  last_name: "Smith",
                  first_name: "Joe",
                  full_number: "4111111111111111",
                  expiration_year: "2027",
                  expiration_month: "12",
                  card_type: "visa",
                  billing_zip: "02120",
                  billing_state: "MA",
                  billing_country: "US",
                  billing_city: "Boston",
                  billing_address_2: "billing_address_22",
                  billing_address: "123 Mass Ave.",
                },
              },
            },
          },
          verify: (response, setError) => {
            if (response.StatusCode == 200) {
              return true;
            }
            setError(
              "API Call wasn't able to get a valid response. Please try again.",
            );
            return false;
          },
        });
      },
    },
    "Step 3": {
      name: "Pause Subscription",
      stepCallback: async (stepState) => {
        const step2State = stepState?.["Step 2"];
        console.log(step2State?.data["subscription"]?.id);
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description: "This endpoint is used to pause a subscription order.",
          endpointPermalink: "$e/Subscription%20Status/pauseSubscription",
          args: {
            subscription_id: step2State?.data["subscription"]?.id,
            body: {
              hold: {
                automatically_resume_at: "2017-05-25T11:25:00Z",
              },
            },
          },
          verify: (response, setError) => {
            if (response.StatusCode == 200) {
              return true;
            }
            setError(
              "API Call wasn't able to get a valid response. Please try again.",
            );
            return false;
          },
        });
      },
    },
    "Step 4": {
      name: "Resume Subscription",
      stepCallback: async (stepState) => {
        const step2State = stepState?.["Step 2"];
        console.log(step2State?.data["subscription"]?.id);
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description: "This endpoint is used to resume a subscription order.",
          endpointPermalink: "$e/Subscription%20Status/resumeSubscription",
          args: {
            subscription_id: step2State?.data["subscription"]?.id,
          },
          verify: (response, setError) => {
            if (response.StatusCode == 200 || response.StatusCode == 201) {
              return true;
            }
            setError(
              "API Call wasn't able to get a valid response. Please try again.",
            );
            return false;
          },
        });
      },
    },
  };
}
