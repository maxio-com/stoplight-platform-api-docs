---
tags: [Chargify Direct]
---

# API Call

## Deprecation

| ❗️  Please note that Chargify Direct has been deprecated in favor of Chargify.js  |
|-----------------------------------------------------------------------------|

Chargify.js is a PCI compliant way of embedding payment forms on your site, while still making full use of our powerful API.

While Chargify Direct will still function and be supported, no new enhancements or features will be added.

## Chargify Direct

Chargify Direct resources use different credentials than the standard Chargify API. If you receive a `401 Unauthorized response`, please see the section on [Authentication](/content/getting-started/authentication.html) in the Getting Started guide.

## Call Attributes

All of the call attribute fields are returned from GET (read) operations, and all are read only.

{:.table.table-bordered}
| Title                   | Description                                                                                                                                                                                 |
|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `id`                    | The ID of the call                                                                                                                                                                          |
| `api_id`                | The API ID associated with this call                                                                                                                                                        |
| `timestamp`             | The timestamp of this call. Should match the submitted secure parameter (request → secure → timestamp)                                                                                      |
| `nonce`                 | The nonce (if used). Should match the submitted secure parameter (request → secure → timestamp)                                                                                             |
| `request`               | Details about the request submitted to the Chargify Direct endpoint                                                                                                                         |
| `secure`                | The secure parameters                                                                                                                                                                       |
| `api_id`                | `timestamp`, `nonce`, `data`, `signature` --> The response signature, used to validate this call. See [Response Signature](/content/chargify-direct/overview.html#response-signature here.) |
| `signup`                | The signup parameters                                                                                                                                                                       |
| `response`              | Details the response to the call made to the Chargify Direct endpoint                                                                                                                       |
| `result`                |                                                                                                                                                                                             |
| `status_code`           | The HTTP status code of the operation performed during this call                                                                                                                            |
| `result_code`           | A result code that will eventually translate to meaningful information. Currenly, it’s just the four-digit HTTP status code.                                                                |
| `errors`                | An array of strings which described (when applicable) the errors encounted during the failed call.                                                                                          |
| `meta`                  |                                                                                                                                                                                             |
| `signup `               |                                                                                                                                                                                             |
| `product`               | Details about the subscribed product                                                                                                                                                        |
| `customer`              | Details about the customer                                                                                                                                                                  |
| `payment_profile`       | Details about the payment profile of the subscription                                                                                                                                       |
| `subscription`          | Details about the customers subscription                                                                                                                                                    |
| `next_billing_manifest` | Details about the charges incurred during this call                                                                                                                                         |
| `success`               | Was the call successful? (ie. was the response → status_code 200?)                                                                                                                          |

## Methods

Read/Show (via Call ID)

URL: `https://api.chargify.com/api/v2/calls/<call_id>`
Method: GET
Required Parameters: `call_id`

Response: An single call

## JSON Read Call Example

Scenario: As a developer, I want to be able to read the call via Chargify Direct

  Background:
    Given I am a valid API user
    And I accept JSON

  Scenario: Retrieve a signup call
    Given I have a call ID, returned in the query string to the redirect_uri specified
    When I send a GET request to https://api.chargify.com/api/v2/calls/<call_id>
    Then the response status should be "200 OK"
    And the response should be the json:
     """

<script src="https://gist.github.com/woodchopgirl/3bb5dae2cc572162b503c7ca5381aabb.js"></script>
