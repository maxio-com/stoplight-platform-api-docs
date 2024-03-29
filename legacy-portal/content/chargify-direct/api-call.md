# API Call

## Deprecation

| ❗️ Please note that Chargify Direct has been deprecated in favor of Chargify.js |
| ------------------------------------------------------------------------------- |

Chargify.js is a PCI compliant way of embedding payment forms on your site, while still making full use of our powerful API.

While Chargify Direct will still function and be supported, no new enhancements or features will be added.

## Chargify Direct

Chargify Direct resources use different credentials than the standard Chargify API. If you receive a `401 Unauthorized response`,
please see the section on [Authentication](page:chargify-direct/authentication) in the Getting Started guide.

## Call Attributes

All of the call attribute fields are returned from GET (read) operations, and all are read only.

| Title                   | Description                                                                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                    | The ID of the call                                                                                                                                                 |
| `api_id`                | The API ID associated with this call                                                                                                                               |
| `timestamp`             | The timestamp of this call. Should match the submitted secure parameter (request → secure → timestamp)                                                             |
| `nonce`                 | The nonce (if used). Should match the submitted secure parameter (request → secure → timestamp)                                                                    |
| `request`               | Details about the request submitted to the Chargify Direct endpoint                                                                                                |
| `secure`                | The secure parameters                                                                                                                                              |
| `api_id`                | `timestamp`, `nonce`, `data`, `signature` --> The response signature, used to validate this call. See [Response Signature](./overview.md#response-signature) here. |
| `signup`                | The signup parameters                                                                                                                                              |
| `response`              | Details the response to the call made to the Chargify Direct endpoint                                                                                              |
| `result`                |                                                                                                                                                                    |
| `status_code`           | The HTTP status code of the operation performed during this call                                                                                                   |
| `result_code`           | A result code that will eventually translate to meaningful information. Currenly, it’s just the four-digit HTTP status code.                                       |
| `errors`                | An array of strings which described (when applicable) the errors encounted during the failed call.                                                                 |
| `meta`                  |                                                                                                                                                                    |
| `signup `               |                                                                                                                                                                    |
| `product`               | Details about the subscribed product                                                                                                                               |
| `customer`              | Details about the customer                                                                                                                                         |
| `payment_profile`       | Details about the payment profile of the subscription                                                                                                              |
| `subscription`          | Details about the customers subscription                                                                                                                           |
| `next_billing_manifest` | Details about the charges incurred during this call                                                                                                                |
| `success`               | Was the call successful? (ie. was the response → status_code 200?)                                                                                                 |

## Methods

Read/Show (via Call ID)

URL: `https://api.chargify.com/api/v2/calls/<call_id>`
Method: GET
Required Parameters: `call_id`

Response: An single call

## JSON Read Call Example

As a developer, I want to be able to read the call via Chargify Direct

Background:

- Given I am a valid API user
- And I accept JSON

Scenario: Retrieve a signup call

- Given I have a call ID, returned in the query string to the redirect_uri specified
- When I send a GET request to `https://api.chargify.com/api/v2/calls/<call_id>`
- Then the response status should be "200 OK"
- And the response should be the json:

```
{
    "call": {
        "id": "fbdb1d1b18aa6c08324b7d64b71fb76370690e1d",
        "api_id": "`your value`",
        "timestamp": 1368558265,
        "nonce": "7c94aa52-8513-4685-ade8-b3d92af7d77a",
        "request": {
            "secure": {
                "api_id": "`your value`",
                "timestamp": "1368558265",
                "nonce": "7c94aa52-8513-4685-ade8-b3d92af7d77a",
                "data": "redirect_uri=`your return url`",
                "signature": "8a3a84bcd0d0065e97f175d370447c7d02e00973"
            },
            "signup": {
                "product": {
                    "handle": "`your value`"
                },
                "components": {
                    "`your component id`": "2"
                },
                "customer": {
                    "first_name": "`your value`",
                    "last_name": "`your value`",
                    "email": "`your value`"
                },
                "payment_profile": {
                    "first_name": "`your value`",
                    "last_name": "`your value`",
                    "card_number": "",
                    "expiration_month": "",
                    "expiration_year": ""
                }
            }
        },
        "response": {
            "result": {
                "status_code": "200",
                "result_code": "2000",
                "errors": []
            },
            "meta": {
                "status_code": "200",
                "result_code": "2000",
                "errors": []
            },
            "signup": {
                "product": {
                    "id": `generated/returned id`,
                    "handle": "product",
                    "name": "Product",
                    "accounting_code": "",
                    "description": "",
                    "price_in_cents": 500,
                    "interval_unit": "month",
                    "interval": 1,
                    "initial_charge_in_cents": null,
                    "trial_price_in_cents": null,
                    "trial_interval": null,
                    "trial_interval_unit": "month",
                    "expiration_interval_unit": "never",
                    "expiration_interval": null,
                    "return_url": "",
                    "return_params": "",
                    "require_credit_card": true,
                    "request_credit_card": true,
                    "created_at": "2013-04-05T15:24:02-04:00",
                    "updated_at": "2013-04-05T15:24:02-04:00",
                    "archived_at": null,
                    "product_family_id": `your value`
                },
                "customer": {
                    "id": `generated/returned id`,
                    "reference": null,
                    "first_name": "`your value`",
                    "last_name": "`your value`",
                    "email": "`your value`",
                    "organization": null,
                    "address": null,
                    "address_2": null,
                    "city": null,
                    "state": null,
                    "zip": null,
                    "country": null,
                    "phone": null,
                    "created_at": "2013-05-14T14:31:09-04:00",
                    "updated_at": "2013-05-14T14:31:09-04:00"
                },
                "payment_profile": {
                    "id": `generated/returned id`,
                    "first_name": "`your value`",
                    "last_name": "`your value`",
                    "masked_card_number": "XXXX-XXXX-XXXX-1",
                    "card_type": "bogus",
                    "expiration_month": 6,
                    "expiration_year": 2016,
                    "billing_address": null,
                    "billing_address_2": null,
                    "billing_city": null,
                    "billing_state": null,
                    "billing_country": null,
                    "billing_zip": null,
                    "current_vault": "bogus",
                    "vault_token": "1",
                    "customer_vault_token": null,
                    "customer_id": `generated/returned id`,
                    "created_at": "2013-05-14T14:31:09-04:00",
                    "updated_at": "2013-05-14T14:31:09-04:00"
                },
                "subscription": {
                    "id": `generated/returned id`,
                    "state": "active",
                    "balance_in_cents": 700,
                    "current_period_ends_at": "2013-06-14T14:31:09-04:00",
                    "next_assessment_at": "2013-06-14T14:31:09-04:00",
                    "trial_started_at": null,
                    "trial_ended_at": null,
                    "activated_at": "2013-05-14T14:31:10-04:00",
                    "expires_at": null,
                    "created_at": "2013-05-14T14:31:09-04:00",
                    "updated_at": "2013-05-14T14:31:10-04:00",
                    "cancellation_message": null,
                    "cancel_at_end_of_period": false,
                    "canceled_at": null,
                    "current_period_started_at": "2013-05-14T14:31:09-04:00",
                    "previous_state": "active",
                    "signup_payment_id": `generated/returned id`,
                    "signup_revenue": "7.00",
                    "delayed_cancel_at": null,
                    "customer_id": `generated/returned id`,
                    "product_id": `returned id`,
                    "payment_profile_id": `returned id`
                },
                "next_billing_manifest": {
                    "period_type": "recurring",
                    "total_tax_in_cents": 0,
                    "end_date": "2013-07-14T18:31:09+00:00",
                    "start_date": "2013-06-14T18:31:09+00:00",
                    "line_items": [{
                            "transaction_type": "charge",
                            "discount_amount_in_cents": 0,
                            "amount_in_cents": 500,
                            "memo": "Product (06\/14\/2013 - 07\/14\/2013)",
                            "taxable_amount_in_cents": 0,
                            "kind": "baseline"
                        },
                        {
                            "component_id": `returned id`,
                            "transaction_type": "charge",
                            "discount_amount_in_cents": 0,
                            "amount_in_cents": 200,
                            "memo": "Widget: 2 widgets",
                            "taxable_amount_in_cents": 200,
                            "kind": "component"
                        }
                    ],
                    "total_discount_in_cents": 0,
                    "total_in_cents": 700,
                    "subtotal_in_cents": 700
                }
            }
        },
        "success": true
    }
 }
```
