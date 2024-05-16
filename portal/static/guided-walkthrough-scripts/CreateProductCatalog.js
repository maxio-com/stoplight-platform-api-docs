async function ProductCatalog(workflowCtx, portal) {
  return {
    Guide: {
      name: "Product Catalog Management",
      stepCallback: async () => {
        return workflowCtx.showContent(`## Introduction
This is a guided walkthrough that will showcase capabilities of Product Catalog in Maxio.

Learn how to set up products and components for use when creating subscriptions.

### Prerequisite
Before proceeding, please read the [How to Get Started]($h/__getting_started) guide and generate an API Key for your site.

### Additional Resources
To gain a deeper understanding of the concepts presented in this walkthrough, we recommend reading the following resources:
- [Product Catalog basic concepts](page:introduction/basic-concepts/product-catalog)
- [Products Introduction help article](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405561405709-Products-Introduction#product-families)
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
          description: `Products must belong to a product family, which serves as a logical grouping. Use the following endpoint to create one.
            \nPlease provide your API key in the Authentication panel below and configure your subdomain in the right panel.
            \nFor further information on product families, refer to the [Product Family concepts](page:introduction/basic-concepts/product-catalog#product-family)
            and [Product Family help article](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405369633421-Product-Families).`,
          endpointPermalink: "$e/Product%20Families/createProductFamily",
          args: {
            body: {
              product_family: {
                name: "Basic",
                handle: "basic-" + Math.floor(Date.now() / 1000).toString(),
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
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description: `Once you have a product family, you can create a Product with help of this endpoint.
            \nTo learn more about the product families, please see [Product concepts](page:introduction/basic-concepts/product-catalog#product).`,
          endpointPermalink: "$e/Products/createProduct",
          args: {
            product_family_id: step2State?.data?.["product_family"]?.id,
            body: {
              product: {
                name: "Gold Plan",
                handle: "gold-" + Math.floor(Date.now() / 1000).toString(),
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
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description: `As the next step we're going to create a Component. Read more about components in [Components concepts](page:introduction/basic-concepts/product-catalog#components)
                       and [Components help article](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405020625677-Components-Overview).
                       \nIn this example we are creating a \`metered component\`.`,
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
          description: `Then we're going to next item provided by a product catalog, that is a coupon, enabling you to provide your customers some discount.
            Read more about the coupons in [Coupons concepts](page:introduction/basic-concepts/product-catalog#coupons) and [Coupons help article](https://maxio-chargify.zendesk.com/hc/en-us/articles/18239922347149-Coupons-Overview)`,
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
          description: `The last thing we're going to create as part of this guide will be an offer, that is a package combining previously created
            Product, Component and Coupon. Read more about offers in [this help article](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405430384013-Offers-Introduction#offers-introduction-0-0)
            \nThat's it! Now that you've created a test Product Catalog using they API, you may try creating a Subscription that will use it.
            Check out [Create Subscription Guided Walkthrough](page:walkthroughs/subscription-management/walkthrough-1)`,
          endpointPermalink: "$e/Offers/createOffer",
          args: {
            body: {
              offer: {
                name: "Solo",
                handle:
                  "han_shot_first-" + Math.floor(Date.now() / 1000).toString(),
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
