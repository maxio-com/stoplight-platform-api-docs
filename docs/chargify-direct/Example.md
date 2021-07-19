---
tags: [Chargify Direct]
---

# Example

## Deprecation

| ❗️  Please note that Chargify Direct has been deprecated in favor of Chargify.js  |
|-----------------------------------------------------------------------------|

Chargify.js is a PCI compliant way of embedding payment forms on your site, while still making full use of our powerful API.

While Chargify Direct will still function and be supported, no new enhancements or features will be added.

```html 
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
</head>
<body>
<form method="post" action="https://api.chargify.com/api/v2/signups">

  <?php
    //Chargify Direct Credentials
    $api_secret = "chargify-direct-api-secret-key";
    $api_id = "chargify-direct-api-key";
    
    //Establish nonce through a timestamp
    $time = time();
    $nonce = md5($time);

    //Define your redirect URL
    $data = "redirect_uri=http%3A%2F%2Fwww.example.com%2Fparameter=value%26parameter2=value";
  
    //Create concatenated string of API ID, time, nonce, and data
    $str = $api_id.$time.$nonce.$data;
    
    //Create Chargify Direct Signature
    $signature = hash_hmac( 'sha1', $str, $api_secret);
  ?>

  <!-- Define hidden form values using the values from above -->
  <input type="hidden" name="secure[api_id]"    value="<?php echo $api_id; ?>" />
  <input type="hidden" name="secure[timestamp]" value="<?php echo $time; ?>" />
  <input type="hidden" name="secure[nonce]"     value="<?php echo $nonce; ?>" />
  <input type="hidden" name="secure[data]"      value="<?php echo $data; ?>" />
  <input type="hidden" name="secure[signature]" value="<?php echo $signature; ?>" />

  <!-- For brevity, this form contains no labels, only inputs -->
  <input type="hidden" name="signup[product][handle]" value="example-product" />
  <input type="text" name="signup[customer][first_name]" /></br>
  <input type="text" name="signup[customer][last_name]" /></br>
  <input type="text" name="signup[customer][email]" /></br>
  <input type="text" name="signup[customer][organization]" /></br>
  <input type="text" name="signup[payment_profile][first_name]" /></br>
  <input type="text" name="signup[payment_profile][last_name]" /></br>
  <input type="text" name="signup[customer][reference]" /></br>

  <!-- begin credit card fields -->
 <input type="text" name="signup[payment_profile][card_number]" /></br>
 <input type="text" name="signup[payment_profile][expiration_month]" /></br>
 <input type="text" name="signup[payment_profile][expiration_year]" /></br>
 <input type="text" name="signup[coupon_code]" value="" /></br>
 <input type="text" name="signup[metafields][Individuals]" />
 <input type="text" name="signup[customer][phone]" />
  <!-- end credit card fields -->


  <input type="submit" value="Subscribe using Chargify Direct" />
</form>
</body>
</html>
```

As a guide, in chronological order, here are the fields used in the form above:

+  First name
+  Last name
+  Email
+  Organization
+  Billing first
+  Billing last
+  REF

+ Credit card number
+ Expiration month
+ Expiration year
+ Coupon
+ Metafield (optional custom field)
+ Phone
