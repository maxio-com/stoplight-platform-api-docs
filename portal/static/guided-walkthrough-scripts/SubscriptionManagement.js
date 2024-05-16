async function SubscriptionManagment(workflowCtx, portal) {
  return {
    Guide: {
      name: "Subscription Management Guide",
      stepCallback: async () => {
        return workflowCtx.showContent(`## Introduction
This is a guided walkthrough that will showcase Subscription Management in the Maxio.

Learn how to create signups (also called subscriptions) by signing up customers to products on your site. Before proceeding, we recommend familiarizing yourself with the basis of how subscriptions work. Please review our ["Subscription" help article](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405577172749) for further details.

This guide on signups runs through the basics on creating subscriptions in Advanced Billing, though Advanced Billing can almost handle any scenario using API integration.

1. Advanced Billing [signup methods](page:introduction/basic-concepts/subscription-signup#signup-methods)
2. The [payment methods](page:introduction/basic-concepts/subscription-signup#payment-methods) available for subscriptions
3. How to handle customers with [multiple subscriptions](page:introduction/basic-concepts/subscription-signup#multiple-subscriptions)
4. Component [quantities](page:introduction/basic-concepts/subscription-signup#components) and how they can be used to customize billing
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
          description: `At first, let's preview the subscription order. This endpoint allows you to preview a
          subscription by POSTing the same JSON as used for subscription creation. A subscription will not be created by
          utilizing this endpoint; it is meant to serve as a prediction.
          \nAs a requirement, please fill in either \`product_id\` or \`product_handle\`; it can be a product that
          was created in the Product Catalog walkthrough. Feel free to experiment with other request parameters.
          For example, you can try including component, offer, or coupon created in a Product Catalog walkthrough.
          Once you're satisfied with the result, proceed to the next step.`,
          endpointPermalink: "$e/Subscriptions/previewSubscription",
          args: {
            body: {
              subscription: {
                customer_attributes: {
                  first_name: "John",
                  last_name: "Doe",
                  email: "john.doe@example.com",
                },
              },
            },
          },
          verify: (response, setError) => {
            if (response.StatusCode == 200) {
              if (
                response.data?.subscription_preview?.current_billing_manifest
                  ?.end_date == null &&
                response.data?.subscription_preview?.current_billing_manifest
                  ?.start_date == null
              ) {
                setError(
                  "Provided parameters results with an empty subscription response. Please ensure you specify either `product_id`, or `product_handle`",
                );
                return false;
              }
              return true;
            }
            setError(
              "API Call wasn't able to get a valid response. Please correct your request parameters and try again.",
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
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description: `Now it's time to create an actual Subscription. Please fill in the same data you used for the preview.
          Note that this time, payment information is mandatory. We'll be using mock data provided by a Bogus
          gateway or a Stripe gateway in test mode.
          \nAdditionally, a customer record will be created together with the subscription, as we're using the
          \`customer_attribute\` parameter. Prefer to use an already existing customer? Fill in the \`customer_id\` or
          \`customer_reference\` field instead.`,
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
                  expiration_year: (new Date().getFullYear() + 3).toString(),
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
            if (response.StatusCode == 201) {
              return true;
            }
            setError(
              "API Call wasn't able to get a valid response. Please correct your request parameters and try again.",
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
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description: `Now we're going to demonstrate some more capabilities for manipulating the subscription lifecycle.
          First, we will put the subscription on hold so it won't renew. There is a possibility to set an automatic
          resumption date to a specific timestamp.
          \nThere are more possible state modifications - you can cancel, reactivate, migrate subscriptions, and more.
          \nAfter you successfully pause the subscription, notice the state changing to \`on_hold\`.
          When you're ready, proceed to the next step.`,
          endpointPermalink: "$e/Subscription%20Status/pauseSubscription",
          args: {
            subscription_id: step2State?.data["subscription"]?.id,
            body: {
              hold: {
                automatically_resume_at: null,
              },
            },
          },
          verify: (response, setError) => {
            if (response.StatusCode == 200 || response.StatusCode == 422) {
              return true;
            }
            setError(
              "API Call wasn't able to get a valid response. Please correct your request parameters and try again.",
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
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description: `In this final step, we're going to resume a previously canceled subscription. If the normal next
          renewal date has not passed, the subscription will return to active and will renew on that date. Otherwise,
          it will behave like a reactivation, setting the billing date to 'now' and charging the subscriber.`,
          endpointPermalink: "$e/Subscription%20Status/resumeSubscription",
          args: {
            subscription_id: step2State?.data["subscription"]?.id,
          },
          verify: (response, setError) => {
            if (response.StatusCode == 200) {
              return true;
            }
            setError(
              "API Call wasn't able to get a valid response. Please correct your request parameters and try again.",
            );
            return false;
          },
        });
      },
    },
  };
}
