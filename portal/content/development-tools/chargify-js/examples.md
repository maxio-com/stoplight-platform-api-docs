# Examples

> ❗️ The following collection of code is provided as a reference, and is provided as-is. You are responsible for ensuring it works properly on your page(s), as well as maintaining this code for the future. Any modifications you make to this code, or modifications you make to code in similar sections, are your responsibility.

The following examples all include selectors named sequentially as chargify1, chargify2, etc. However, the selectors can be named anything.

## Example of Chargify.js Form

| ![Chargify.js Example Form](static/images/chargify-js/examples/maxio-example.png) |
| :-------------------------------------------------------------------------------: |
|                    **Example of subscriber-facing HTML form**                     |

```html
<!doctype html>
<html>
  <head>
    <title>Maxio Advanced Billing</title>

    <script src="https://js.chargify.com/latest/chargify.js"></script>
    <!-- This links to the Maxio hosted iframes for Chargify.js -->
    <link
      href="https://fonts.googleapis.com/css?family=Lato:400,700,900"
      rel="stylesheet"
    />
    <style>
      body {
        font-family: "Lato", sans-serif;
        background-color: #f2f4f8;
        overflow: scroll;
        min-height: 800px;
        height: 100vh;
      }

      h1 {
        margin-top: 0;
      }

      button {
        padding: 10px;
        color: #fff;
        border-radius: 6px;
        background: #47c486;
        font-size: 14px;
        font-weight: 500;
        border: none;
        margin-top: 5px;
        padding-left: 15px;
        padding-right: 15px;
      }

      .chargify-js-wrapper {
        margin: 0 auto;
        display: flex;
        flex-flow: column;
        width: fit-content;
        height: 100%;
        justify-content: center;
        align-items: center;
      }

      .chargify-js-content {
        padding: 20px;
        border-radius: 10px;
        background: #fff;
        width: 50%;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.175);
        margin: 0 auto;
        min-width: 300px;
        border-top: 5px solid #439aea;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
      }

      #chargify1 {
        display: flex;
      }

      #chargify1 iframe {
        width: 100% !important;
      }

      #chargify2 {
        display: flex;
      }

      #chargify2 iframe {
        width: 100% !important;
      }

      #chargify3 iframe {
        width: 100% !important;
      }

      #chargify4 iframe {
        width: 100% !important;
      }

      #chargify5 iframe {
        width: 100% !important;
      }

      #chargify6 iframe {
        width: 100% !important;
      }

      #chargify7 iframe {
        width: 100% !important;
      }

      #chargify8 iframe {
        width: 100% !important;
      }

      #chargify9 iframe {
        width: 100% !important;
      }

      #chargify10 iframe {
        width: 100% !important;
      }

      #chargify11 iframe {
        width: 100% !important;
      }

      #chargify12 iframe {
        width: 100% !important;
      }

      .cardfront {
        display: flex;
        flex-flow: column;
      }

      .cardback {
        display: flex;
        flex-flow: row;
      }

      .cardback div {
        margin-right: 15px;
      }

      .cardback div:last-child {
        margin-right: 0;
      }

      .name {
        display: flex;
        flex-flow: row;
      }

      .name div {
        margin-right: 15px;
        width: 100%;
      }

      .name div:last-child {
        margin-right: 0;
        width: 100%;
      }

      .address3 {
        display: flex;
        flex-flow: row;
      }

      .address3 div {
        margin-right: 15px;
        width: 100%;
      }

      .address3 div:last-child {
        margin-right: 0;
        width: 100%;
      }
      .address4 {
        display: flex;
        flex-flow: row;
      }

      .address4 div {
        margin-right: 15px;
        width: 100%;
      }

      .address4 div:last-child {
        margin-right: 0;
        width: 100%;
      }
    </style>
  </head>

  <body>
    <div class="chargify-js-wrapper">
      <div class="chargify-js-content">
        <h1>Chargify</h1>

        <form class="host-form" id="host-form">
          <div class="cardfront">
            <div id="chargify1"></div>
          </div>

          <div class="cardback">
            <div id="chargify2"></div>
            <div id="chargify3"></div>
            <div id="chargify4"></div>
          </div>

          <div class="name">
            <div id="chargify5"></div>
            <div id="chargify6"></div>
          </div>

          <div class="address1">
            <div id="chargify7"></div>
          </div>

          <div class="address2">
            <div id="chargify8"></div>
          </div>

          <div class="address3">
            <div id="chargify9"></div>
            <div id="chargify10"></div>
          </div>

          <div class="address4">
            <div id="chargify11"></div>
            <div id="chargify12"></div>
          </div>

          <button type="submit" class="host-button">Submit Host Form</button>
        </form>
      </div>
    </div>

    <script src="./assets/load.js"></script>
    <!-- This contains your Chargify.js file -->
    <script src="./assets/submit.js"></script>
    <!-- This pauses form submission to create a token -->
  </body>
</html>
```

