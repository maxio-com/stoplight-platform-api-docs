async function ManageBillingPortal(workflowCtx, portal) {
  return {
    Guide: {
      name: "Manage Billing Portal",
      stepCallback: async () => {
        return workflowCtx.showContent(`## Introduction
This is a guided walkthrough that will showcase Billing Portal Management in the Maxio.

Subscriptions can also be updated, at the hands of the subscriber, via the Billing Portal. The Billing Portal serves as a method to allow your subscribers to perform certain managerial actions against their current subscription. As a merchant, you have the ability to also restrict what actions can be performed by a subscriber.

As an example, here are a few examples of actions that can be performed via the Billing Portal:

- Plan changes
- Subscription cancellation
- Credit card updates
- Component purchase / allocation updates

For more information on the Billing Portal, we encourage you to read [this help article](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405529728141-Billing-Portal-Introduction).

As a prerequisite for this walkthrough, your site must have Billing Portal enabled. To do this, navigate to the settings of your Advanced Billing Site, then select Billing Portal. Check the box for Enabled for this site and fill in any additional settings as necessary.`);
      },
    },
    "Step 1": {
      name: "Enable Billing Portal for Specific Customer",
      stepCallback: async (stepState) => {
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description:
            "This endpoint is used to enable billing portal for the customer.",
          endpointPermalink:
            "$e/Billing%20Portal/enableBillingPortalForCustomer",
          args: {},
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
    "Step 2": {
      name: "Read Billing Portal Invite",
      stepCallback: async (stepState) => {
        const step1State = stepState?.["Step 1"];
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description:
            "This endpoint is used to read billing portal invitation link.",
          endpointPermalink: "$e/Billing%20Portal/readBillingPortalLink",
          args: {
            customer_id: step1State?.data["customer"]?.id,
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
    "Step 3": {
      name: "Resend Billing Portal Invitation",
      stepCallback: async (stepState) => {
        const step1State = stepState?.["Step 1"];
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description:
            "This endpoint is used to resend billing portal invitation.",
          endpointPermalink:
            "$e/Billing%20Portal/resendBillingPortalInvitation",
          args: {
            customer_id: step1State?.data["customer"]?.id,
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
    "Step 4": {
      name: "Revoke Billing Portal Invitation",
      stepCallback: async (stepState) => {
        const step1State = stepState?.["Step 1"];
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description: "This endpoint is used to revoke billing portal access.",
          endpointPermalink: "$e/Billing%20Portal/revokeBillingPortalAccess",
          args: {
            customer_id: step1State?.data["customer"]?.id,
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
