async function SubscriptionManagment(workflowCtx, portal) {
  return {
    Guide: {
      name: "Subscription Management Guide",
      stepCallback: async () => {
        return workflowCtx.showContent(`## Introduction
This is a guided walkthrough that will showcase subscription management in the maxio in 7 steps.
1. In step 1 we will see all the product families .
2. In step 2 we will see all the products for the first product family we get as a response in step 1.
3. In step 3 we will preview a subscription order for the  first product we got in step 2 by using the product_id.
4. In step 4 we will create a subscription order for the  first product we got in step 2 by using the product_id .
5. In step 5 we will pause the subscription order for the subscription we created in step 4 by using the subscription_id .
6. In step 6 we will resume the subscription order for the subscription we created in step 4 by using the subscription_id.
7. In step 7 we will see the subscription renewal for the subscription we created in step 4 by using subscription_id.
### Getting Started
In order to invoke the API, you will need an ‘BasicAuthUsername’ and ‘BasicAuthPassword’ and ‘subdomain’  .
### Providing BasicAuthUsername and BasicAuthPassword
1. Navigate to Step 1
2. Expand the ‘Authentication’ section.
3. Under ‘BasicAuth’ Provide the ‘BasicAuthUsername’ and ‘BasicAuthPassword’ in their respective fields.      
 ### Providing the subdomain
1. Navigate to Step 1
2. Click on the ‘Configure’ button in the bottom right.
3. Under ‘Client Configuration’ Provide the ‘subdomain’ in the ‘subdomain’ input.  
`);
      },
    },
    "Step 1": {
      name: "Get Product Families",
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
          description: "This endpoint is used to get all the product families.",
          endpointPermalink: "$e/Product%20Families/listProductFamilies",
          args: {},
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
      name: "Get Products in a Product Family",
      stepCallback: async (stepState) => {
        const step2State = stepState?.["Step 1"];
        console.log(step2State?.data[0]?.["product_family"]?.id);
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description:
            "This endpoint is used to get all the products in a product family.",
          endpointPermalink:
            "$e/Product%20Families/listProductsForProductFamily",
          args: {
            product_family_id: step2State?.data[0]?.["product_family"]?.id,
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
      name: "Preview Subscription Order",
      stepCallback: async (stepState) => {
        const step3State = stepState?.["Step 2"];
        console.log(step3State?.data[0]?.["product"]?.id);
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description: "This endpoint is used to preview a subscription order.",
          endpointPermalink: "$e/Subscriptions/previewSubscription",
          args: {
            body: {
              product_id: step3State?.data[0]?.["product"]?.id,
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
    "Step 4": {
      name: "Create Subscription Order",
      stepCallback: async (stepState) => {
        const step4State = stepState?.["Step 2"];
        console.log(step4State?.data[0]?.["product"]?.id);
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description: "This endpoint is used to create a subscription order.",
          endpointPermalink: "$e/Subscriptions/createSubscription",
          args: {
            body: {
              subscription: {
                product_id: step4State?.data[0]?.["product"]?.id,
                product_handle: step4State?.data[0]?.["product"]?.handle,
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
    "Step 5": {
      name: "Pause Subscription Order",
      stepCallback: async (stepState) => {
        const step5State = stepState?.["Step 4"];
        console.log(step5State?.data["subscription"]?.id);
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description: "This endpoint is used to pause a subscription order.",
          endpointPermalink: "$e/Subscription%20Status/pauseSubscription",
          args: {
            subscription_id: step5State?.data["subscription"]?.id,
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
    "Step 6": {
      name: "Resume Subscription Order",
      stepCallback: async (stepState) => {
        const step6State = stepState?.["Step 4"];
        console.log(step6State?.data["subscription"]?.id);
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description: "This endpoint is used to resume a subscription order.",
          endpointPermalink: "$e/Subscription%20Status/resumeSubscription",
          args: {
            subscription_id: step6State?.data["subscription"]?.id,
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

    "Step 7": {
      name: "Preview Subscription Renewal",
      stepCallback: async (stepState) => {
        const step7State = stepState?.["Step 4"];
        console.log(step7State?.data["subscription"]?.id);
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description:
            "This endpoint is used to preview a subscription renewal",
          endpointPermalink: "$e/Subscription%20Status/previewRenewal",
          args: {
            subscription_id: step7State?.data["subscription"]?.id,
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
  };
}
