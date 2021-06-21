# AddressBook

## Setup a development environment

```bash
git clone https://github.com/andrew-giangrant/address-book
cd address-book
yarn
yarn start
```

_App should start listening on `http://localhost:4200`_

# Solution Details

## File Structure

Each module of the app is organized under its own directory. In each module, there are separate directories for the types of classes with exception of modules and the app component. The `shared` module has components at the root level, but that would change if shared services were added.

## Jest over Karma

Karma does a better job at imitating a real web browser, but it's much slower than jest. In most cases, jest will provide just as good test coverage as Karma considering the speed increase.

## Use of adapters

While not the most inviting design pattern, adapters allow this particular project to expand quickly. Imagine there are 10 different APIs to fetch contacts from. This gives developers the ability to create adapters and provide them to the module without touching any of the components or existing services.

## Material Components

The use of Material components allows developers to move faster. A lot of the complex inputs are made fairly easy using the building blocks that Angular Material provides.

## Observables

Observables were implemented to anticipate that data may change from another source. It gives us the ability to anticipate those changes and render them to the DOM.

# Features

## Contact Card List

Contacts are listed left to right in small cards featuring their thumbnail image and first and last name.

## Search Filter

Using a lookahead regular expression, the search bar allows the user to find a contact based on first name, last name, email, cell, phone, street, city, and/or state.

## Contact Detail

In addition to the required first name, last name, phone number, the user can view the large image, cell, email, full address of the user.

## Routing

The home page of the app will redirect to `/contacts`, and any click on a contact card will redirect to `/contacts/<contact_id>`. Clicking on "Address Book" on the toolbar will go back to the contact list. Clicking on the back arrow will go back in the browser history.

# Things to Improve

1. Unit testing could cover more ground. Preferably, services would be entirely tested through the component tests.
2. Buttons and icons would be added as wrappers to shared components. This allows functionality and styling to exist in one area of the application. For example, a drop-down could become part of a button component which would be made available to any component using it.
3. The UI is very simplistic. It's fairly easy to get a few ideas by looking around at different UIs to compose a better feel. The solution right now has a very Material, generic feel to it.
4. There might be a better way to handle filtering between adapter and service. There are 3 non-nested loops. One for the mapping in the adapter, one for sorting in the service, and another for filtering in the service. Ideallly, we would want to combine those. It's not a performance issue with a personal address-book, but if this were a company address-book with 2 million contacts, we would need to consider that.
5. Customize-able sorting. This is already built into the service, but doesn't have a UI to complete the integration.
6. Theming! A personal address book would be better if user can choose their favorite colors.
7. Grouping for sorts. The correct sorting is by name. Normally there are some groupings on address books. For example, "G" for last names that start with "G", etc.
8. I have used 2-way data binding. It's not something that I promote. I prefer to do a uni-directional data flow.
9. Search bar would probably appear a little better if it were in the toolbar with a white font. There would need to be something to replace it on the details page, which is why the search bar is not there now.
10. End to end testing. I consider it just as valuable as unit tests. With end-to-end tests, it's possible to release much more quickly given the end-to-end tests are solid and stable. Each new feature and update needs to be part of the tests in order for it to have a powerful effect.
