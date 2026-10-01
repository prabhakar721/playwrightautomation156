# Sauce Demo Web Application Test Plan

## Application Overview

Functional and negative test coverage for https://www.saucedemo.com/ using fresh browser state for every scenario. The supplied standard_user credentials are used for authenticated flows; checkout uses representative customer information. Scenarios cover authentication, catalog browsing and sorting, product details, cart behavior, checkout validation and completion, session navigation, reset state, and order PDF control.

## Test Scenarios

### 1. Authentication

**Seed:** `tests/seed.spec.ts`

#### 1.1. Login with valid standard user credentials

**File:** `tests/saucedemo/auth-valid-login.spec.ts`

**Steps:**
  1. Start from a fresh browser context and navigate to https://www.saucedemo.com/.
    - expect: The Swag Labs login form is displayed with Username, Password, and Login controls.
  2. Enter username standard_user and password secret_sauce, then click Login.
    - expect: The user is redirected to /inventory.html.
    - expect: The Products view is displayed.
    - expect: The cart is empty.

#### 1.2. Reject locked-out user credentials

**File:** `tests/saucedemo/auth-locked-out.spec.ts`

**Steps:**
  1. Start from a fresh browser context and navigate to https://www.saucedemo.com/.
    - expect: The login form is displayed.
  2. Enter username locked_out_user and password secret_sauce, then click Login.
    - expect: The user remains on the login page.
    - expect: An error alert says: Epic sadface: Sorry, this user has been locked out.
    - expect: No inventory page is opened.

#### 1.3. Require username on empty login submission

**File:** `tests/saucedemo/auth-required-fields.spec.ts`

**Steps:**
  1. Start from a fresh browser context and navigate to https://www.saucedemo.com/.
    - expect: The login form is displayed.
  2. Leave Username and Password empty and click Login.
    - expect: The user remains on the login page.
    - expect: An error alert says: Epic sadface: Username is required.

#### 1.4. Logout clears the authenticated session

**File:** `tests/saucedemo/auth-logout.spec.ts`

**Steps:**
  1. Log in with standard_user and secret_sauce.
    - expect: The inventory page is displayed.
  2. Open the menu and click Logout.
    - expect: The user is redirected to the login page.
    - expect: The login form is displayed and authenticated inventory content is unavailable.

### 2. Catalog And Cart

**Seed:** `tests/seed.spec.ts`

#### 2.1. Browse products, sort catalog, and open product details

**File:** `tests/saucedemo/catalog-browse-sort-details.spec.ts`

**Steps:**
  1. Log in with standard_user and secret_sauce.
    - expect: The Products view shows six products and the Sort products control.
  2. Change sorting to Price (low to high), then Price (high to low), then Name (Z to A).
    - expect: The product order changes after each selection and matches the selected sort mode.
    - expect: The selected sort option remains visible in the control.
  3. Open the Sauce Labs Backpack product details.
    - expect: The product detail page shows Sauce Labs Backpack, its description, price $29.99, and Add to cart control.
    - expect: A Back to products control is available.

#### 2.2. Add and review an item in the cart

**File:** `tests/saucedemo/cart-add-review.spec.ts`

**Steps:**
  1. Log in and open the Sauce Labs Backpack details.
    - expect: The product detail page is displayed.
  2. Click Add to cart, then open the shopping cart.
    - expect: The cart badge shows one item.
    - expect: Your Cart shows quantity 1 and the Sauce Labs Backpack.
    - expect: The item price is $29.99 and Checkout and Continue Shopping controls are available.
  3. Click Continue Shopping.
    - expect: The user returns to the Products view.
    - expect: The cart still shows one item.

#### 2.3. Reset application state removes cart data

**File:** `tests/saucedemo/cart-reset-state.spec.ts`

**Steps:**
  1. Log in, add the Sauce Labs Backpack, and open the navigation menu.
    - expect: The cart badge shows one item and the menu is open.
  2. Click Reset App State.
    - expect: The cart badge becomes empty or zero.
    - expect: Previously added cart data is removed.
    - expect: The user remains authenticated and can continue browsing products.

### 3. Checkout

**Seed:** `tests/seed.spec.ts`

#### 3.1. Complete checkout for one product

**File:** `tests/saucedemo/checkout-complete.spec.ts`

**Steps:**
  1. Log in, add Sauce Labs Backpack, open the cart, and click Checkout.
    - expect: Checkout: Your Information is displayed with First Name, Last Name, Zip/Postal Code, Cancel, and Continue.
  2. Enter Ada, Lovelace, and 12345 in the checkout fields, then click Continue.
    - expect: Checkout: Overview is displayed.
    - expect: The order contains one item.
    - expect: Payment Information shows SauceCard #31337.
    - expect: Shipping Information shows Free Pony Express Delivery!.
    - expect: The totals show item total $29.99, tax $2.40, and total $32.39.
  3. Click Finish.
    - expect: Checkout: Complete! is displayed.
    - expect: Thank you for your order! is displayed.
    - expect: The order-dispatched message is displayed.
    - expect: The cart is empty.
    - expect: Back Home and Generate PDF order controls are available.

#### 3.2. Validate required checkout information

**File:** `tests/saucedemo/checkout-required-fields.spec.ts`

**Steps:**
  1. Log in, add Sauce Labs Backpack, open the cart, and click Checkout.
    - expect: Checkout: Your Information is displayed.
  2. Leave all checkout fields empty and click Continue.
    - expect: The user remains on the checkout information page.
    - expect: A validation error identifies the required first name field.
  3. Enter a first name but leave Last Name and Zip/Postal Code empty, then click Continue.
    - expect: The user remains on the checkout information page.
    - expect: A validation error identifies the next missing required field.

#### 3.3. Cancel checkout returns to the previous shopping view

**File:** `tests/saucedemo/checkout-cancel.spec.ts`

**Steps:**
  1. Log in, add Sauce Labs Backpack, open the cart, and click Checkout.
    - expect: Checkout: Your Information is displayed.
  2. Click Cancel.
    - expect: The user returns to the cart or prior shopping view according to the application flow.
    - expect: The cart item remains available and checkout is not completed.

#### 3.4. Generate PDF order control is available after completion

**File:** `tests/saucedemo/checkout-pdf-control.spec.ts`

**Steps:**
  1. Complete a valid one-item checkout using standard_user, Ada Lovelace, and postal code 12345.
    - expect: Checkout: Complete! is displayed.
  2. Click Generate PDF order.
    - expect: A PDF order document is generated or downloaded.
    - expect: The completion page remains usable and the order confirmation remains visible.

### 4. Navigation And Session

**Seed:** `tests/seed.spec.ts`

#### 4.1. Navigate between all items and product details

**File:** `tests/saucedemo/navigation-all-items.spec.ts`

**Steps:**
  1. Log in with standard_user and secret_sauce and open a product detail page.
    - expect: A product detail page is displayed.
  2. Click Back to products.
    - expect: The Products view is displayed with the catalog available.
  3. Open the navigation menu and click All Items.
    - expect: The user is on the Products view.
    - expect: The catalog is available without losing the authenticated session.

#### 4.2. Open About link from the navigation menu

**File:** `tests/saucedemo/navigation-about.spec.ts`

**Steps:**
  1. Log in and open the navigation menu.
    - expect: The menu shows an About link.
  2. Click About.
    - expect: The Sauce Labs About destination opens successfully.
    - expect: The navigation does not produce a broken or blank page.