## Minimal HTML form

```html
<!doctype html>
<html>
  <head>
    <script src="https://js.chargify.com/latest/chargify.js"></script>
  </head>

  <body>
    <div id="gocardless-header"></div>

    <form id="chargify-form">
      <div id="chargify1"></div>
      <div id="chargify2"></div>
      <div id="chargify3"></div>
      <div id="chargify4"></div>
      <div id="chargify5"></div>
      <div id="chargify6"></div>
      <div id="chargify7"></div>
      <div id="chargify8"></div>
      <div id="chargify9"></div>
      <div id="chargify10"></div>
      <div id="chargify11"></div>
      <div id="chargify12"></div>
      <div id="chargify13"></div>
      <div id="chargify14"></div>

      <input id="chargify-token" type="hidden" />

      <button type="submit">Submit Form</button>
    </form>

    <div id="gocardless-footer"></div>
  </body>
</html>
```

## Minimal Chargify.js Examples

### Minimal Example with Credit Card

The following example contains a minimalist approach to working with Chargify.js and credit cards. All the fields will appear as one iframe where you define the `#chargify1` selector, and this form accepts credit cards.

```javascript
<script>
    var chargify = new Chargify();

    chargify.load({
        selector: '#chargify1',
        publicKey: 'your-public-api-key',
        type: 'card',
        serverHost: 'https://your-subdomain.chargify.com'
    });
</script>
```

### Minimal Example with ACH

The following example contains a minimalist approach to working with Chargify.js and bank accounts. Note that the only difference from the example above is that `type` has been set to `bank`.

```javascript
<script>
    var chargify = new Chargify();

    chargify.load({
        selector: '#chargify1',
        publicKey: 'your-public-api-key',
        type: 'bank',
        serverHost: 'https://your-subdomain.chargify.com'
    });
</script>
```

### Minimal Example with ACH and Maxio Payments gateway

If you want to use Chargify.js for tokenization of the bank accounts for ACH using the Maxio Payments gateway, you need to have Plaid support enabled (contact our support to do that).

```javascript
<script>
  var chargify = new Chargify();

  chargify.load({
    // selector, where the iframe will be included on your page
    // optional if you have a `selector` on each and every field
    selector: '#chargify-form',

    // (i.e. '1a2cdsdn3lkn54lnlkn')
    publicKey: 'chjs_your-public-api-key',

    // form type
    type: 'direct_debit',

    // selector for Plaid Link (Plaid Link will be shown inside of it)
    selectorForPlaidLink: '#plaid-link',

    // optional - name of the Plaid Link button (deafult: 'Use Plaid to connect my bank account')
    plaidLinkName: 'Use Plaid to connect my bank account',

    // optional - style of the Plaid Link button (default: there are no styles, just a link)
    plaidLinkStyle: {
      backgroundColor: '#000',
      color: '#fff',
      padding: '15px 25px',
      textDecoration: 'none',
      marging: '20 px'
    },

    // points to your Advanced Billing site
    serverHost: 'https://acme.chargify.com',
  });
</script>
```

### Minimal Example with Direct Debit (GoCardless gateway)

The following example contains a minimalist approach to working with Chargify.js and Direct Debit through GoCardless.

For more information on GoCardless, please see the following resources:

