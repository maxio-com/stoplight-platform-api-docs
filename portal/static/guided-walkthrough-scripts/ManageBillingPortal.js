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
          description: `Please fill in the ID of the customer you want to enable billing portal access for. If you've completed a
            \`Create Subscription\` walkthrough, it can be a customer you created along with the subscription.
            You can choose whether you want the invitation link to be automatically sent to the customer's email.`,
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
          description: `If your customer has been invited to the Billing Portal, they will receive a link to manage their
            subscription automatically at the bottom of their statements, invoices, and receipts.
            This link changes periodically for security reasons and is only valid for 65 days.
             \nIf you need to provide your customer with their Management URL through other means, you can
             retrieve it via the API using this endpoint.`,
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
            "If the portal invitation has been lost, you can use the following endpoint to resend the invitation.",
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
          description:
            "If you decide to no longer provide self-service access to your customer, you can revoke their access using the following endpoint.",
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
