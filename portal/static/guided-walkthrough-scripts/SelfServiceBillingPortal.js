async function SelfServiceBillingPortal(workflowCtx, portal) {
  return {
    Guide: {
      name: "Self Service Billing Portal",
      stepCallback: async () => {
        return workflowCtx.showContent(`## Introduction
This is a guided walkthrough that will showcase capabilities of Self Service Billing Portal in Maxio.This involves 7 steps.
1. In step 1 we will read all the offers provided by maxio .
2. In step 2 we will create a subscription by the offer_id for the first offer maxio gives us in the response of step 1.
3. In step 3 we will enable billing portal for the customer we have created in step 2 while creating the subscription by utilizing the customer_id provided in response of step 2.
4. In step 4 we will resend billing portal invitation for the customer we have made in step 2 by using the customer_id.
5. In step 5 we will revoke billing portal invitation for the customer we have made in step 2 by using the customer_id.
6. In step 6 we will read billing portal invitation link , the customer created in step 2 needs to access the billing portal by using the customer_id.
### Getting Started
In order to invoke the API, you will need an ‘BasicAuthUsername’ and ‘BasicAuthPassword’ and ‘subdomain’  .
### Providing BasicAuthUsername and BasicAuthPassword
1. Navigate to Step 1
2. Expand the ‘Authentication’ section.
3. Under ‘BasicAuth’ Provide the ‘BasicAuthUsername’ and ‘BasicAuthPassword’ in their respective fields.
      
### Providing the subdomain
1. Navigate to Step 1
2. Click on the ‘Configure’ button in the bottom right.
3. Under ‘Client Configuration’ Provide the ‘subdomain’ in the ‘subdomain’ input.`);
      },
    },
    "Step 1": {
      name: "List Offers",
      stepCallback: async (stepState) => {
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
          showFullCode: true,
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
          description: "This endpoint is used to list all the offers",
          endpointPermalink: "$e/Offers/listOffers",
          args: {
            include_archived: true,
          },
          verify: (response, setError) => {
            if (response.StatusCode == 200) {
              return true;
            }
            setError(
              "API Call wasn't able to get a valid repsonse. Please try again.",
            );
            return false;
          },
        });
      },
    },
    "Step 2": {
      name: "Create Subscription",
      stepCallback: async (stepState) => {
        const step2State = stepState?.["Step 1"];
        console.log(step2State?.data["offers"]?.[0]?.id);
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
          showFullCode: true,
        }));
        return workflowCtx.showEndpoint({
          description: "This endpoint is used to create a subscription order.",
          endpointPermalink: "$e/Subscriptions/createSubscription",
          args: {
            body: {
              subscription: {
                product_id: step2State?.data["offers"]?.[0]?.product_id,
                product_handle: step2State?.data["offers"]?.[0]?.handle,
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
                  expiration_month: "1",
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
              "API Call wasn't able to get a valid repsonse. Please try again.",
            );
            return false;
          },
        });
      },
    },
    "Step 3": {
      name: "Enable Billing Portal for Customer",
      stepCallback: async (stepState) => {
        const step3State = stepState?.["Step 2"];
        console.log(step3State?.data["subscription"]?.["customer"]?.id);

        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description:
            "This endpoint is used to enable billing portal for the customer.",
          endpointPermalink:
            "$e/Billing%20Portal/enableBillingPortalForCustomer",
          args: {
            customer_id: step3State?.data["subscription"]?.["customer"]?.id,
          },
          verify: (response, setError) => {
            if (response.StatusCode == 200 || response.StatusCode == 201) {
              return true;
            }
            setError(
              "API Call wasn't able to get a valid repsonse. Please try again.",
            );
            return false;
          },
        });
      },
    },
    "Step 4": {
      name: "Resend Billing Portal Invitation",
      stepCallback: async (stepState) => {
        const step4State = stepState?.["Step 2"];
        console.log(step4State?.data["subscription"]?.["customer"]?.id);
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description:
            "This endpoint is used to resend billing portal invitation.",
          endpointPermalink:
            "$e/Billing%20Portal/resendBillingPortalInvitation",

          args: {
            customer_id: step4State?.data["subscription"]?.["customer"]?.id,
          },
          verify: (response, setError) => {
            if (response.StatusCode == 200) {
              return true;
            }
            setError(
              "API Call wasn't able to get a valid repsonse. Please try again.",
            );
            return false;
          },
        });
      },
    },
    "Step 5": {
      name: "Revoke Billing Portal Invitation",
      stepCallback: async (stepState) => {
        const step5State = stepState?.["Step 2"];
        console.log(step5State?.data["subscription"]?.["customer"]?.id);
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description: "This endpoint is used to revoke billing portal access.",
          endpointPermalink: "$e/Billing%20Portal/revokeBillingPortalAccess",
          args: {
            customer_id: step5State?.data["subscription"]?.["customer"]?.id,
          },
          verify: (response, setError) => {
            if (response.StatusCode == 200) {
              return true;
            }
            setError(
              "API Call wasn't able to get a valid repsonse. Please try again.",
            );
            return false;
          },
        });
      },
    },
    "Step 6": {
      name: "Read Billing Portal Invitation Link",
      stepCallback: async (stepState) => {
        const step6State = stepState?.["Step 2"];
        console.log(step6State?.data["subscription"]?.["customer"]?.id);

        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description:
            "This endpoint is used to read billing portal invitation link.",
          endpointPermalink: "$e/Billing%20Portal/readBillingPortalLink",
          args: {
            customer_id: step6State?.data["subscription"]?.["customer"]?.id,
          },
          verify: (response, setError) => {
            if (response.StatusCode == 200) {
              return true;
            }
            setError(
              "API Call wasn't able to get a valid repsonse. Please try again.",
            );
            return false;
          },
        });
      },
    },
  };
}
