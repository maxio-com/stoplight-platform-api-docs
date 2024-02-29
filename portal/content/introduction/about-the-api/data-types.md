# Data Types

### Time Zones

API responses from Chargify are sent with the timezone of current Chargify site.

Alternately, webhooks sent from Chargify globally utilize EST as the timezone for all content in the body of the payload.

#### About Decimal Numbers

In order to prevent losing precision, we serialize decimal numbers as strings instead of as JSON numbers.

We recommend parsing these strings into their decimal equivalent using a decimal number library in your programming language (i.e. `BigDecimal` in Ruby) instead of relying on floating point values or arithmetic.

#### About Amount Fields

Fields holding amount values are given as a string representing a decimal whole currency amount.

For example, `"1.23"` in currency `"USD"` would equate to `$1.23`.

Not all fields will be rounded to the smallest currency denomination. Intermediate results, such as those that derive from line-level tax calculations, may hold precision up to 8 decimal places. However, the top-level totals we provide (e.g. `total_amount`) will be rounded to the smallest currency denomination.

It is up to API consumers to parse the string into a decimal number representation and do any rounding necessary for your application.