- [GoCardless help article](https://maxio.zendesk.com/hc/en-us/articles/24176159136909-GoCardless#gocardless-setup)
- Using GoCardless via API for [creating subscriptions]($e/Subscriptions/createSubscription) and/or [payment profiles]($e/Payment%20Profiles/createPaymentProfile)

```javascript
<script>
    var chargify = new Chargify();

    chargify.load({
        selector: '#chargify1',
        publicKey: 'your-public-api-key',
        type: 'direct_debit',
        selectorForGoCardlessHeader: '#gocardless-header',
        selectorForGoCardlessFooter: '#gocardless-footer',
        serverHost: 'https://your-subdomain.chargify.com'
    });
</script>
```

### Minimal Example with SEPA or BECS Direct Debit (Stripe gateway)

The following example contains a minimalist approach to working with Chargify.js and Direct Debit through Stripe.

For more information on Stripe Direct Debit, please see the following resources:

- [Stripe Direct Debit help article](https://maxio.zendesk.com/hc/en-us/articles/24176170430093-Stripe-SEPA-and-BECS-Direct-Debit)
- Using Stripe SEPA Direct Debit via API for [creating subscriptions]($e/Subscriptions/createSubscription) and/or [payment profiles]($e/Payment%20Profiles/createPaymentProfile)
- Using Stripe BECS Direct Debit via API for [creating subscriptions]($e/Subscriptions/createSubscription) and/or [payment profiles]($e/Payment%20Profiles/createPaymentProfile)

```javascript
<script>
    var chargify = new Chargify();

    chargify.load({
        selector: '#chargify1',
        publicKey: 'your-public-api-key',
        type: 'direct_debit',
        serverHost: 'https://acme.chargify.com'
    });
</script>
```

### Minimal Example with Apple Pay

The following example contains a minimalist approach to working with Chargify.js and Apple Pay through Braintree.

For more information on Apple Pay via Braintree, please see the following resource: [Apple Pay via Braintree overview](https://developer.paypal.com/braintree/docs/guides/apple-pay/overview)

```javascript
<script>
    var chargify = new Chargify();

    chargify.load({
        selector: '#chargify1',
        publicKey: 'your-public-api-key',
        type: 'apple_pay',
        applePayLabel: 'Example product',
        applePayAmount: '10', // the amount should be formatted with period ".", for example "10.5"
        selectorForApplePayButton: '#apple-pay',
        serverHost: 'https://your-subdomain.chargify.com'
    }, {
        // this function is called after Apple Pay authorization passes (i.e. user has authorized payment via fingerprint)
        onApplePayAuthorized: function() {
            chargify.token(
                document.querySelector('.host-form'),

                function success(token, message) {
                    console.log('{host} token SUCCESS - token: ', token);
                },

                function error(err) {
                    console.log('{host} token ERROR - err: ', err);
                }
            );
        }
    });
</script>
```

### Minimal Example with PayPal

The following example contains a minimalist approach to working with Chargify.js and PayPal through Braintree.

```javascript
<script>
    var chargify = new Chargify();

    chargify.load({
        selector: '#chargify1',
        publicKey: 'your-public-api-key',
        type: 'pay_pal',
        selectorForPayPalButton: '#pay-pal',
        serverHost: 'https://your-subdomain.chargify.com'
    }, {
        // this function is called after PayPal authorization passes (i.e. user has completed PayPal flow)
        onPayPalAuthorized: function() {
            chargify.token(
                document.querySelector('.host-form'),

                function success(token, message) {
                    console.log('{host} token SUCCESS - token: ', token);
                },

                function error(err) {
                    console.log('{host} token ERROR - err: ', err);
                }
            );
        }
    });
</script>
```

## Full Chargify.js Examples

### Full Example with Credit Card

The following is a full example of using Chargify.js with a credit card.

```javascript
var chargify = new Chargify();

chargify.load({
  publicKey: "your-public-api-key",
  type: "card",
  serverHost: "https://your-subdomain.chargify.com",
  hideCardImage: false,
  optionalLabel: "(optional field)",
  requiredLabel: "*",
  addressDropdowns: true,
  style: {
    "#chargify-form": { border: "1px dashed #ffc0cb57" },
    field: {
      backgroundColor: "orange",
      paddingTop: "10px",
      paddingBottom: "10px",
      borderRadius: "5px",
    },
    input: {
      backgroundColor: "#e6e6e6",
      paddingTop: "2px",
      paddingBottom: "1px",
      placeholder: { color: "#eee" },
    },
    label: {
      backgroundColor: "lightblue",
      paddingTop: "2px",
      paddingBottom: "1px",
    },
    message: {
      backgroundColor: "red",
      color: "white",
      paddingTop: "2px",
      paddingBottom: "1px",
    },
  },
  fields: {
    firstName: {
      selector: "#chargify1",
      label: "FIRST NAME",
      placeholder: "John",
      required: false,
      message: "First name is not valid. Please update it.",
      maxlength: "30",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
          placeholder: { color: "green" },
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    lastName: {
      selector: "#chargify1",
      label: "LAST NAME",
      placeholder: "Doe",
      required: false,
      message: "This field is not valid. Please update it.",
      maxlength: "30",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    number: {
      selector: "#chargify2",
      label: "Number",
      placeholder: "xxxx xxxx xxxx xxxx",
      message: "This field is not valid. Please update it.",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    month: {
      selector: "#chargify2",
      label: "Mon",
      placeholder: "mm",
      message: "This field is not valid. Please update it.",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    year: {
      selector: "#chargify2",
      label: "Year",
      placeholder: "yyyy",
      message: "This field is not valid. Please update it.",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    cvv: {
      selector: "#chargify2",
      label: "CVV code",
      placeholder: "123",
      required: false,
      message: "This field is not valid. Please update it.",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    address: {
      selector: "#chargify3",
      label: "Address",
      placeholder: "1234 Hill St",
      required: false,
      message: "This field is not valid. Please update it.",
      maxlength: "70",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    address2: {
      selector: "#chargify3",
      label: "Address 2",
      placeholder: "1234 Hill St",
      required: false,
      message: "This field is not valid. Please update it.",
      maxlength: "70",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    city: {
      selector: "#chargify3",
      label: "City",
      placeholder: "Austin",
      required: false,
      message: "This field is not valid. Please update it.",
      maxlength: "30",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    country: {
      selector: "#chargify3",
      label: "Country",
      placeholder: "Select...",
      required: false,
      message: "This field is not valid. Please update it.",
      maxlength: "2",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    state: {
      selector: "#chargify3",
      label: "State",
      placeholder: "Select...",
      required: false,
      message: "This field is not valid. Please update it.",
      maxlength: "2",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    zip: {
      selector: "#chargify3",
      label: "Zip Code",
      placeholder: "10001",
      required: false,
      message: "This field is not valid. Please update it.",
      maxlength: "5",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
  },
});
```

### Full Example with ACH

The following is a full example of using Chargify.js with ACH. ACH is only available for certain gateways. To learn more about ACH and Advanced Billing, please read [this help article](https://maxio.zendesk.com/hc/en-us/articles/24176182688141-eCheck-ACH-EFT).

```javascript
var chargify = new Chargify();

chargify.load({
  publicKey: "your-public-api-key",
  type: "bank",
  serverHost: "https://your-subdomain.chargify.com",
  hideCardImage: false,
  optionalLabel: "(optional field)",
  requiredLabel: "*",
  addressDropdowns: true,
  style: {
    "#chargify-form": { border: "1px dashed #ffc0cb57" },
    field: {
      backgroundColor: "orange",
      paddingTop: "10px",
      paddingBottom: "10px",
      borderRadius: "5px",
    },
    input: {
      backgroundColor: "#e6e6e6",
      paddingTop: "2px",
      paddingBottom: "1px",
      placeholder: { color: "#eee" },
    },
    label: {
      backgroundColor: "lightblue",
      paddingTop: "2px",
      paddingBottom: "1px",
    },
    message: {
      backgroundColor: "red",
      color: "white",
      paddingTop: "2px",
      paddingBottom: "1px",
    },
  },
  fields: {
    firstName: {
      selector: "#chargify1",
      label: "FIRST NAME",
      placeholder: "John",
      required: false,
      message: "First name is not valid. Please update it.",
      maxlength: "30",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
          placeholder: { color: "green" },
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    lastName: {
      selector: "#chargify1",
      label: "LAST NAME",
      placeholder: "Doe",
      required: false,
      message: "This field is not valid. Please update it.",
      maxlength: "30",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    bankName: {
      selector: "#chargify2",
      label: "Bank Name",
      placeholder: "My Bank",
      message: "This field is not valid. Please update it.",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    routingNumber: {
      selector: "#chargify2",
      label: "Routing",
      placeholder: "123412341234",
      message: "This field is not valid. Please update it.",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    accountNumber: {
      selector: "#chargify2",
      label: "Acct. Number",
      placeholder: "123412341234",
      message: "This field is not valid. Please update it.",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    accountType: {
      selector: "#chargify2",
      label: "Acct. Type",
      placeholder: "Select One...",
      required: true,
      message: "This field is not valid. Please update it.",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    accountHolderType: {
      selector: "#chargify2",
      label: "Acct. Holder",
      placeholder: "Select One...",
      required: true,
      message: "This field is not valid. Please update it.",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    address: {
      selector: "#chargify3",
      label: "Address",
      placeholder: "1234 Hill St",
      required: false,
      message: "This field is not valid. Please update it.",
      maxlength: "70",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    address2: {
      selector: "#chargify3",
      label: "Address 2",
      placeholder: "1234 Hill St",
      required: false,
      message: "This field is not valid. Please update it.",
      maxlength: "70",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    city: {
      selector: "#chargify3",
      label: "City",
      placeholder: "Austin",
      required: false,
      message: "This field is not valid. Please update it.",
      maxlength: "30",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    country: {
      selector: "#chargify3",
      label: "Country",
      placeholder: "Select...",
      required: false,
      message: "This field is not valid. Please update it.",
      maxlength: "2",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    state: {
      selector: "#chargify3",
      label: "State",
      placeholder: "Select...",
      required: false,
      message: "This field is not valid. Please update it.",
      maxlength: "2",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    zip: {
      selector: "#chargify3",
      label: "Zip Code",
      placeholder: "10001",
      required: false,
      message: "This field is not valid. Please update it.",
      maxlength: "5",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
  },
});
```

### Full Example with ACH and Maxio Payments gateway

If you want to use Chargify.js for tokenization of the bank accounts for ACH using the Maxio Payments gateway, you need to have Plaid support enabled (contact our support to do that).

```javascript
<script>
  var chargify = new Chargify();

  chargify.load({
      publicKey: 'chjs_your-public-api-key',
      type: 'direct_debit',
      serverHost: 'https://acme.chargify.com',
      hideCardImage: false,
      optionalLabel: '(optional field)',
      requiredLabel: '*',
      addressDropdowns: true,
      // selector for Plaid Link (Plaid Link will be shown inside of it)
      selectorForPlaidLink: '#plaid-link',
      // optional - name of the Plaid Link button (deafult: 'Use Plaid to connect my bank account')
      plaidLinkName: 'Use Plaid to connect my bank account',
      // optional - style of the Plaid Link button (default: there are no styles, just a link)
      plaidLinkStyle: {
        backgroundColor: '#000',
        color: '#fff',
        padding: '15px 25px',
        textDecoration: 'none',
        marging: '20 px'
      },
      style: {
          '#chargify-form': { border: '1px dashed #ffc0cb57' },
          field: {
              backgroundColor: 'orange',
              paddingTop: '10px',
              paddingBottom: '10px',
              borderRadius: '5px'
          },
          input: {
              backgroundColor: '#e6e6e6',
              paddingTop: '2px',
              paddingBottom: '1px',
              placeholder: { color: '#eee' }
          },
          label: {
              backgroundColor: 'lightblue',
              paddingTop: '2px',
              paddingBottom: '1px'
          },
          message: {
              backgroundColor: 'red',
              color: 'white',
              paddingTop: '2px',
              paddingBottom: '1px'
          }
      },
      fields: {
          firstName: {
              selector: '#chargify1',
              label: 'FIRST NAME',
              placeholder: 'John',
              required: false,
              message: 'First name is not valid. Please update it.',
              maxlength: '30',
              style: {
                  field: {
                      backgroundColor: '#ffdfdf',
                      padding: '3px',
                      borderRadius: '5px'
                  },
                  input: {
                      backgroundColor: '#fdfde1',
                      paddingTop: '2px',
                      paddingBottom: '1px',
                      placeholder: { color: 'green' }
                  },
                  label: {
                      paddingTop: '2px',
                      paddingBottom: '1px',
                      fontSize: '11px'
                  },
                  message: { paddingTop: '2px', paddingBottom: '1px' }
              }
          },
          lastName: {
              selector: '#chargify1',
              label: 'LAST NAME',
              placeholder: 'Doe',
              required: false,
              message: 'This field is not valid. Please update it.',
              maxlength: '30',
              style: {
                  field: {
                      backgroundColor: '#ffdfdf',
                      padding: '3px',
                      borderRadius: '5px'
                  },
                  input: {
                      backgroundColor: '#fdfde1',
                      paddingTop: '2px',
                      paddingBottom: '1px'
                  },
                  label: {
                      paddingTop: '2px',
                      paddingBottom: '1px',
                      fontSize: '11px'
                  },
                  message: { paddingTop: '2px', paddingBottom: '1px' }
              }
          },
          bankAccount: {
            selector: '#chargify2',
            required: true,
            placeholder: 'Connect your bank account using Plaid first',
            message: 'This field is not valid. Please update it.',
            style: {
                field: {
                    backgroundColor: '#ffdfdf',
                    padding: '3px',
                    borderRadius: '5px'
                },
                input: {
                    backgroundColor: '#fdfde1',
                    paddingTop: '2px',
                    paddingBottom: '1px'
                },
                label: {
                    paddingTop: '2px',
                    paddingBottom: '1px',
                    fontSize: '11px'
                },
                message: { paddingTop: '2px', paddingBottom: '1px' }
            }
          },
          accountHolderType: {
              selector: '#chargify2',
              label: 'Acct. Holder',
              placeholder: 'Select One...',
              required: true,
              message: 'This field is not valid. Please update it.',
              style: {
                  field: {
                      backgroundColor: '#ffdfdf',
                      padding: '3px',
                      borderRadius: '5px'
                  },
                  input: {
                      backgroundColor: '#fdfde1',
                      paddingTop: '2px',
                      paddingBottom: '1px'
                  },
                  label: {
                      paddingTop: '2px',
                      paddingBottom: '1px',
                      fontSize: '11px'
                  },
                  message: { paddingTop: '2px', paddingBottom: '1px' }
              }
          },
          address: {
              selector: '#chargify3',
              label: 'Address',
              placeholder: '1234 Hill St',
              required: false,
              message: 'This field is not valid. Please update it.',
              maxlength: '70',
              style: {
                  field: {
                      backgroundColor: '#ffdfdf',
                      padding: '3px',
                      borderRadius: '5px'
                  },
                  input: {
                      backgroundColor: '#fdfde1',
                      paddingTop: '2px',
                      paddingBottom: '1px'
                  },
                  label: {
                      paddingTop: '2px',
                      paddingBottom: '1px',
                      fontSize: '11px'
                  },
                  message: { paddingTop: '2px', paddingBottom: '1px' }
              }
          },
          address2: {
              selector: '#chargify3',
              label: 'Address 2',
              placeholder: '1234 Hill St',
              required: false,
              message: 'This field is not valid. Please update it.',
              maxlength: '70',
              style: {
                  field: {
                      backgroundColor: '#ffdfdf',
                      padding: '3px',
                      borderRadius: '5px'
                  },
                  input: {
                      backgroundColor: '#fdfde1',
                      paddingTop: '2px',
                      paddingBottom: '1px'
                  },
                  label: {
                      paddingTop: '2px',
                      paddingBottom: '1px',
                      fontSize: '11px'
                  },
                  message: { paddingTop: '2px', paddingBottom: '1px' }
              }
          },
          city: {
              selector: '#chargify3',
              label: 'City',
              placeholder: 'Austin',
              required: false,
              message: 'This field is not valid. Please update it.',
              maxlength: '30',
              style: {
                  field: {
                      backgroundColor: '#ffdfdf',
                      padding: '3px',
                      borderRadius: '5px'
                  },
                  input: {
                      backgroundColor: '#fdfde1',
                      paddingTop: '2px',
                      paddingBottom: '1px'
                  },
                  label: {
                      paddingTop: '2px',
                      paddingBottom: '1px',
                      fontSize: '11px'
                  },
                  message: { paddingTop: '2px', paddingBottom: '1px' }
              }
          },
          country: {
              selector: '#chargify3',
              label: 'Country',
              placeholder: 'Select...',
              required: false,
              message: 'This field is not valid. Please update it.',
              maxlength: '2',
              style: {
                  field: {
                      backgroundColor: '#ffdfdf',
                      padding: '3px',
                      borderRadius: '5px'
                  },
                  label: {
                      paddingTop: '2px',
                      paddingBottom: '1px',
                      fontSize: '11px'
                  },
                  message: { paddingTop: '2px', paddingBottom: '1px' }
              }
          },
          state: {
              selector: '#chargify3',
              label: 'State',
              placeholder: 'Select...',
              required: false,
              message: 'This field is not valid. Please update it.',
              maxlength: '2',
              style: {
                  field: {
                      backgroundColor: '#ffdfdf',
                      padding: '3px',
                      borderRadius: '5px'
                  },
                  label: {
                      paddingTop: '2px',
                      paddingBottom: '1px',
                      fontSize: '11px'
                  },
                  message: { paddingTop: '2px', paddingBottom: '1px' }
              }
          },
          zip: {
              selector: '#chargify3',
              label: 'Zip Code',
              placeholder: '10001',
              required: false,
              message: 'This field is not valid. Please update it.',
              maxlength: '5',
              style: {
                  field: {
                      backgroundColor: '#ffdfdf',
                      padding: '3px',
                      borderRadius: '5px'
                  },
                  input: {
                      backgroundColor: '#fdfde1',
                      paddingTop: '2px',
                      paddingBottom: '1px'
                  },
                  label: {
                      paddingTop: '2px',
                      paddingBottom: '1px',
                      fontSize: '11px'
                  },
                  message: { paddingTop: '2px', paddingBottom: '1px' }
              }
          }
      }
  });
</script>

```

### Full Example with Direct Debit (GoCardless gateway)

The following is a full example of using Chargify.js with GoCardless.

For more information on GoCardless, please see the following resources:

- [GoCardless help article](https://maxio.zendesk.com/hc/en-us/articles/24176159136909-GoCardless#gocardless-setup)
- Using GoCardless via API for [creating subscriptions]($e/Subscriptions/createSubscription) and/or [payment profiles]($e/Payment%20Profiles/createPaymentProfile)

```javascript
var chargify = new Chargify();

chargify.load({
  publicKey: "your-public-api-key",
  type: "direct_debit",
  selectorForGoCardlessHeader: "#gocardless-header",
  selectorForGoCardlessFooter: "#gocardless-footer",

  // selector for adding link to switch between IBAN and local bank details
  // (this link will be automatically added after account number
  // if selector is not present)
  //selectorForToggleIbanOrLocalDetails: '#gocardless-toggle-iban',

  // if you want to add your custom styles for GoCardless modal,
  // set this to true to skip automatic injection of CSS styles
  //customGoCardlessModalStyles: true,

  serverHost: "https://your-subdomain.chargify.com",
  hideCardImage: false,
  optionalLabel: "(optional field)",
  requiredLabel: "*",
  style: {
    "#chargify-form": { border: "1px dashed #ffc0cb57" },
    field: {
      backgroundColor: "orange",
      paddingTop: "10px",
      paddingBottom: "10px",
      borderRadius: "5px",
    },
    input: {
      backgroundColor: "#e6e6e6",
      paddingTop: "2px",
      paddingBottom: "1px",
      placeholder: { color: "#eee" },
    },
    label: {
      backgroundColor: "lightblue",
      paddingTop: "2px",
      paddingBottom: "1px",
    },
    message: {
      backgroundColor: "red",
      color: "white",
      paddingTop: "2px",
      paddingBottom: "1px",
    },
  },
  fields: {
    firstName: {
      selector: "#chargify1",
      label: "FIRST NAME",
      placeholder: "John",
      required: true,
      message: "First name is not valid. Please update it.",
      maxlength: "30",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
          placeholder: { color: "green" },
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    lastName: { selector: "#chargify2" },

    country: { selector: "#chargify3" },
    address: { selector: "#chargify4" },
    address2: { selector: "#chargify5" },
    city: { selector: "#chargify6" },
    state: { selector: "#chargify7" },
    zip: { selector: "#chargify8" },

    bankName: { selector: "#chargify9" },
    bankIban: { selector: "#chargify10" },
    branchCode: { selector: "#chargify11" },
    routingNumber: { selector: "#chargify12" },
    accountNumber: { selector: "#chargify13" },
    accountHolderType: { selector: "#chargify14" },
  },
});
```

### Full Example with SEPA Direct Debit (Stripe gateway)

The following example contains a minimalist approach to working with Chargify.js and Direct Debit through Stripe.

For more information on Stripe Direct Debit, please see the following resources:

- [Stripe Direct Debit help article](https://maxio.zendesk.com/hc/en-us/articles/24176170430093-Stripe-SEPA-and-BECS-Direct-Debit)
- Using Stripe Direct Debit via API for [creating subscriptions]($e/Subscriptions/createSubscription) and/or [payment profiles]($e/Payment%20Profiles/createPaymentProfile)

```javascript
var chargify = new Chargify();

chargify.load({
  publicKey: "your-public-api-key",
  type: "direct_debit",
  serverHost: "https://acme.chargify.com",
  optionalLabel: "(optional field)",
  requiredLabel: "*",
  style: {
    "#chargify-form": { border: "1px dashed #ffc0cb57" },
    field: {
      backgroundColor: "orange",
      paddingTop: "10px",
      paddingBottom: "10px",
      borderRadius: "5px",
    },
    input: {
      backgroundColor: "#e6e6e6",
      paddingTop: "2px",
      paddingBottom: "1px",
      placeholder: { color: "#eee" },
    },
    label: {
      backgroundColor: "lightblue",
      paddingTop: "2px",
      paddingBottom: "1px",
    },
    message: {
      backgroundColor: "red",
      color: "white",
      paddingTop: "2px",
      paddingBottom: "1px",
    },
  },
  fields: {
    firstName: {
      selector: "#chargify1",
      label: "FIRST NAME",
      placeholder: "John",
      required: true,
      message: "First name is not valid. Please update it.",
      maxlength: "30",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
          placeholder: { color: "green" },
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    lastName: { selector: "#chargify2" },

    country: { selector: "#chargify3" },
    address: { selector: "#chargify4" },
    address2: { selector: "#chargify5" },
    city: { selector: "#chargify6" },
    state: { selector: "#chargify7" },
    zip: { selector: "#chargify8" },

    bankName: { selector: "#chargify9" },
    bankIban: { selector: "#chargify10" },
    accountHolderType: { selector: "#chargify14" },
  },
});
```

### Full Example with BECS Direct Debit (Stripe gateway)

The following example contains a minimalist approach to working with Chargify.js and BECS Direct Debit through Stripe.

For more information on Stripe Direct Debit, please see the following resources:

- [Stripe Direct Debit help article](https://maxio.zendesk.com/hc/en-us/articles/24176170430093-Stripe-SEPA-and-BECS-Direct-Debit)
- Using Stripe BECS Direct Debit via API for [creating subscriptions]($e/Subscriptions/createSubscription) and/or [payment profiles]($e/Payment%20Profiles/createPaymentProfile)

```javascript
var chargify = new Chargify();

chargify.load({
  publicKey: "your-public-api-key",
  type: "direct_debit",
  serverHost: "https://acme.chargify.com",
  optionalLabel: "(optional field)",
  requiredLabel: "*",
  style: {
    "#chargify-form": { border: "1px dashed #ffc0cb57" },
    field: {
      backgroundColor: "orange",
      paddingTop: "10px",
      paddingBottom: "10px",
      borderRadius: "5px",
    },
    input: {
      backgroundColor: "#e6e6e6",
      paddingTop: "2px",
      paddingBottom: "1px",
      placeholder: { color: "#eee" },
    },
    label: {
      backgroundColor: "lightblue",
      paddingTop: "2px",
      paddingBottom: "1px",
    },
    message: {
      backgroundColor: "red",
      color: "white",
      paddingTop: "2px",
      paddingBottom: "1px",
    },
  },
  fields: {
    firstName: {
      selector: "#chargify1",
      label: "FIRST NAME",
      placeholder: "John",
      required: true,
      message: "First name is not valid. Please update it.",
      maxlength: "30",
      style: {
        field: {
          backgroundColor: "#ffdfdf",
          padding: "3px",
          borderRadius: "5px",
        },
        input: {
          backgroundColor: "#fdfde1",
          paddingTop: "2px",
          paddingBottom: "1px",
          placeholder: { color: "green" },
        },
        label: {
          paddingTop: "2px",
          paddingBottom: "1px",
          fontSize: "11px",
        },
        message: { paddingTop: "2px", paddingBottom: "1px" },
      },
    },
    lastName: { selector: "#chargify2" },

    country: { selector: "#chargify3" },
    address: { selector: "#chargify4" },
    address2: { selector: "#chargify5" },
    city: { selector: "#chargify6" },
    state: { selector: "#chargify7" },
    zip: { selector: "#chargify8" },

    bankName: { selector: "#chargify9" },
    branchCode: { selector: "#chargify10" },
    accountNumber: { selector: "#chargify10" },
    accountHolderType: { selector: "#chargify14" },
  },
});
```

### Full Example with Apple Pay

The following is a full example of using Chargify.js with Apple Pay.

For more information on Apple Pay via Braintree, please see the following resources
[Apple Pay via Braintree overview](https://developer.paypal.com/braintree/docs/guides/apple-pay/overview)

```javascript
chargify.load(
  {
    publicKey: "your-public-api-key",
    type: "apple_pay",
    applePayLabel: "Example product",
    applePayAmount: "10", // the amount should be formatted with period ".", for example "10.5"
    selectorForApplePayButton: "#apple-pay",
    serverHost: "hhttps://your-subdomain.chargify.com",
    fields: {
      firstName: {
        selector: "#chargify-form",
        required: true,
      },
      lastName: {
        selector: "#chargify-form",
        required: true,
      },
      address: {
        selector: "#chargify-billing",
      },
      address2: {
        selector: "#chargify-billing",
      },
      city: {
        selector: "#chargify-billing",
      },
      state: {
        selector: "#chargify-billing",
      },
      zip: {
        selector: "#chargify-billing",
      },
      country: {
        selector: "#chargify-billing",
      },
    },
  },
  {
    // this function is called after Apple Pay authorization passes (i.e. user has authorized payment via fingerprint)
    onApplePayAuthorized: function () {
      chargify.token(
        document.querySelector(".host-form"),

        function success(token, message) {
          console.log("{host} token SUCCESS - token: ", token);
        },

        function error(err) {
          console.log("{host} token ERROR - err: ", err);
        },
      );
    },
    onApplePayNotSupported: function () {
      alert(
        "Your browser or device does not support Apple Pay on the web. Open this page in Safari on a compatible device.",
      );
    },
    onApplePayError: function (err) {
      alert(err);
    },
  },
);
```

### Full Example with PayPal

The following is a full example of using Chargify.js with PayPal.

```javascript
chargify.load(
  {
    publicKey: "your-public-api-key",
    type: "pay_pal",
    selectorForPayPalButton: "#pay-pal",
    serverHost: "hhttps://your-subdomain.chargify.com",
    fields: {
      firstName: {
        selector: "#chargify-form",
        required: true,
      },
      lastName: {
        selector: "#chargify-form",
        required: true,
      },
      address: {
        selector: "#chargify-billing",
      },
      address2: {
        selector: "#chargify-billing",
      },
      city: {
        selector: "#chargify-billing",
      },
      state: {
        selector: "#chargify-billing",
      },
      zip: {
        selector: "#chargify-billing",
      },
      country: {
        selector: "#chargify-billing",
      },
    },
  },
  {
    // this function is called after PayPal authorization passes (i.e. user has completed PayPal flow)
    onPayPalAuthorized: function () {
      chargify.token(
        document.querySelector(".host-form"),

        function success(token, message) {
          console.log("{host} token SUCCESS - token: ", token);
        },

        function error(err) {
          console.log("{host} token ERROR - err: ", err);
        },
      );
    },
    onPayPalError: function (err) {
      alert(err);
    },
  },
);
```
