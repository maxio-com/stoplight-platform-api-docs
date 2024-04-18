async function ProductCatalog(workflowCtx, portal) {
  return {
    Guide: {
      name: "Product Catalog Management",
      stepCallback: async () => {
        return workflowCtx.showContent(`## Introduction
This is a guided walkthrough that will showcase capabilities of Product Catalog in Maxio.

Learn how to set up products and components for use when creating subscriptions.

Products control what is charged and how ofter charges are assessed/billed to a subscription. If you need help after reading
this, please <u>let us know</u>, so we can help and also improve this documentation.

## Product Family
Products have to belong to a product family. Think of them as a logical grouping of products. In our Acme, Inc. example - 
one possible product family would be "Acme Projects". 

To create a product family using the API you need to do the following:

Input attributes:
- name (required) - The product family name. For example, if your app had two levels of service, "Basic" and "Premium" then 
these might be the product names.
- handle (optional) - The handle of the product family. This is generated automatically if not specified.
- description (optional) - A quick description of what the product family is.
## Product
In Advanced Billing, you sell Subscriptions to your Products. You must first create and configure a Product before you can 
sell anything to a Customer. Products are administered on a Site-by-Site basis, on the main "Products" tab.

In your app or business, you might call these Products your "Plans" or "Feature Levels". For example, if you have 
"Basic", "Pro", and "Max" plans, each of these would be a separate Product within Advanced Billing.
`);
      },
    },
    "Step 1": {
      name: "Create Product Family",
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
          description:
            "This endpoint is used to create a Product Family within your Chargify site.",
          endpointPermalink: "$e/Product%20Families/createProductFamily",
          args: {
            body: {
              product_family: {
                name: "Basic",
                description: "Basic product family",
              },
            },
          },
          verify: (response, setError) => {
            if (response.StatusCode === 201) {
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
      name: "Create Product",
      stepCallback: async (stepState) => {
        const step2State = stepState?.["Step 1"];
        console.log(step2State?.data?.["product_family"]?.id);
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description:
            "This endpoint is used to create a product within your Chargify site.",
          endpointPermalink: "$e/Products/createProduct",
          args: {
            product_family_id: step2State?.data?.["product_family"]?.id,
            body: {
              product: {
                name: "Gold Plan",
                handle: "gold",
                description: "This is our gold plan.",
                accounting_code: "123",
                require_credit_card: true,
                price_in_cents: 1000,
                interval: 1,
                interval_unit: "month",
                auto_create_signup_page: true,
                tax_code: "D0000000",
              },
            },
          },
          verify: (response, setError) => {
            if (response.StatusCode === 201) {
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
      name: "Create Metered Component",
      stepCallback: async (stepState) => {
        const step3State = stepState?.["Step 1"];
        console.log(step3State?.data?.["product"]?.id);
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description: `This endpoint is used to create a component definition of kind metered_component under the specified product family. 
            Metered component can then be added and “allocated” for a subscription.`,
          endpointPermalink: "$e/Components/createMeteredComponent",
          args: {
            product_family_id: step3State?.data?.["product_family"]?.id,
            body: {
              metered_component: {
                name: "Text messages",
                unit_name: "text message",
                pricing_scheme: "per_unit",
                taxable: false,
                prices: [
                  {
                    starting_quantity: 1,
                    unit_price: 1,
                  },
                ],
              },
            },
          },
          verify: (response, setError) => {
            if (response.StatusCode === 201) {
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
      name: "Create Coupon",
      stepCallback: async (stepState) => {
        const stateAfterProductFamilyCreation = stepState?.["Step 1"];
        const stateAfterProductCreation = stepState?.["Step 2"];
        const stateAfterComponentCreation = stepState?.["Step 3"];
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description:
            "This endpoint is used to create a coupon, based on the provided information.",
          endpointPermalink: "$e/Coupons/createCoupon",
          args: {
            product_family_id:
              stateAfterProductFamilyCreation?.data?.["product_family"]?.id,
            body: {
              coupon: {
                name: "15% off",
                code: "15OFF",
                description: "15% off for life",
                percentage: 15,
                allow_negative_balance: false,
                recurring: false,
                stackable: true,
                compounding_strategy: "compound",
                exclude_mid_period_allocations: true,
                apply_on_cancel_at_end_of_period: true,
              },
              restricted_products: {
                [stateAfterProductCreation?.data?.["product"]?.id]: true,
              },
              restricted_components: {
                [stateAfterComponentCreation?.data?.["component"]?.id]: true,
              },
            },
          },
          verify: (response, setError) => {
            if (response.StatusCode === 201) {
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
      name: "Create Offer",
      stepCallback: async (stepState) => {
        const stateAfterProductCreation = stepState?.["Step 2"];
        const stateAfterComponentCreation = stepState?.["Step 3"];
        const stateAfterCouponCreation = stepState?.["Step 4"];
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description:
            "This endpoint is used to create an offer within your Chargify site by sending a POST request.",
          endpointPermalink: "$e/Offers/createOffer",
          args: {
            body: {
              offer: {
                name: "Solo",
                handle: "han_shot_first",
                description: "A Star Wars Story",
                product_id: stateAfterProductCreation?.data?.["product"]?.id,
                components: [
                  {
                    component_id:
                      stateAfterComponentCreation?.data?.["component"]?.id,
                    starting_quantity: 1,
                  },
                ],
                coupons: [stateAfterCouponCreation?.data?.["coupon"]?.code],
              },
            },
          },
          verify: (response, setError) => {
            if (response.StatusCode === 201) {
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
