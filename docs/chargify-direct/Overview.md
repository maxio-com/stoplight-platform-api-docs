---
tags: [Chargify Direct]
---

# Overview

## Deprecation

| ❗️  Please note that Chargify Direct has been deprecated in favor of Chargify.js  |
|-----------------------------------------------------------------------------|

Chargify.js is a PCI compliant way of embedding payment forms on your site, while still making full use of our powerful API.

While Chargify Direct will still function and be supported, no new enhancements or features will be added.

## Chargify Direct

Chargify Direct usually requires a more technically experienced merchant, and sometimes requires our technical specialist support during implementation. Access to our technical specialist support is available with our premium Chargify plans.

You’re welcome to use Chargify Direct on any plan level with Chargify. However, please note that if you need assistance, we will ask up-front that you be on a plan that includes advanced technical support.

<div class="alert alert-warning">
Please note that Chargify Direct currently doesn’t support creating manual invoice-based subscribers.
</div>

Chargify Direct allows you to create Chargify resources (such as subscriptions) via a form on your own website that posts directly to Chargify. After Chargify receives the form submission, the user is redirected back to your own site. The redirection communicates the result of the submission so that your website can decide how to respond to the user. This flow is sometimes called “transparent redirect” within the industry.

Please be aware that using Chargify Direct is radically different than an implementation of Chargify's API.

+ Chargify's API uses a separate endpoint that is constructed using your site's subdomain. 
+ Chargify Direct uses the endpoint `https://api.chargify.com/api/v2/..` as the basis for all calls made.
+ The methods and endpoints and examples are not interchangeable. Please be aware what space you are working in before proceeding.

## Reference Implementation

A small Sinatra app has been constructed to serve as a reference implementation for Chargify Direct. It is available here:

