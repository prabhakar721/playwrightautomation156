# Sauce Demo Checkout Test Plan

## Application Overview

Validate Sauce Demo authentication, product selection, cart navigation, checkout details, order submission, and completion confirmation using a fresh browser state for each scenario. The primary flow uses standard_user / secret_sauce, adds one product, submits prabha sekar with postal code 600037, and verifies the completed-order message.

## Test Scenarios

### 1. Checkout and Order Completion

**Seed:** `tests/seed.spec.ts`

#### 1.1. Complete checkout with a standard user

**File:** `tests/saucedemo/checkout-complete-standard-user.spec.ts`

**Steps:**
  1. Start from a fresh browser context and navigate to https://www.saucedemo.com/.
    - expect: The Sauce Demo login form is displayed with Username, Password, and Login controls.
  2. Enter standard_user in Username and secret_sauce in Password.
    - expect: Both fields contain the supplied values.
  3. Click Login.
    - expect: The inventory page opens at /inventory.html.
    - expect: The Products heading and an empty cart are visible.
  4. Click Add to cart for any product, such as Sauce Labs Backpack.
    - expect: The selected product button changes to Remove.
    - expect: The cart count becomes 1.
  5. Click the selected cart icon at the top.
    - expect: The Your Cart page opens.
    - expect: The selected product is listed and the cart indicates one item.
  6. Click Checkout.
    - expect: The checkout information form opens at /checkout-step-one.html.
    - expect: First Name, Last Name, Postal Code, Continue, and Cancel controls are available.
  7. Enter prabha in First Name, sekar in Last Name, and 600037 in Postal Code.
    - expect: Each checkout field contains the supplied value.
  8. Click Continue.
    - expect: The Checkout: Overview page opens at /checkout-step-two.html.
    - expect: The selected product and order summary are displayed.
    - expect: The Finish control is available.
  9. Click Finish.
    - expect: The checkout completion page opens at /checkout-complete.html.
    - expect: The heading Thank you for your order! is visible.
    - expect: The message Your order has been dispatched, and will arrive just as fast as the pony can get there! is visible.
    - expect: The cart is empty.

#### 1.2. Checkout information required-field validation

**File:** `tests/saucedemo/checkout-required-fields.spec.ts`

**Steps:**
  1. Start from a fresh browser context, log in with standard_user and secret_sauce, add one product, open the cart, and click Checkout.
    - expect: The checkout information form is displayed.
  2. Leave First Name, Last Name, and Postal Code empty and click Continue.
    - expect: The user remains on the checkout information page.
    - expect: A validation message states First Name is required.
  3. Enter prabha in First Name, leave Last Name and Postal Code empty, and click Continue.
    - expect: A validation message states Last Name is required.
    - expect: The user remains on the checkout information page.
  4. Enter sekar in Last Name, leave Postal Code empty, and click Continue.
    - expect: A validation message states Postal Code is required.
    - expect: The user remains on the checkout information page.

#### 1.3. Empty-cart checkout guard

**File:** `tests/saucedemo/cart-empty-checkout.spec.ts`

**Steps:**
  1. Start from a fresh browser context, log in with standard_user and secret_sauce, and open the cart without adding a product.
    - expect: The Your Cart page is displayed with no products and no item count.
  2. Inspect the cart actions.
    - expect: Checkout is unavailable or cannot advance to the checkout information form while the cart is empty.
    - expect: No order completion page is reachable from the empty cart.
