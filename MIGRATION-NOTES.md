# BAS style kit update to BootStrap 5 - migration notes

Bootstrap 5 migration documentation: [https://getbootstrap.com/docs/5.2/migration/](https://getbootstrap.com/docs/5.2/migration/)

# BAS style kit is based on Bootstrap 5.2.3 
`https://getbootstrap.com/docs/5.2/getting-started/introduction/`

# Cookie notice
- Plugin provided by https://orestbida.com/demo-projects/cookieconsent/
- Config: assets/javascripts/bas-style-kit/1_cookie-notice.js

Need to finish cookie-notice.pug

# Interactive
- For popovers & tooltips
- Use of extra-styles.js without the `.bsk-` prefix `assets/stylesheets/styles-extra.scss`

# General
- BAS style kit prefixes `bsk-` to Bootstrap 5 classes
- assets/stylesheets/custom/ contains the necessary styles from the old style kit
- assets/stylesheets/mixins/custom/ contains the necessary mixins from the old style kit


# Added
- assets/javascripts/bootstrap-bsk
- assets/javascripts/bootstrap-modules
- assets/stylesheets/bas-style-kit/custom/
- assets/stylesheets/mixins/custom/
- assets/stylesheets/bootstrap/forms/
- assets/stylesheets/bootstrap/helpers/
- assets/stylesheets/bootstrap/utilities/
- assets/stylesheets/bootstrap/vendor/
- assets/stylesheets/bas-style-kit-extra/


# Removed
- assets/javascripts/bootstrap-overrides
- assets/stylesheets/bas-style-kit/patterns
- assets/stylesheets/bootstrap-overrides
- 24 column grid & 12 column grid syntax. 24 column grid removed. E.g. `bsk-col-24-md-4`, `bsk-col-12-md-4`. Now just use `bsk-col-md-4` for example
- column size xs-* replaced with xs- E.g. `bsk-col-xs-6` is now `bsk-col-6`
- Transition


# Changed
- Development webserver is now GoStatic: `https://hub.docker.com/r/pierrezemb/gostatic`
- 12 & 24 column grid - replaced with a standard 12 column grid.

- For screen readers - `a.bsk-sr-only.bsk-sr-only-focusable` changed to `a.bsk-visually-hidden-focusable`
- Inline lists - `li:` changed to `li.bsk-list-inline-item:`
- BAS navbar `nav.bsk-navbar` changed to `nav.bsk-navbar.bsk-navbar-expand-md.bsk-navbar-dark.bsk-bg-dark`
- Display properties - `https://getbootstrap.com/docs/5.2/utilities/display/`

- bsk-navbar-header 
    - remove bsk-navbar-header div
    - swap brand & collapse-trigger so the trigger is the last element

## Pug code

- Caret
    - `bsk-caret` - Removed

- Dropdowns - `https://getbootstrap.com/docs/5.2/components/dropdowns/`
    - `button`
    ```   
    button.bsk-btn.bsk-btn-default.bsk-dropdown-toggle(data-toggle='dropdown' type='button')
    | Dropdown #[span.bsk-caret]
    ``` 

    - - changed to -  
    ```   
    button.bsk-btn.bsk-btn-primary.bsk-dropdown-toggle(type='button' data-bs-toggle='dropdown' aria-expanded='false')
    | Dropdown
    ```

    - `li`
    ```   
    li: a(href='#') Action
    ``` 

    - - changed to -  
    ```   
    li: a.bsk-dropdown-item(href='#') Action
    ```

    - reversed - drop-up
    ```   
    class='app-simulated-state-open'
    ``` 

    - - changed to -  
    ```   
    class='app-simulated-state-open app-simulated-state-open-dropup'
    ```

    - divider
    ```   
    li(role='separator').bsk-divider
    ``` 

    - - changed to -  
    ```   
    li 
        hr.bsk-dropdown-divider
    ```

    - header
    ```   
    li.bsk-dropdown-header Dropdown header
    ``` 

    - - changed to -  
    ```   
    li
        h6.bsk-dropdown-header Dropdown header
    ```

    - active item
    ```   
    li.bsk-active: a(href='#') Active action
    ``` 

    - - changed to -  
    ```   
    li
        a.bsk-dropdown-item.bsk-active(href='#' aria-current='true') Active action
    ```

    - disabled item
    ```   
    li.bsk-disabled: a(href='#') Disabled action
    ``` 

    - - changed to -  
    ```   
    li
        a.bsk-dropdown-item.bsk-disabled(href='#' tabindex='-1' aria-disabled='true') Disabled action
    ```

    - right aligned
    ```   
    bsk-dropdown-menu-right
    ``` 

    - - changed to -  
    ```   
    bsk-dropdown-menu-end
    ```

Dropdowns in navbars usally require the `navbar-expand` class.  

Screen readers - `https://getbootstrap.com/docs/5.2/helpers/visually-hidden/`

    - `span bsk-sr-only`
    ```   
    span.bsk-sr-only Toggle Dropdown
    ``` 

    - - changed to -  
    ```   
    span.bsk-visually-hidden Toggle Dropdown
    ```

- Forms - `https://getbootstrap.com/docs/5.2/forms/overview/`
    ```   
    form
      fieldset.bsk-form-group
        div(class=type_class)
          label.bsk-control-label
            input(type=input_type name='example-1' id='example-1-a' value='A')
            | Option 1 (A)
        div(class=type_class)
          label.bsk-control-label
            input(type=input_type name='example-1' id='example-1-b' value='B')
            | Option 1 (B)
        div(class=type_class)
          label.bsk-control-label
            input(type=input_type name='example-1' id='example-1-c' value='C')
            | Option 1 (C)
    ``` 

    - - changed to -  
    ```   
    form
      fieldset.bsk-form-group
        div(class=type_class)
          input.bsk-form-check-input(type=input_type name='example-1' id='example-1-a' value='A')
          label.bsk-form-check-label(for='example-1-a')
            | Option 1 (A)
        div(class=type_class)
          input.bsk-form-check-input(type=input_type name='example-1' id='example-1-b' value='B')
          label.bsk-form-check-label(for='example-1-b')
            | Option 1 (B)
        div(class=type_class)
          input.bsk-form-check-input(type=input_type name='example-1' id='example-1-c' value='C')
          label.bsk-form-check-label(for='example-1-c')          
            | Option 1 (C)
    ```

    - Also note changes for inline form elements
    ```
    <div class="bsk-form-check bsk-form-check-inline">
      <input type="checkbox" name="form-checkbox-example-2" id="form-checkbox-example-2-a" value="A">
      <label class="bsk-control-label">
          Option 1 (A)
      </label>
    </div>
    ```




- Lists - `https://getbootstrap.com/docs/5.2/components/list-group/`
    - `li`
    ```   
    li Popcorn
    ``` 

    - - changed to -  
    ```   
    li.bsk-list-inline-item Popcorn
    ```

- Navbar - `https://getbootstrap.com/docs/5.2/components/navbar/`
    ```   
    nav.bsk-navbar
        div.bsk-container-fluid
            div.bsk-navbar-header
                button.bsk-navbar-toggle.bsk-collapsed(type='button' data-toggle='collapse' aria-expanded='false')
                span.bsk-sr-only Toggle navigation
                span.bsk-icon-bar
                span.bsk-icon-bar
                span.bsk-icon-bar
    ``` 

    - - changed to -  
    ```   
    nav.bsk-navbar.bsk-navbar-dark.bsk-bg-dark
        div.bsk-container-fluid
            div.bsk-navbar-header
                button.bsk-navbar-toggler.bsk-collapsed(type='button' data-bs-toggle='collapse' aria-expanded='false')
                span.bsk-visually-hidden Toggle navigation
                span.bsk-navbar-toggler-icon
    ```

- Navbar toggle - `https://getbootstrap.com/docs/5.2/components/navbar/#toggler`
    ```   
    button.bsk-collapsed(type='button' data-toggle='collapse' aria-expanded='false')
        span.bsk-sr-only Toggle navigation
        span.app-bsk-icon-bar
        span.app-bsk-icon-bar
        span.app-bsk-icon-bar
    ``` 
    - - changed to -  
    ```   
    button.bsk-collapsed.bsk-navbar-toggler(type='button' data-bs-toggle='collapse' aria-expanded='false')
        span.bsk-visually-hidden Toggle navigation
        span.bsk-navbar-toggler-icon
    ```

- Navbar items align - 
    - right - 
    ```   
    ul.bsk-nav.bsk-navbar-nav.bsk-navbar-right
    ``` 
    - - changed to -  
    ```   
    ul.bsk-nav.bsk-navbar-nav.bsk-ms-auto
    ```

- Nav - `https://getbootstrap.com/docs/5.2/components/navbar/#nav`
    ```   
    nav(role='navigation')
      ul.bsk-nav(class!=attributes.class role='tablist')
        li(role='presentation'): a(href='#') nav 1
        li(role='presentation'): a(href='#') nav 2
        li(role='presentation'): a(href='#') nav 3
    ``` 

    - - changed to -  
    ```   
    nav(role='navigation')
      ul.bsk-nav(class!=attributes.class role='tablist')
        li.bsk-nav-item(role='presentation'): a(href='#') nav 1
        li.bsk-nav-item(role='presentation'): a(href='#') nav 2
        li.bsk-nav-item(role='presentation'): a(href='#') nav 3
    ```

- Offset columns - `https://getbootstrap.com/docs/5.2/layout/columns/#offsetting-columns`
    ```   
    div.bsk-col-12-md-offset-9.bsk-col-12-md-3
    ``` 

    - - changed to -  
    ```   
    div.bsk-offset-md-9.bsk-col-md-3
    ```

- Pagination - `https://getbootstrap.com/docs/5.2/components/pagination/`
    ```   
    nav
      ul.bsk-pagination(class!=attributes.class)
        li: a(href='#') First
        li: a(href='#') Last
    ``` 

    - - changed to -  
    ```   
    nav
      ul.bsk-pagination(class!=attributes.class)
        li.bsk-page-item: a.bsk-page-link(href='#') First
        li.bsk-page-item: a.bsk-page-link(href='#') Last
    ```

- Popovers - `https://getbootstrap.com/docs/5.2/components/popovers/`
    ```   
    button.bsk-btn.bsk-btn-default(
    type='button'
    data-toggle='popover'
    data-placement=direction
    data-content='Popover content'
    style=style
    title='popover on the right'
    )
    ``` 

    - - changed to -  
    ```   
    button.bsk-btn.bsk-btn-default(
    type='button'
    data-bs-toggle='popover'
    data-bs-placement=direction
    data-bs-content='Popover content'
    style=style
    title='popover on the right'
    )
    ```

---

- Float - `https://getbootstrap.com/docs/5.2/utilities/float/`
    ```   
    bsk-pull-left
    ``` 
    - - changed to -  
    ```   
    bsk-pull-start
    ```
    ```   
    bsk-pull-right
    ``` 
    - - changed to -  
    ```   
    bsk-pull-end
    ```

- Centered elements - `https://getbootstrap.com/docs/5.2/utilities/position/#center-elements`
    ```   
    div.bsk-center-block.app-visible-col-1(style="width:40%")
    ``` 
    - - changed to -  
    ```   
    div.bsk-position-absolute.bsk-top-50.bsk-start-50.bsk-translate-middle.app-visible-col-1(style="width:40%")
    ```


- Display visibility, hidden elements - `https://getbootstrap.com/docs/5.2/utilities/display/`
    ```   
    div.app-visible-col-2.bsk-hidden
    ``` 
    - - changed to -  
    ```   
    div.app-visible-col-2.bsk-d-none
    ```

    ```   
    span.bsk-hidden-xs.bsk-text-muted
    ``` 
    - - changed to -  
    ```   
    span.bsk-d-none.bsk-d-sm-block.bsk-text-muted
    ```

- Table condensed
    ```   
    bsk-table bsk-table-condensed
    ``` 
    - - changed to -  
    ```   
    bsk-table bsk-table-sm
    ```

- Inputs - Radio & Checkbox - `https://getbootstrap.com/docs/5.2/forms/checks-radios/`
- Radio button input***
    ```   
    'radio', 'bsk-radio'
    ``` 
    - - changed to -  
    ```   
    'radio', 'bsk-form-check'
    ```

- Checkbox input ***
    ```   
    'checkbox', 'bsk-checkbox'
    ``` 
    - - changed to -  
    ```   
    'checkbox', 'bsk-form-check'
    ```

- Footer
    ```   
    div.bsk-footer-policy-links
        ul.bsk-list-inline
          li: a(href='#') Copyright
          li: a(href='#') Privacy
          li: a(href='#') Cookies
        | © (Year) British Antarctic Survey
    ``` 
    - - changed to -  
    ```   
    div.bsk-footer-policy-links
        ul.bsk-list-inline
          li.bsk-list-inline-item: a(href='#') Copyright
          li.bsk-list-inline-item: a(href='#') Privacy
          li.bsk-list-inline-item: a(href='#') Cookies
        | © (Year) British Antarctic Survey
    ```

- Progress bars - issue with colours - they are too faint if the `@include bg-variant('.bg-primary', $brand-primary);` colours from _type.scss are used.
    ```   
    bsk-progress-bar-success
    ``` 
    - - changed to -  
    ```   
    bsk-bg-success
    ```

    ```   
    bsk-progress-bar-warning
    ``` 
    - - changed to -  
    ```   
    bsk-bg-warning
    ```

        ```   
    bsk-progress-bar-danger
    ``` 
    - - changed to -  
    ```   
    bsk-bg-danger
    ```

        ```   
    bsk-progress-bar-info
    ``` 
    - - changed to -  
    ```   
    bsk-bg-info
    ```