---
tags: [Basics]
---

# API Access Limitations

There are a few scenarios that may end up in causing an API request to be blocked even with correct credentials.
**Please note:** All relevant API requests will be blocked if any of the below conditions are true. These limitations also apply to [Chargify Direct](https://developer.chargify.com/content/chargify-direct/chargify-direct.html).

Those scenarios are as follows:

- Your Chargify subscription is canceled.
- Your Chargify trial has reached an end.
- The site you're making a request for is in the process of ["clearing site data"](https://help.chargify.com/sites/clearing-site-data.html)
  - _Note: any API request for another site that is in a good state will NOT be blocked_
- The site you're making a request for has been deleted.
  - _Note: any API request for another site that is in a good state will NOT be blocked_

Read more about your Chargify subscription [here](https://help.chargify.com/my-account/chargify-subscription.html)

## What happens when an API request is blocked

The request will fail with a `422` http status code. The response will also include a message explaining the reason for the request being blocked. For example:

- If your Chargify subscription is canceled:

```json
{
  "errors" => [
    [0] "Your Chargify account has been canceled. Please contact support@chargify.com to reactivate."
  ]
}
```

- If your Chargify trial has reached and end and you attempted to make an API request, the response body will look like:

```json
{
  "errors" => [
    [0] "Your trial has ended, please contact sales."
  ]
}
```

- If the site you're making a request for is in the process of ["clearing site data"](https://help.chargify.com/sites/clearing-site-data.html):

```json
{
  "errors" => [
    [0] "Site data clearing is in progress. Please try later."
  ]
}
```

- If the site you're making a request for has been deleted:

```json
{
  "errors" => [
    [0] "This site has been deleted."
  ]
}
```