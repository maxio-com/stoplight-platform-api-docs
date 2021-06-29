---
tags: [Chargify.js]
---

# Chargify.js Configurations

This article goes over the ways that the Chargify.js iframes can be configured, including basic setup, including fields as separate iframes, and passing different payment method types.

## Basic Configuration

Call `chargify.load` anywhere on your page. It's that simple!

```javascript
chargify.load({
    selector: '#chargify-form',
    publicKey: 'your-public-api-key',
    type: 'card',
    serverHost: 'https://acme.chargify.com'
});
```

You can find your public API key in the **Config --> Integrations** section on your site's page in Chargify.

`chargify.load` accepts also optional parameters. Here is a more complete example:

```javascript
chargify.load({
    // selector, where the iframe will be included on your page
    // optional, if you have a `selector` for every field ('fields' option)
    selector: '#chargify-form',

    // (i.e. '1a2cdsdn3lkn54lnlkn')
    publicKey: 'your-public-api-key',

    // form type
    type: 'card',

    // points to your Chargify site
    serverHost: 'https://acme.chargify.com',

    // flag to show/hide the credit card image
    // true: hides the credit card image
    hideCardImage: false,

    // optional label/translation (i.e. '(optional field)') for optional fields
    // Especially useful if you use 'fields'
    optionalLabel: '(optional field)',

    // required label/translation (i.e. '*') for required fields
    // Especially useful if you use 'fields'
    requiredLabel: '*',

    // Use auto-populated dropdowns instead of plain text fields
    addressDropdowns: true,

    // optional unless your site uses multi-currency with BlueSnap gateway
    currency: 'USD,

    // optional global styles that include iframe styles,
    // styles for fields, inputs, labels and messages
    style: {
        // to style an iframe, use the iframe's container selector
        '#chargify-form': { border: '1px dashed #ffc0cb57' },

        // `field` is the container for each field
        field: {
            backgroundColor: 'orange',
            paddingTop: '10px',
            paddingBottom: '10px',
            borderRadius: '5px'
        },

        // `input` is the input HTML element
        input: {
            backgroundColor: '#e6e6e6',
            paddingTop: '2px',
            paddingBottom: '1px',
            placeholder: { color: '#eee' }
        },

        // `label` is the label container
        label: {
            backgroundColor: 'lightblue',
            paddingTop: '2px',
            paddingBottom: '1px'
        },

        // `message` is the invalid message container
        message: {
            backgroundColor: 'red',
            color: 'white',
            paddingTop: '2px',
            paddingBottom: '1px'
        }
    },

    // use this option if you want to include each field
    // in a separate iframe
    fields: {}
});
```

## Selectors

Selectors control where the iframe will appear on the page. By choosing a single selector in the `chargify.load` function, all payment profile information--first and last name, credit card numbers, billing address, etc.--will appear within a single iframe.

```html
<!DOCTYPE html>
<html>
    <head>
        <script src="https://js.chargify.com/latest/chargify.js"></script>
    </head>

    <body>
        <form id='chargify-form'>
            <div id="chargify1"></div>

            <!-- While testing, you can remove the "hidden" type to expose the token for easy viewing. -->
            <input id="chargify-token" type="hidden" />

            <button type="submit">Submit Form</button>
        </form>
    </body>

    <script>
        var chargify = new Chargify();

        chargify.load({
            // selector, where the iframe will be included on your page
            // optional, if you have a `selector` for every field ('fields' option)
            selector: '#chargify1',

            // (i.e. '1a2cdsdn3lkn54lnlkn')
            publicKey: 'your-public-api-key',

            // payment profile type you will accept
            type: 'card',

            // points to your Chargify site
            serverHost: 'https://acme.chargify.com'
        });
    </script>
</html>
```

In the example above, a single iframe will appear on the Chargify.js form with the ID `chargify1`. The selector can have any name.

The following section details an alternative way to display iframes.

## Working with Fields

If you want to display each field in a separate iframe, or to group a collection of attributes by iframe, all you have to do is define a `fields` option and include its selector ID on your frontend form. When choosing this path, be sure to specify all required fields via the `fields` option or the payment profile will fail to be created.

