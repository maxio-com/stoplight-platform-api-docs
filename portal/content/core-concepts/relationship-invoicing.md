# Invoicing

#### Relationship Invoicing Summary

- If your site **is** using relationship invoicing, you may only use the methods described in this section for working with invoices.

- If your site is **not** using relationship invoicing, please use the legacy invoice methods:

  - [Invoices](./b3A6MTQxMTA0MTA-read-invoice)
  - [Invoices: Payments](./b3A6MTQxMTA0MTI-create-invoice-payment)
  - [Invoices: Charges](./b3A6MTQxMTA0MTM-create-charge)
  - [Invoices: Credits](./b3A6MTQxMTA0MTQ-create-invoice-credit)

### API Compatibility for Relationship Invoicing

This section describes the API for the new, [Relationship Invoicing](https://maxio-chargify.zendesk.com/hc/en-us/articles/5405078794253) style of invoices introduced in January 2018.

If you are an existing customer from prior to January 2018 or have not otherwise explicitly opted into this new style of invoices, you are probably looking for the legacy "Invoices" section that describes [invoice-billing legacy-style invoices](./b3A6MTQxMDgzNjQ-read-invoice).

These new invoices provide a single representation of all of your Chargify billing, whether you collect automatically or via remittance.

### About Decimal Numbers

In order to prevent losing precision, we serialize decimal numbers as strings instead of as JSON numbers.

We recommend parsing these strings into their decimal equivalent using a decimal number library in your programming language (i.e. `BigDecimal` in Ruby) instead of relying on floating point values or arithmetic.

### About Amount Fields

Fields holding amount values are given as a string representing a decimal whole currency amount.

For example, `"1.23"` in currency `"USD"` would equate to `$1.23`.

Not all fields will be rounded to the smallest currency denomination. Intermediate results, such as those that derive from line-level tax calculations, may hold precision up to 8 decimal places. However, the top-level totals we provide (e.g. `total_amount`) will be rounded to the smallest currency denomination.

It is up to API consumers to parse the string into a decimal number representation and do any rounding necessary for your application.
