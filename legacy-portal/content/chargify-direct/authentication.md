# Authentication

## Deprecation

| ❗️ Please note that Chargify Direct has been deprecated in favor of Chargify.js |
| ------------------------------------------------------------------------------- |

Chargify.js is a PCI compliant way of embedding payment forms on your site, while still making full use of our powerful API.

While Chargify Direct will still function and be supported, no new enhancements or features will be added.

## Chargify Direct

The second method of interaction is using Chargify Direct. Chargify Direct has two methods of connectivity:

1. via the submitted form values
2. via a regular REST call

## Chargify Direct via Secure Parameters

Secure parameters are used when using the transparent redirect (posting values directly) to Chargify using a `<form method='POST' \>`.
This is done when [creating new subscriptions](https://developers.maxio.com/docs/developer-docs/d2e9e34db740e-signups) and [updating payment profile](page:chargify-direct/card-update) information.

Every Chargify Direct post must contain a set of cryptographically signed secure parameters. The secure parameters are necessary in order to:

- Authenticate the request so that Chargify can verify it comes from a trusted source (since anyone on the internet can post to Chargify Direct endpoints)
- Allow you to send tamper-proof data along with the request
- Specify a redirection URI (or override your default)

The following are the list of secure parameters inputs necessary for authentication:

| Parameter   | Description                                                                                                                                                                                                                                                                                                                                                                                                           | Required |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `api_id`    | Your API Key/ID, as assigned by Chargify (see ["Obtaining Credentials"](https://chargify.zendesk.com/hc/en-us/articles/4407728073371)).                                                                                                                                                                                                                                                                               | Yes      |
| `timestamp` | he time of the request, given as an integer number of seconds elapsed since Jan 1, 1970 00:00:00 UTC (i.e. Unix time). If you provide a timestamp, it will be reflected back to you in the response parameters, and MAY be used to invalidate the request if it is older than a certain threshold. **Do not include miliseconds.** (see [timestamping requests](page:chargify-direct/overview#timestamping-requests)) |          |
| `nonce`     | A string (max 40 characters) used to uniquely identify the request. The nonce must be unique when scoped by the timestamp and your API ID. With nonce provided, it will be reflected back to you in the response parameters, and MAY be used to invalidate the request if it matches a previously used value for the same timestamp ([see nonce values](page:chargify-direct/overview#nonce-values))                  | Yes      |
| `data`      | A string in URL query-string format that may be used to transmit tamper-proof data to Chargify through the form (see Secure data). Note that you will want to escape any HTML characters in this string before embedding it in your form.                                                                                                                                                                             |          |
| `signature` | A verification signature based on the other 4 secure inputs and the shared `api_secret` for the API User ([see signature calculation](page:chargify-direct/authentication#signature-calculation))                                                                                                                                                                                                                     | Yes      |

These secure inputs should be sent to Chargify through the Direct endpoint nested inside the secure parameter.
For example, the following form demonstrates how to use hidden form inputs to submit all 5 secure inputs:

```html
<form method="post" action="https://api.chargify.com/api/v2/signups">
  <input type="hidden" name="secure[api_id]" value="1234" />
  <input type="hidden" name="secure[timestamp]" value="1301148971" />
  <input
    type="hidden"
    name="secure[nonce]"
    value="5b2763d0-39e1-012e-858d-64b9e8d3946e"
  />
  <input type="hidden" name="secure[data]" value="one=uno&amp;two=dos" />
  <input
    type="hidden"
    name="secure[signature]"
    value="412951d095ebbb3800dfb2126fe5073d2ab6c260"
  />
</form>
```

### Signature Calculation

The authentication value in this method is the **signature**. The signature is the hexadecimal representation of a computed
Hash-based Message Authentication Code, using SHA-1 as the cryptographic function (HMAC-SHA1).
The secret for the function is the API shared secret (`api_secret`) issued to the API user by Chargify.
The message for the function is the concatenation of the `api_id`, `timestamp`, `nonce`, and `data` parameters.
Any optional parameter that is not given is converted to an empty string.

```ruby
HMAC-SHA1(api_secret, api_id+timestamp+nonce+data)
```

For additional information, please see [Chargify Direct](page:chargify-direct/signups).

### Duplicate Prevention

To avoid double charges, we strongly recommend that you supply a `uniqueness_token` in your request.  
(The value can be the same as the nonce; it has a similar function.)  
This will allow the system to fail fast if a second request arrives before the first has completed.  
Without the `uniqueness_token`, even if you supply a timestamp and nonce, you _may_ see occasional duplicates depending on the timing of the requests.

```html
<form method="post" action="https://api.chargify.com/api/v2/signups">
  <input
    type="hidden"
    name="uniqueness_token"
    value="5b2763d0-39e1-012e-858d-64b9e8d3946e"
  />
  ...
</form>
```

You can learn more in the [Duplicate Prevention](https://developers.maxio.com/docs/developer-docs/7cd88c68d9d2b-duplicate-prevention) documentation.

### Chargify Direct via REST

One of the most common calls you will need to make is to retrieve a previous Chargify Direct call to determine if it's been successful.
For the basic http authentication of this call, you would use the API Key/ID as the _username_ and the API password as the _password_ , like the following:

```perl
curl -u <API_ID>:<API_PASSWORD> -H Accept:application/json -X GET https://api.chargify.com/api/v2/calls/<CALL_ID>.json
```

## Obtaining Credentials

For both API and Chargify Direct credentials, your `API key` can be generated from the "Integrations" tab of your site dashboard.

For API, your basic http authentication username is your `API key` while the password is always "X".

For Chargify Direct credentials, you will be provided three values:

1. API key/ID
2. API password
3. API secret

For the transparent redirect (posting values directly to Chargify), you will be using the API key/ID and the API secret.
The API password is reserved for use in Chargify Direct calls (like to the "call" endpoint to verify the last submission was successful).

**Note**: The shared secret and password are only shared once via the admin interface, so it is important that you copy
them down for all future use as you won't be able to retrieve them after creating the credential.

## Troubleshooting: Unable to Connect

If you are unable to connect, the problem is often that you are using an old/unsupported version of SSL or TLS. In this case,
Chargify will simply drop the connection, and the error message you receive may be cryptic.

Here are some common error messages that have been reported:

- The underlying connection was closed: An unexpected error occurred on a send.
- `Authentication failed because the remote party has closed the transport stream.`

## Troubleshooting: Request blocked with `422` response code

Chargify will block requests and return a `422` response code and body with errors if your account is in one of a few certain scenarios.
You can read more about this in our [API documentation](https://developers.maxio.com/docs/api-docs/7b6ea12f39549-maxio-advanced-billing#api-access-limitations)