```javascript
  // ...

  fields: {
      // ...

      firstName: {
          // selector where the iframe with this field will be included on your page
          selector: '#chargify4',

          // overrides default label
          label: 'FIRST NAME',

          // overrides default placeholder
          placeholder: 'John',

          // if a given field is optional by default, you can make it required
          required: true,

          // overrides default error message
          message: 'First name is not valid. Please update it.',

          // overrides or defines max length
          maxlength: '30',

          // it overrides global styles for this field only
          style: {
              field: {
                  backgroundColor: '#f0dfdf',
                  padding: '3px',
                  borderRadius: '5px'
              },
              input: {
                  backgroundColor: '#f0fde1',
                  paddingTop: '2px',
                  paddingBottom: '1px',
                  placeholder: { color: '#eee' }
              },
              label: { paddingTop: '2px', paddingBottom: '1px', fontSize: '11px' },
              message: { paddingTop: '2px', paddingBottom: '1px' }
          }
      }
  }
```

## 3D Secure Configuration

If your business is subject to the PSD2 requirements in Europe and you are using Chargify.js as part of your signup flow, changes may be required on your form. Post authentication gateways (e.g. Stripe) require no additional configuration on the Chargify.js form.

For all other supported gateways (Cybersource, Windcave, Braintree, Adyen), add the field `threeDSecure: true` to your Chargify load function. Please review our testing 3DS documentation for an overview of how the workflow will look for your gateway.

You can pass a callback function to the load function to be callled when Chargify.js encounters an error when loading a 3DS configuration.

```javscript
chargify.load(configObject, {
    onThreeDsConfigError: function(error) {
        console.error(error);
    },
}
```

If Chargify.js cannot get a 3D Secure config, or if Strong Customer Authentication is not enabled in your site gateway configuration, then we will fall back to the default credit card flow.

## GoCardless Configuration

