---
tags: [Chargify.js]
---

# Version History

The latest version of `chargify.js` is available at the following url:

```html
<script src="https://js.chargify.com/latest/chargify.js"></script>
```

We occasionally make updates to improve the functionality of Chargify.js in
accordance with our [backwards compatibility policy.](https://chargify.stoplight.io/docs/api-documentation/docs/basics/Overview.md#backwards-compatibility)

With every release of Chargify.js, we also publish a static version.
If needed, you can point to a specific version using a release date as shown below in the release history.
In this way you can control when the Chargify.js updates occur and test them with your
integration, or implement a Content Security Policy (CSP).  Example:

```html
<script src="https://js.chargify.com/v/2021-01-29a/chargify.js"></script>
```

<div class="alert alert-warning">
We will support previous releases of Chargify.js for a maximum time frame of 6 months.  If
you use an explicitly versioned path of Chargify.js, you must commit to updating your
integration regularly.  Versions older than 6 months will be unsupported and may be removed without notice.
</div>

## Release History
* **2021-06-17** **latest**
  * [internal] Move more logic into main iframe
* **2021-05-27**
  * [feature] Add live validation and input formatting for the credit card number
* **2021-05-20**
  * [internal] Add support for Device Data for Public Invoices
* **2021-05-05**
  * [feature] Add support for BECS Direct Debit with Stripe
* **2021-04-28**
  * [feature] Add support for setting currency in the options
* **2021-03-30**
  * [bugfix] Stop caching token callbacks
* **2021-03-25**
  * [bugfix] Fix problem with validations when using dropdowns
* **2021-03-24**
  * [bugfix] Retain styles added to dropdowns
* **2021-03-23**
  * [internal] Add support for main iframe
* **2021-03-22**
  * [feature] Add BlueSnap 3D Secure support
* **2021-03-17**
  * [bugfix] Trigger onError callback for form validation errors
* **2021-03-10**
  * [feature] Add support for SEPA Direct Debit with Stripe
* **2021-01-29a**
  * [bugfix] Fix country/state fields validation
* **2021-01-29**
  * [feature] Implement country/state dropdowns
* **2021-01-14b**
  * [hotfix] Fix counting the fields for inline class
* **2021-01-14a**
  * [feature] Add onCardTypeDetected callback
* **2021-01-14**
  * [feature] Braintree Advanced Fraud Protection - Device Data
* **2021-01-13**
  * [enhancement] Update braintree js sdk version
* **2020-12-18**
  * [bugfix] Fix for using custom fields with PayPal and ApplePay
* **2020-12-07a**
  * [hotfix] Revert Braintree Advanced Fraud Protection - Device Data
    (fixes issue with 2020-12-07)
* **2020-12-07**
  * [feature] Braintree Advanced Fraud Protection - Device Data
* **2020-12-03**
  * [internal] disable global exception handling for HB
* **2020-10-14a**
  * [bugfix] Fix iframes interfering with browser history
* **2020-10-14**
  * [feature] Add PayPal support
* **2020-06-09**
  * [bugfix] Fix Firefox iframe appearance
* **2020-05-18**
  * [feature] Migrate CyberSource to Hybrid
* **2020-05-14**
  * [feature] Add Adyen 3D Secure support
* **2020-04-24**
  * [bugfix] Validate state code against country for CyberSource 3D Secure
* **2020-04-08**
  * [bugfix] Improve challenge modal cancelling and error handling for CyberSource 3D Secure
* **2020-03-23**
  * [bugfix] Support for Chrome extensions such as metamask
* **2020-03-02**
  * [feature] Add Apple Pay support
* **2020-02-06**
  * [enhancement] Pass gateway handle if available when fetching 3D Secure configuration
* **2019-12-16**
  * [feature] Add Quickpay 3D Secure support
* **2019-12-11**
  * [feature] Support for the _MultiGateway_ feature (currently in _Beta_)
* **2019-09-24**
  * [feature] Fall back to standard flow when Strong Customer Authentication (SCA) is not enabled in Site Gateway settings
* **2019-09-23**
  * [feature] Add support for merchant-provided 3DS verification amount (Braintree)
  * [feature] Use pre-filled customer address fields for 3DS verification
* **2019-09-12**
  * [feature] Improve error message reporting for Braintree 3DS
* **2019-09-10**
  * [feature] Support for 3D Secure for Braintree
* **2019-08-29a**
  * [feature] Support for 3D Secure for CyberSource
* **2019-07-08a**
  * [feature] Form autocomplete is supported by default
* **2019-03-06**
  * [feature] Support for BECS NZ, Autogiro and Betalingsservice schemes in GoCardless
* **2019-02-15**
  * [feature] Support for GoCardless
* **2019-02-05**
  * [feature] Chargify.js works with reactive frameworks like React or Angular
* **2018-09-26**
  * [feature] Styling placeholders is now available
  * [bugfix] Fixed support for Internet Explorer
* **2018-09-14**
  * [bugfix] Properly handle pages with script tags with no src attribute
* **2018-09-11** - Initial release

