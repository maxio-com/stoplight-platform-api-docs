# Version History

The latest version of `chargify.js` is available at the following url:

```html
<script src="https://js.chargify.com/latest/chargify.js"></script>
```

We occasionally make updates to improve the functionality of Chargify.js in
accordance with our [backwards compatibility policy.](https://developers.chargify.com/docs/api-docs/YXBpOjE0MTA4MjYx-chargify-api#backwards-compatibility)

With every release of Chargify.js, we also publish a static version.
If needed, you can point to a specific version using a release date as shown below in the release history.
In this way you can control when the Chargify.js updates occur and test them with your
integration, or implement a Content Security Policy (CSP).  Example:

```html
<script src="https://js.chargify.com/v/2021-01-29a/chargify.js"></script>
```

| ❗️  We will support previous releases of Chargify.js for a maximum time frame of 6 months. If you use an explicitly versioned path of Chargify.js, you must commit to updating your integration regularly.  Versions older than 6 months will be unsupported and may be removed without notice.  |
|-----------------------------------------------------------------------------|

## Release History
* **2024-02-29** **latest**
  * [internal] Stripe BACS support
* **2024-02-21**
  * [internal] Plaid improvements
* **2023-11-09**
  * [internal] improve ACH flow
* **2023-09-12**
  * [internal] Plaid improvements
* **2023-09-05**
  * [internal] improvements for Public Signup Pages usage
* **2023-08-30**
  * [internal] Plaid improvements
* **2023-08-22** 
  * [internal] 3ds improvements
* **2023-07-24**
  * [internal] Plaid improvements
* **2023-07-17**
  * [bugfix] possibility to add challengeRequested parameter for Braintree
* **2023-07-11**
  * [bugfix] fix address fields incorrect behaviours
* **2023-06-06**
  * [feature] support passing 3DS verification amount for Cybersource
* **2023-05-25**
  * [feature] add public method `isPaymentProfileProvided` that securely checks the presence of payment profile details in Chargify.js instance
* **2023-05-17a**
  * [bugfix] fix issue with Braintree 3DS
* **2023-05-17**
  * [internal] adjustment for Public Signup Pages usage
* **2023-04-03**
  * [feature] improve ACH flow
* **2023-03-16** 
  * [feature] add additional callbacks for ACH flow
* **2023-03-13** 
  * [feature] allow to populate country & state dropdowns with full names
* **2023-03-10**
  * [internal] improve ACH flow
* **2023-03-06**
  * [feature] security enhancements
* **2023-02-06**
  * [bugfix] fix validation for default values
* **2023-02-02**
  * [internal] improve ACH flow
* **2023-01-31**
  * [internal] fix source maps generation
* **2023-01-26**
  * [internal] upgrade to node 16
* **2022-12-05**
  * [internal] Initial support for payments service
* **2022-11-30** 
  * [feature] add ability to listen to the address change event
* **2022-11-04**
  * [feature] add ability to set default value for firstName, lastName and address fields in config
* **2022-11-02**
  * [bugfix] prevent browser extensions from interfering with iframes communication
* **2022-10-11**
  * [enhancement] improve 3DS error messages from Braintree
* **2022-09-16**
  * [bugfix] stop enforcing state.value to be a 2-letter code if addressDropdowns is enabled
* **2022-09-15**
  * [feature] Allow to set default value for `country` and `state` fields
* **2022-09-09**
  * [feature] Remove support for quickpay gateway
* **2022-09-07**
  * [feature] Use "Select" as default placeholder for dropdown inputs
* **2022-09-02**
  * [internal] Move more logic into main iframe
* **2022-08-29**
  * [enhancement] Remove default placeholders for country and state fields
* **2022-08-24**
  * [bugfix] Make empty state field valid if selected country is stateless
* **2022-06-10**
  * [feature] Raise warning in web console when warning is included in API response
* **2022-04-27**
  * [bugfix] Fix validation border for standalone card field
* **2022-04-06**
  * [feature] Add callback when 3ds modal window opens and closes
* **2022-03-22**
  * [bugfix] Invoke onError callback when customer cancels 3DS authentication
* **2022-03-21**
  * [enhancement] Credit card detection callback
* **2022-03-10** 
  * [feature] Add support for auto focus to next field
* **2022-03-09** 
  * [bugfix] Fix 3ds payment authorization currency for bluesnap (uses custom one when it was set up)
* **2022-02-25**
  * [bugfix] Fix editing in fields with input masks, add input mask for the unrecognized card number
* **2022-02-23** 
  * [feature] Add better validations
* **2022-02-17b**
  * [hotfix] Revert changes in 2022-02-17 and 2022-02-17a
* **2022-02-17a**
  * [hotfix] Fix bug with invalid fields in the error callback as an array of objects
* **2022-02-17**
  * [feature] Add better validations
* **2022-02-11** 
  * [feature] Add support for styling using pseudo-classes and pseudo-elements
* **2022-01-03**
  * [bugfix] Update options instead of removing select for dropdowns to keep validation
* **2021-10-28**
  * [bugfix] Fix live/on-submit validation interaction
* **2021-09-16**
  * [feature] Add optional requirement on billing address for GoCardless
* **2021-09-06**
  * [feature] Add Checkout.com 3D Secure support
* **2021-07-05**
  * [internal] Display proper error message for invalid api usage for GoCardless
* **2021-06-23**
  * [bugfix] Revert move more logic into main iframe (fixes issue with 2021-06-17)
* **2021-06-17**
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