❗️ This configuration has been deprecated in favor of [Direct Debit Configuration](#direct-debit-configuration)

```javascript
chargify.load({
    // selector, where the iframe will be included on your page
    // optional if you have a `selector` on each and every field
    selector: '#chargify-form',

    // (i.e. '1a2cdsdn3lkn54lnlkn')
    publicKey: 'your-public-api-key',

    // form type
    type: 'direct_debit',

    // selector for GoCardless header
    // that should make the page identifiable to customers
    selectorForGoCardlessHeader: '#gocardless-header',

    // selector for GoCardless footer that should make customers aware
    // that payments are powered by GoCardless
    selectorForGoCardlessFooter: '#gocardless-footer',

    // selector for adding link to switch between IBAN and local bank details
    // (this link will be automatically added after account number
    // if selector is not present)
    //selectorForToggleIbanOrLocalDetails: '#gocardless-toggle-iban',

    // if you want to add your custom styles for GoCardless modal,
    // set this to true to skip automatic injection of CSS styles
    //customGoCardlessModalStyles: true,

    // points to your Chargify site
    serverHost: 'https://acme.chargify.com',
});
```

## Direct Debit Configuration

* when you use GoCardless as the gateway

```javascript
chargify.load({
    // selector, where the iframe will be included on your page
    // optional if you have a `selector` on each and every field
    selector: '#chargify-form',

    // (i.e. '1a2cdsdn3lkn54lnlkn')
    publicKey: 'your-public-api-key',

    // form type
    type: 'direct_debit',

    // selector for GoCardless header
    // that should make the page identifiable to customers
    selectorForGoCardlessHeader: '#gocardless-header',

    // selector for GoCardless footer that should make customers aware
    // that payments are powered by GoCardless
    selectorForGoCardlessFooter: '#gocardless-footer',

    // selector for adding link to switch between IBAN and local bank details
    // (this link will be automatically added after account number
    // if selector is not present)
    //selectorForToggleIbanOrLocalDetails: '#gocardless-toggle-iban',

    // if you want to add your custom styles for GoCardless modal,
    // set this to true to skip automatic injection of CSS styles
    //customGoCardlessModalStyles: true,

    // points to your Chargify site
    serverHost: 'https://acme.chargify.com',
});
```

* when you use Stripe as the gateway

```javascript
chargify.load({
    // selector, where the iframe will be included on your page
    // optional if you have a `selector` on each and every field
    selector: '#chargify-form',

    // (i.e. '1a2cdsdn3lkn54lnlkn')
    publicKey: 'your-public-api-key',

    // form type
    type: 'direct_debit',

    // points to your Chargify site
    serverHost: 'https://acme.chargify.com',
});
```

## Braintree Advanced Fraud Protection Configuration

In order to use Braintree Advanced Fraud Protection, you need to first set it up in Chargify.
See [Chargify Help Docs](https://help.chargify.com/payment-gateways/gateway-options.html#braintree-advanced-fraud-protection) for details.
Once set up in Chargify, you simply need to use the `deviceData` option in Chargify.js:

```javascript
chargify.load({
    // selector, where the iframe will be included on your page
    // optional if you have a `selector` on each and every field
    selector: '#chargify-form',

    // (i.e. '1a2cdsdn3lkn54lnlkn')
    publicKey: 'your-public-api-key',

    // form type
    type: 'card',

    // points to your Chargify site
    serverHost: 'https://acme.chargify.com',

    deviceData: true,
});
```

Advanced Fraud Protection can be used with all payment methods supported by Braintree:

* Credit Cards
* Credit Cards with 3D Secure
* PayPal
* Apple Pay

## Apple Pay Configuration

Apple Pay needs a few things in order to work:

* You must have enabled Apple Pay option in Braintree
* Compatible device with Safari browser
* The page needs to be served through SSL
* The subdomain where you use Chargify.js needs to be added in Braintree Panel

```javascript
chargify.load({
    // selector, where the iframe will be included on your page
    // optional if you have a `selector` on each and every field
    selector: '#chargify-form',

    // (i.e. '1a2cdsdn3lkn54lnlkn')
    publicKey: 'your-public-api-key',

    // form type
    type: 'apple_pay',

    // This will be presented in the Apple Pay modal window
    applePayLabel: 'Example product',
    applePayAmount: '10', // the amount should be formatted with period, for example "10.5"

    // selector for Apple Pay button (Apple Pay button will be shown inside of it)
    selectorForApplePayButton: '#apple-pay',

    // points to your Chargify site
    serverHost: 'https://acme.chargify.com',
});
```

You can pass a second object with callbacks to the load function for Apple Pay.

```javascript
chargify.load(configObject, {
    onApplePayAuthorized: function() {
        // this function is called after apple pay authorization passes (user has authorized payment via fingerprint)
    },
    onApplePayNotSupported: function() {
        // this function is called when apple pay is not supported by user's device
    },
    onApplePayError: function(err) {
        // this function is called on internal error related to apple pay
    }
}
```

## PayPal Configuration

```javascript
chargify.load({
    // selector, where the iframe will be included on your page
    // optional if you have a `selector` on each and every field
    selector: '#chargify-form',

    // (i.e. '1a2cdsdn3lkn54lnlkn')
    publicKey: 'your-public-api-key',

    // form type
    type: 'pay_pal',

    // selector for PayPal button (PayPal button will be shown inside of it)
    selectorForPayPalButton: '#pay-pal',

    // points to your Chargify site
    serverHost: 'https://acme.chargify.com',
});
```

You can pass a second object with callbacks to the load function for PayPal.

```javascript
chargify.load(configObject, {
    onPayPalAuthorized: function() {
        // this function is called after PayPal authorization passes (user has completed PayPal flow)
    },
    onPayPalError: function(err) {
        // this function is called on internal error related to PayPal
    }

}
```

## Other callbacks

Besides callbacks described above and related to given features or gateways, chargify.js makes available `onCardTypeDetected` callback.

```javascript
chargify.load(configObject, {
    onCardTypeDetected: function(type) {
        // this function is called when a card type provided by a customer is detected
    }
}
```

Returned card types: `american-express`, `diners`, `diners-club`, `discover`, `jcb`, `maestro`, `mastercard`, `visa`.

## Chargify.js Dictionary

### Global Fields

| Field name | Example | Required? | Description |
| ---------- | ------  | -------- | ----------- |
| selector  | `#chargify-form` | Optional | Pulls in an iframe to the page. Can be defined on the overall form or within each field. |
| publicKey | `chjs_g3ifjs...`  | Required | Authenticates your Chargify.js form to a specific Chargify site. |
| type      | `card`   | Required | The type of payment profile the form will accept. Can be `card`, `bank`, `apple_pay`, `pay_pal` or `gocardless`. |
| serverHost | `https://acme.chargify.com` | Required | The full URL of your Chargify site. |
| gatewayHandle | `stripe` | Optional | If Multi-Gateway is enabled, the particular gateway to send payment profiles to. |
| hideCardImage | `true`  | Optional | Choose whether to display the image of a credit card. |
| optionalLabel | `(optional)` | Optional | A label that will appear to denote when some fields are optional. Useful for translations. |
| requiredLabel | `*` | Optional | A label that denotes the fields that are required. |
| selectorForGoCardlessHeader | `#gocardless-header` | Required for GoCardless | Add a GoCardless header to the page. |
| selectorForGoCardlessFooter | `gocardless-footer` | Required for GoCardless | Add a GoCardless that indicates payments are powered by GoCardless. |
| selectorForToggleIbanOrLocalDetails | `#gocardless-toggle-iban` | Optional for GoCardless | Adds a link to switch between entering an IBAN or local bank details. If not present, this link is automatically added after the account number field. |
| customGoCardlessModalStyles | `true` | Optional for GoCardless | When true, it will allow you to add custom styling for the GoCardless modal. Otherwise, GoCardless's CSS will automatically be shown. |
| applePayLabel | `Gold Product` | Required for Apple Pay | Change the label of the purchase within the Apple Pay modal.
| applePayAmount | `10.5` | Required for Apple Pay | Specify the amount for purchase. |
| selectorForApplePayButton | `#apple-pay` | Required for Apple Pay | The selector for the Apple Pay button. |
| selectorForPayPalButton | `#pay-pal` | Required for PayPal | The selector for the PayPal button. |
| deviceData | `true` | Required to use Braintree Advanced Fraud Protection feature | Enables collecting Device Data information as part of the Braintree Advanced Fraud Protection feature. |
| addressDropdowns | `true` | Optional, not supported for GoCardless | Renders country and state fields as dropdowns instead of plain text fields. |
| currency | `USD` | Optional | Choose which currency do you want to use. You should set this when your site uses multi-currency and BlueSnap as the gateway or when you site uses mutli-currency and you use Stripe gateway for Direct Debit. |


The fields below are more suited for styling specific fields, but CSS can be specified globally for them:

| Field name | Example | Required? | Description |
| ---------- | ------  | -------- | ----------- |
| label  | `First Name` | Optional | The label above the iframe. |
| placeHolder | `Jane` | Optional | The default text that appears in the input. |
| required | `true` | Optional | Indicate whether the field should be required for the form to submit. |
| message | `This field is not valid. Please update it` | Optional | The text that appears on an invalid submission.
| maxLength | `30` | Optional | The max number of characters allowed for the field. |

### Styles

Note that styles can be set globally across the whole form, or set individually on particular fields. They are all optional.

Objects that can be styled:

| Field name | Description |
| ---------- | ------  | -------- | ----------- |
| field  | This will apply to the container of the field. |
| input | The text that appears in the iframe. |
| label | The label for the iframe. |
| message | The text that appears on an invalid submission. |

Available styles:

| Field name | Example | Description |
| ---------- | ------  | -------- | ----------- |
| backgroundColor  | `orange` | Changes the background color. |
| paddingTop  | `10px` | Adds some space at the top. |
| paddingBottom | `10px` | Adds some space at the bottom. |
| borderRadius | `5px` | Defines the radius of the element's corners. |
| color | `blue` | Change the color of the text in the input. |
| border | `1px dashed #ffc0cb57` | Creates a border around the iframe. |
| fontSize | `11px` | The size of the font in the input. |

### Credit Card Fields

| Field name | Example | Required? | Description |
| ---------- | ------  | -------- | ----------- |
| firstName  | `Joe` | Optional | Cardholder first name |
| lastName   | `Doe` | Optional | Cardholder last name |
| number     | `4242 4242 4242 4242` | Required | Credit card number |
| month      | `08` | Required | Card expiration month |
| year       | `2022` | Required | Card expiration year |
| cvv        | `123` | Optional (may be required by your gateway settings) | The 3- or 4-digit Card Verification Value. This value is merely passed through to the payment gateway |
| address    | `123 Main St.` | Optional (may be required by your gateway settings) | The credit card or bank account billing street address. This value is merely passed through to the payment gateway |
| address2   | `i.e. Apt. 100` | Optional | Second line of the customer’s billing address |
| city       | `Boston` | Optional (may be required by your gateway settings) | The credit card billing address city. This value is merely passed through to the payment gateway |
| state      | `MA` | Optional (may be required by your gateway settings) | The credit card billing address state, preferably in 2-letter format. This value is merely passed through to the payment gateway |
| zip        | `12345` | Optional (may be required by your gateway settings) | The credit card billing address zip code. This value is merely passed through to the payment gateway |
| country    | `US` | Optional (may be required by your gateway settings) | The credit card billing address country, preferably in ISO 3166-1 alpha-2 format. This value is merely passed through to the payment gateway. Some gateways require country codes in a specific format. Please check your gateway’s documentation |

### ACH Fields

| Field name        | Example | Required | Description |
| ----------------- | ------- | -------- | ----------- |
| firstName         | `Joe` | Optional | First name on bank account |
| lastName          | `Doe` | Optional | Last name on card or bank account |
| bankName          | `Test Bank` | Required | The name of the bank where the customer’s account resides |
| routingNumber     | `110000000` | Required | The routing number of the bank |
| accountNumber     | `000123456789` | Required | The customer’s bank account number |
| accountType       | `checking` | -------- | this defaults to `checking` and cannot be changed |
| accountHolderType | `personal` | Required | may be `personal` (default) or `business` |
| address           | `123 Main St.` | Optional may be required by your product configuration or gateway settings | The bank account billing street address (i.e. 123 Main St.). This value is merely passed through to the payment gateway |
| address2          | `Apt. 100` | Optional | Second line of the customer’s billing address |
| city              | `Boston` | Optional (may be required by your product configuration or gateway settings) | The bank account billing address city. This value is merely passed through to the payment gateway |
| state             | `MA` | Optional (may be required by your gateway settings) | The bank account billing address state, preferably in 2-letter format. This value is merely passed through to the payment gateway |
| zip               | `12345` | Optional (may be required by your gateway settings) | The bank account billing address zip code. This value is merely passed through to the payment gateway |
| country           | `US` | Optional (may be required by your gateway settings) | The bank account billing address country, preferably in ISO 3166-1 alpha-2 format. This value is merely passed through to the payment gateway. Some gateways require country codes in a specific format. Please check your gateway’s documentation |

### Direct Debit Fields (when you use GoCardless gateway for Direct Debit)

| Field name        | Example | Required | Description |
| ----------------- | ------- | -------- | ----------- |
| firstName         | `Joe` | Required | First name on bank account |
| lastName          | `Doe` | Required | Last name on bank account |
| email | `joe@chargify.test` | Required for Becs NZ scheme only | The customer's email |
| phone | `+640800000000` | Required for Becs NZ scheme only | The customer's phone number |
| bankName          | `Test Bank` | Required | The name of the bank where the customer’s account resides |
| bankIban          | `FR1420041010050500013M02606` | Required | The customer’s International Bank Account Number (IBAN). It needs to be passed if local bank details are empty |
| routingNumber     | `19043` | Required | Bank code. Alternatively you can provide an iban. |
| branchCode        | `200000` | Required | Branch code. Alternatively you can provide an iban. |
| accountNumber     | `55779911` | Required | The customer’s bank account number. Alternatively you can provide an IBAN. |
| accountHolderType | `personal` | Required | may be `personal` (default) or `business` |
| address           | `123 Main St.` | Required | The bank account billing street address (i.e. 123 Main St.). This value is merely passed through to the payment gateway |
| address2          | `Apt. 100` | Optional | Second line of the customer’s billing address |
| city              | `London` | Required | The bank account billing address city. |
| state             | `LND` | Required | The bank account billing address state, in 2 or 3-letter format. |
| zip               | `E1W 3SS` | Required | The bank account billing address zip code. |
| country           | `GB` | Required | The bank account billing address country, in ISO 3166-1 alpha-2 format. |
| swedishIdentityNumber | `198112289874` | Required for Autogiro scheme only | The Swedish civic/identity number |
| danishIdentityNumber | `0101701234` | Required for Betalingsservice scheme only | The Danish civic/identity number |

### Direct Debit Fields (when you use Stripe gateway for SEPA Direct Debit)

| Field name        | Example | Required | Description |
| ----------------- | ------- | -------- | ----------- |
| firstName         | `Joe` | Required | First name on bank account |
| lastName          | `Doe` | Required | Last name on bank account |
| email | `joe@chargify.test` | Required for Becs NZ scheme only | The customer's email |
| bankName          | `Test Bank` | Required | The name of the bank where the customer’s account resides |
| bankIban          | `FR1420041010050500013M02606` | Required | The customer’s International Bank Account Number (IBAN).  |
| accountHolderType | `personal` | Required | may be `personal` (default) or `business` |
| address           | `123 Main St.` | Required | The bank account billing street address (i.e. 123 Main St.). This value is merely passed through to the payment gateway |
| address2          | `Apt. 100` | Optional | Second line of the customer’s billing address |
| city              | `Berlin` | Required | The bank account billing address city. |
| state             | `BE` | Required | The bank account billing address state, in 2 or 3-letter format. |
| zip               | `12345` | Required | The bank account billing address zip code. |
| country           | `DE` | Required | The bank account billing address country, in ISO 3166-1 alpha-2 format. |

### Direct Debit Fields (when you use Stripe gateway for BECS Direct Debit)

| Field name        | Example | Required | Description |
| ----------------- | ------- | -------- | ----------- |
| firstName         | `Joe` | Required | First name on bank account |
| lastName          | `Doe` | Required | Last name on bank account |
| email | `joe@chargify.test` | Required for Becs NZ scheme only | The customer's email |
| bankName          | `Test Bank` | Required | The name of the bank where the customer’s account resides |
| branchCode          | `000000` | Required | BSB |
| accountNumber          | `000123456` | Required | Account Number |
| accountHolderType | `personal` | Required | may be `personal` (default) or `business` |
| address           | `123 Main St.` | Required | The bank account billing street address (i.e. 123 Main St.). This value is merely passed through to the payment gateway |
| address2          | `Apt. 100` | Optional | Second line of the customer’s billing address |
| city              | `Stony Rise` | Required | The bank account billing address city. |
| state             | `TAS` | Required | The bank account billing address state, in 2 or 3-letter format. |
| zip               | `12345` | Required | The bank account billing address zip code. |
| country           | `AU` | Required | The bank account billing address country, in ISO 3166-1 alpha-2 format. |

### Apple Pay Fields

| Field name | Example | Required | Description |
| ---------- | ------  | -------- | ----------- |
| firstName  | `Joe` | Optional | Cardholder first name |
| lastName   | `Doe` | Optional | Cardholder last name |
| address    | `123 Main St.` | Optional (may be required by your gateway settings) | The credit card or bank account billing street address. This value is merely passed through to the payment gateway |
| address2   | `i.e. Apt. 100` | Optional | Second line of the customer’s billing address |
| city       | `Boston` | Optional (may be required by your gateway settings) | The credit card billing address city. This value is merely passed through to the payment gateway |
| state      | `MA` | Optional (may be required by your gateway settings) | The credit card billing address state, preferably in 2-letter format. This value is merely passed through to the payment gateway |
| zip        | `12345` | Optional (may be required by your gateway settings) | The credit card billing address zip code. This value is merely passed through to the payment gateway |
| country    | `US` | Optional (may be required by your gateway settings) | The credit card billing address country, preferably in ISO 3166-1 alpha-2 format. This value is merely passed through to the payment gateway. Some gateways require country codes in a specific format. Please check your gateway’s documentation |

### PayPal Fields

| Field name | Example | Required | Description |
| ---------- | ------  | -------- | ----------- |
| firstName  | `Joe` | Optional | Cardholder first name |
| lastName   | `Doe` | Optional | Cardholder last name |
| address    | `123 Main St.` | Optional (may be required by your gateway settings) | The credit card or bank account billing street address. This value is merely passed through to the payment gateway |
| address2   | `i.e. Apt. 100` | Optional | Second line of the customer’s billing address |
| city       | `Boston` | Optional (may be required by your gateway settings) | The credit card billing address city. This value is merely passed through to the payment gateway |
| state      | `MA` | Optional (may be required by your gateway settings) | The credit card billing address state, preferably in 2-letter format. This value is merely passed through to the payment gateway |
| zip        | `12345` | Optional (may be required by your gateway settings) | The credit card billing address zip code. This value is merely passed through to the payment gateway |
| country    | `US` | Optional (may be required by your gateway settings) | The credit card billing address country, preferably in ISO 3166-1 alpha-2 format. This value is merely passed through to the payment gateway. Some gateways require country codes in a specific format. Please check your gateway’s documentation |