[https://github.com/chargify/chargify_direct_example](https://github.com/chargify/chargify_direct_example)

## Benefits

+ Your users never leave your website throughout the flow
+ Your PCI compliance scope is drastically reduced, since you never process or transmit sensitive card data

## Detailed Flow

1. You craft a form on your own website that posts to one of the Chargify Direct resource endpoints at Chargify. This form must contain the proper secure parameters and should also have parameters for the resource being created. Optionally, you may add parameters that will be reflected back to you in the mirror parameters.

2. Chargify receives the form post and processes it as follows:

    + The information sent in the secure parameters is verified via its cryptographic signature
    + If verified, creation of the requested resource is attempted via the passed parameters
    + Whether or not the resource was created, details about the form post and the result is logged by Chargify. The record of this “call” is made available in the Chargify Direct API

3. Chargify redirects to a URI you define, adding in signed response parameters in the query string containing information about the result of the original request

    + Your app validates the information sent in the response parameters by computing and comparing the cryptographic signature of the result
    + Your app can display a success/fail screen based solely on the status given in the response parameters
    + For a better user experience, your app can make a regular API access to fetch the record of the original call, which contains the request (minus sensitive cardholder data), response, and result. If the result was a success, you’ll have information about the resource to display. If the result was a failure, you’ll be able to re-display your form, pre-filling much of the original form with the originally submitted values and pinpointing errors

## Secure Parameters

Every Chargify Direct post must contain a set of cryptographically-signed secure parameters. The secure parameters are necessary in order to:

+ Authenticate the request so that Chargify can verify it comes from a trusted source (since anyone on the internet can post to Chargify Direct endpoints)
+ Allow you to send tamper-proof data along with the request
+ Specify a redirection URI (or override your default)

{:.table.table-bordered}
| api_id    | Required | Your API ID, as assigned by Chargify (see API User Credentials)                                                                                                                                                                                                                                                                               |
|-----------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| timestamp | Optional | The time of the request, given as an integer number of seconds elapsed since Jan 1, 1970 00:00:00 UTC (i.e. Unix time). If you provide a timestamp, it will be reflected back to you in the response parameters, and MAY be used to invalidate the request if it is older than a certain threshold (see Timestamping requests below)                |
| nonce     | Required | A string (max 40 characters) used to uniquify the request. The nonce must be unique when scoped by the timestamp and your API ID. With nonce provided, it will be reflected back to you in the response parameters, and **MAY** be used to invalidate the request if it matches a previously used value for the same timestamp (see Nonce values) |
| data      | Optional | A string in URL query-string format that may be used to transmit tamper-proof data to Chargify through the form (see Secure data). Note that you will want to escape any HTML characters in this string before embedding it in your form.                                                                                                     |
| signature | Required | A verification signature based on the other 4 secure inputs and the shared api_secret for the API User (See Signature Calculation)                                                                                                                                                                                                            |

These secure inputs should be sent to Chargify through the Chargify Direct endpoint nested inside the secure parameter. For example, the following form demonstrates how to use hidden form inputs to submit all 5 secure inputs:

```html
<form method="post" action="https://api.chargify.com/api/v2/signups">
  <input type="hidden" name="secure[api_id]"    value="1234" />
  <input type="hidden" name="secure[timestamp]" value="1301148971" />
  <input type="hidden" name="secure[nonce]"     value="5b2763d0-39e1-012e-858d-64b9e8d3946e" />
  <input type="hidden" name="secure[data]"      value="one=uno&amp;two=dos" />
  <input type="hidden" name="secure[signature]" value="412951d095ebbb3800dfb2126fe5073d2ab6c260" />
</form>
```

## Timestamping Requests

Adding a timestamp to your request can help to guard against replay attacks and duplicate submissions but also has the potential to diminish the experience of valid users. If you do not send a timestamp with your requests, Chargify will not perform any rejections based on timestamp age or timestamp-nonce pair duplicates.

Timestamps must be specified as an integer number of seconds elapsed since Jan 1, 1970 00:00:00 UTC (i.e. Unix time). **Do not include miliseconds.** (In Ruby, this is available by casting a Time object to an integer, i.e. Time.now.to_i)

If you submit a timestamp with your request, it will be included in the response parameters and available when you fetch the call. If you do not submit a timestamp, one will be generated automatically.

**At this point in development, Chargify is not rejecting any submissions based on the age of the timestamp. Only duplicate timestamps will be rejected. The specifics of this mechanism will be published in the future.**

## Nonce Values

Adding a nonce to your request helps to guard against replay attacks and duplicate submissions.

+ Values for your nonce must be 40 characters or less.

+ If you do not send a nonce with your signup request, Chargify will generate one, but will not perform any rejections based on timestamp-nonce pair duplicates.

+ The nonce is required for the `card_update` endpoint.

+ The nonce will be reflected back to you in the response parameters.

## Secure Data

The data parameter in the secure inputs gives you a chance to provide tamper-proof attributes along with your form submission. Usually, you will place parameters for the resource being created that you don’t want the user to be able to change. For example, you could include the product handle for a signup so that the form would only work for creating a subscription to the specified product. If the same parameter is sent in the normal resource parameters, that parameter will be overridden by the one in the secure data.

Unless you have registered a default redirection URI for the endpoint you are accessing, one of the parameters in your secure data must be for redirect_uri.

For example, consider a form that contains both of the following hidden form inputs:

```
<input type="hidden" name="secure[data]" value="signup[product][handle]=pro" />
<input type="hidden" name="signup[product][handle]" value="basic" />
```

As long as the submission passes signature validation, the value of `pro` would be used, not basic, for the `signup[product][handle]` parameter.

The value attribute of the `secure[data]` parameter should be a string of data in query-string format:

+ The query string is composed of a series of field-value pairs
+ The field-value pairs are each separated by an equals sign. The equals sign may be omitted if the value is an empty string
+ The series of pairs is separated by the ampersand (‘&’)

Your individual keys and values should be themselves URL-encoded, but the overall string should not be. Since your string will be inserted inside the value attribute of an input tag, it should then be HTML-entity escaped. Consider the following hidden input:

```
<input type="hidden" name="secure[data]" value="address[city]=Raleigh&amp;address[state]=North%20Carolina&amp;hobbies[0]=soccer&amp;hobbies[1]=snowboarding&amp;hobbies[2]=playing%20inside%20the%20%3Chtml%3E%20tag%20at%20http%3A%2F%2Fchargify.com" />
```

The input above would parse out to the following data structure (represented in YAML):

```yaml
---
  address:
    city: Raleigh
    state: North Carolina
  hobbies:
  - soccer
  - snowboarding
  - playing inside the <html> tag at https://chargify.com
```
  
## Signature Calculation

The signature is the hexadecimal representation of a computed Hash-based Message Authentication Code, using SHA-1 as the cryptographic function (HMAC-SHA1). The secret for the function is the API shared secret (api_secret) issued to the API user by Chargify. The message for the function is the concatenation of the `api_id`, `timestamp`, `nonce`, and data parameters _in this order_ . Any optional parameter that is not given is converted to an empty string. 

```
HMAC-SHA1(api_secret, api_id+timestamp+nonce+data)
```

An example, in Ruby, is at `https://github.com/chargify/chargify_direct_signature_example`

This app can also serve as an online verifier of your calculations. It can be accessed at [https://chargify-direct-signature.herokuapp.com/](https://chargify-direct-signature.herokuapp.com/)

## Redirection URI

In order to tell Chargify where to redirect after attempting to create the resource, you should specify a value for `redirect_uri` within your secure data. This value is not read from normal parameters so, if included, it must be within your secure data paramters.

For example, the following form would attempt to create a signup resource at Chargify and then redirect to `https://www.example.com` (with the response parameters in the query string):

```
<form action="https://api.chargify.com/api/v2/signups" method="post">
  <input type="hidden" name="secure[api_id]" value="my_api_id"/>
  <input type="hidden" name="secure[data]" value="redirect_uri=http%3A%2F%2Fwww.example.com"/>
  <input type="hidden" name="secure[signature]" value="bd8629eba9bd1c134b3a8c6352d784b9f86fb6a9"/>
  <!-- Resource parameters here-->
  <input type="submit" value="Submit"/>
</form>
```

## Mirror Parameter

Mirror parameters are not currently implemented within Chargify

Your form may post any data (formatted like the secure data) to the mirror parameter. This data will be reflected back to you, unaltered, as a part of the response parameters.

The purpose of this parameter is to serve as a convenience “hook” for your application. You may decide to add extra data to your submission that can only be calculated on the client side, i.e. detecting JavaScript capabilities and setting a flag for yourself.

Please keep the amount of data passed in this parameter to a minimum. Since it is recommended that query strings have fewer than 255 characters, and the redirection to your app will use a query string to pass result parameters, adding a lengthy mirror parameter could cause compatibility problems for your web server.

## Chargify Direct Endpoints

**Signups**

Creating a signup creates a subscription, and may create or reference an existing customer and payment profile.

Resource URI: `https://api.chargify.com/api/v2/signups`

**Card Update**

Updating a subscription’s payment profile with new information.

Resource URI: `https://api.chargify.com/api/v2/subscriptions/<subscription.id>/card_update`

See API: [Card Update](https://chargify.stoplight.io/docs/api-documentation/reference/Chargify-API.v1.yaml/paths/~1payment_profiles~1%7Bpayment_profile_id%7D.json/put) for more details.

## Resource Parameters

Your form should contain parameters for the resource you are creating, unless they are all placed inside of the secure data (unlikely).

The resource parameters are nested beneath a key named after the resource, and are similar to the normal API inputs for the resource. For example, the following form would include all of the necessary inputs to create a signup with a new customer and payment profile:

```
<form method="post" action="https://api.chargify.com/api/v2/signups">
  <!-- Secure parameters would go here here -->
  <!-- For brevity, this form contains no labels, only inputs :) -->
  <input type="hidden" name="signup[product][handle]" value="basic" />
  <input type="text" name="signup[customer][first_name]" />
  <input type="text" name="signup[customer][last_name]" />
  <input type="text" name="signup[customer][email]" />
  <input type="text" name="signup[payment_profile][first_name]" />
  <input type="text" name="signup[payment_profile][last_name]" />
  <input type="text" name="signup[payment_profile][card_number]" />
  <input type="text" name="signup[payment_profile][expiration_month]" />
  <input type="text" name="signup[payment_profile][expiration_year]" />
  <input type="submit" value="Sign Up" />
</form>
```

See Chargify [Direct Signups](https://developer.chargify.com/content/chargify-direct/signups.html) for a full listing of input parameters.

## Response Parameters

When Chargify redirects back to your redirection URI, it will include the following query-string parameters:

{:.table.table-bordered}
| api_id      | The API ID that made the original request                                                                                                                                       |
|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| timestamp   | The reflected or auto-generated timestamp                                                                                                                                       |
| nonce       | The reflected or auto-generated nonce                                                                                                                                           |
| status_code | An HTTP status code that represents the status of the request. The same codes used for API resource creation are used.                                                          |
| result_code | A Chargify-specific result code, that is related to the status code but may give more specific information about the result of your request                                     |
| call_id     | The ID for the stored representation of the original call (form post). The call may be fetched via the API for full response information (for both success and fail scenarios). |
| signature   | The HMAC-SHA1 hexdigest of the previous parameters, to verify their integrity                                                                                                   |

## Response Signature

The signature of the response is the hexadecimal representation of a computed **"Hash-based Message Authentication Code"**, using SHA-1 as the cryptographic function (HMAC-SHA1). The secret for the function is the API shared secret (`api_secret`) issued to the API user by Chargify. The message for the function is the concatenation of the `api_id`, `timestamp`, `nonce`, `status_code`, `result_code`, and `call_id` parameters.

```
HMAC-SHA1(api_secret, api_id+timestamp+nonce+status_code+result_code+call_id)
```

## Result Codes

{:.table.table-bordered}
| Code   | Description                                                 |
|--------|-------------------------------------------------------------|
| `4001` | Authentication failed                                       |
| `4011` | Authentication failed due to missing nonce value            |
| `4040` | The requested object (e.g. Subscription) could not be found |
| `4220` | One or more validation errors on input                      |
| `4221` | Duplicate submission                                        |
| `4300` | Card declined                                               |
| `5000` | An error has occurred                                       |
| `5001` | The requested resource does not exist                       |

## Fetching the Call

A POST to a Chargify Direct endpoint is the same as making an API call. This call is logged and made available as a call resource in our API. This resource makes available the original request parameters, the response values, and the results.

When using Chargify Direct, the response parameters will include a `call_id` pointing to the call that was created as a result of your form post. You may fetch this call from `https://api.chargify.com/api/v2/calls/<call_id>` using your Chargify Direct credentials.

During development, you may want to use curl to fetch the call to view any error messages. For example:

```
curl -u <CHARGIFY_DIRECT_API_ID>:<CHARGIFY_DIRECT_PASSWORD> -H Accept:application/json -H Content-Type:application/json -X GET https://api.chargify.com/api/v2/calls/<CALL_ID>.json
```

See [API: Call](https://developer.chargify.com/content/chargify-direct/api-call.html) for a full listing of output fields.

## Authentication

Authentication for Chargify Direct is different depending on the type of request.
Authenticating Chargify Direct Requests `(application/x-www-form-urlencoded)`

Your form post is authenticated via the secure parameters included with your form submission. 

**Authenticating Server-to-Server API Requests (application/json)**

Chargify Direct supports HTTP Basic Authentication.

**HTTP Basic Authentication**

HTTP Basic Authentication (on wikipedia) is available using your `api_id` and api_password. It works the same as described in the article on API authentication, only the credentials are different.

Your Chargify Direct API ID and Password are different for each of your sites, and can be found under:

+ Config → 
+ Integrations → 
+ API Keys/Chargify Direct in the appliation

