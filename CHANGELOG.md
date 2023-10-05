# BAS Style Kit - Change log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased][unreleased]

## [0.7.0-alpha] - 2023-10-05

### Changed

* Breaking changes introduced by moving from Bootstrap 3 to Bootstrap 5
* See MIGRATION-NOTES.md

## [0.6.1] - 2021-03-16

### Fixed

* [Scripts] Incorrect version number in version plugin

## [0.6.0] - 2021-03-16

### Removed [BREAKING!]

* [Styles] EOT and SVG web font formats

### Added

* [Patterns] Markdown textarea
* [Infrastructure] Updating testbed to BSK Pug templates 0.6.0
* [Infrastructure] Project dependencies updated to latest versions

### Fixed

* [Patterns] Correcting item type header pattern name
* [Styles] Link colour in thumbnail attribution
* [Infrastructure] Missing distribution Zip file S3 upload

### Changed

* [Styles] Text colour in alerts changed to black rather than based on variant

### Removed

* [Infrastructure] Outdated Synk vulnerability scanning documentation

## [0.6.0-beta] - 2020-06-26

### Removed [BREAKING!]

* [Styles] DOI icon
* [Styles] Academicons

### Added

* [Patterns] ORCID iD component pattern
* [Patterns] Item type header page pattern
* [Infrastructure] Project dependencies updated to latest versions
* [Infrastructure] Adding merge request CI features
* [Infrastructure] Variants for Testbed patterns (e.g. removed)

### Fixed

* [Patterns] 'sign in' page patterns language inconsistency
* [Infrastructure] Reduced NPM package size by ~50%

### Changed

* [Project] Updating copyright holder to UKRI
* [Patterns] All page patterns now include contact information
* [Styles] Improving Address component in Testbed
* [Styles] Switching to Font Awesome ORCID icon
* [Infrastructure] Switched from Yarn 1 to Yarn 2, removing `node_modules` directory
* [Infrastructure] Imports to dependencies in `node_modules` directory have been changed to bundle dependencies directly
* [Infrastructure] Updating to newer predefined CI variables

### Removed

* [Infrastructure] Removing old BAS Packages Service jobs

## [0.6.0-alpha] - 2019-07-01

### Changed [BREAKING!]

* [Styles] Bottom margin on page titles has been been tripled to 60px
* [Infrastructure] Docker images for app and testbed no longer use a version

### Removed [BREAKING!]

* [Styles] Previously deprecated button input group, drop-down button input group and split-button input group component
* [Styles] Previously deprecated list group component
* [Styles] Previously deprecated inverse jumbotron component

### Added

* [Patterns] Item page component pattern
* [Patterns] Standard page header component pattern (cookie notice, navbar and development phase)
* [Patterns] Start page (basic) pattern
* [Patterns] Start page (more information) pattern
* [Patterns] Start page (before you start) pattern
* [Patterns] Start page (microsoft-sign-in) pattern
* [Patterns] Sign In page (microsoft) pattern
* [Styles] Microsoft account button variant using Microsoft pictogram
* [Styles] Stacked page title variant for item pages
* [Infrastructure] Updating app and testbed NPM dependencies to latest versions
* [Infrastructure] Instructions for calculating SRI values manually

### Changed

* [Styles] Updated to Font Awesome 5.9.0
* [Styles] Removed border from Thumbnails

## [0.5.0] - 2018-11-28

* No changes

## [0.5.0-beta] - 2018-11-23

### Removed [BREAKING!]

* [Styles] Warning validation status no longer supported

### Added

* [Patterns] Problem with this service (basic) pattern
* [Patterns] Problem with this service (contact) pattern
* [Patterns] Problem with this service (alternative) pattern
* [Patterns] Service unavailable (basic) pattern
* [Patterns] Service unavailable (contact details) pattern
* [Patterns] Service unavailable (known availability) pattern
* [Patterns] Service unavailable (alternative service) pattern
* [Patterns] Service unavailable (partly closed) pattern
* [Patterns] Service unavailable (closed) pattern
* [Patterns] Service unavailable (replaced) pattern
* [Styles] Variable for additional BAS facility colour
* [Styles] Styles for tab nav component based on GDS Design System
* [Styles] Styles for pop-over component based on other existing components
* [Admin] Additional guidance on creating pattern variants in the Testbed

### Fixed

* [Styles] Overriding default favicon in the favicon testbed sample
* [Styles] Updating testbed samples using icons for decoration to use Font Awesome 5
* [Styles] Including EPS logos in distribution package
* [Infrastructure] Added missing Synk organisation environment variable

### Changed

* [Styles] Error pages now implemented using Pug template views
* [Styles] Refining and error validation styles changed
* [Styles] Refining success and error validation styles
* [Styles] Improving footer layout at medium screen sizes
* [Styles] Updating to latest Pug Templates (0.2.0) for Testbed
* [Admin] Adopting official identifier for OGL licence

## [0.5.0-alpha] - 2018-09-14

### Removed [BREAKING!]

* [Styles] Bootstrap 'well' component
* [Styles] Font Awesome icon font - due to licensing constraints bundling Font Awesome 5 Pro into a theme
* [Infrastructure] NPM package named changed to a scoped package (`@antarctica/bas-style-kit`)

### Added

* [Patterns] First pattern for 'page not found' pages, with associated Testbed changes
* [Styles] Variables for BAS theme colours
* [Styles] Variables for BAS facility colours
* [Styles] Source EPS files for BAS roundal and logo
* [Styles] BAS Favicon based on the inverse BAS roundel
* [Scripts] Sortable list/table component using HTML5 Sortable
* [Scripts] 'Drop-zone' component using Dropzone.js
* [Scripts] Plugin for reporting the version of the Style Kit within the browser through JavaScript
* [Scripts] Buttons plugin adapted from Bootstrap plugin
* [Scripts] Tabs (Navs) plugin adapted from Bootstrap plugin
* [Scripts] Tool-tip plugin adapted from Bootstrap plugin
* [Scripts] Pop-overs plugin adapted from Bootstrap plugin
* [Scripts] Transitions plugin adapted from Bootstrap plugin
* [Infrastructure] Updating app and testbed NPM dependencies to latest versions
* [Infrastructure] Snyk dependency scanning for NodeJS dependencies
* [Infrastructure] Error (404) page for testbed

### Fixed

* [Styles] Form input border pinned to a standard grayscale colour
* [Styles] Documenting the backlog development phase is custom
* [Styles] Clarifying in the forms testbed mixin how the first example of an input is unstyled
* [Styles] Correcting how validation classes for testing validation states are applied in the forms testbed mixin
* [Admin] Removed duplicate issue tracking section
* [Infrastructure] Passing the Style Kit version into Sass, rather than needing to specify it again
* [Infrastructure] Corrected NPM package publishing steps
* [Infrastructure] Ignoring testbed form NPM package
* [Infrastructure] Corrected license in package definition
* [Infrastructure] Corrected typo in S3 bucket policy name
* [Infrastructure] Added root redirect for Testbed S3 bucket to master branch directory

### Changed

* [Styles] Adopting Pug templates for the testbed, replacing ad-hoc internal versions
* [Styles] Refactoring focus state for form inputs to act like the GDS styles but using our active component colour
* [Styles] Moving use of margin-top from alert component in preparation for Bootstrap 4
* [Scripts] Source files prefixed with numbers to ensure correct build order
* [Admin] Moving colour swatch posters into a namespaced directory
* [Infrastructure] Updating release procedures
* [Infrastructure] Improving Dockerfiles
* [Infrastructure] Updated to latest Terraform and Terraform provider versions
* [Infrastructure] Setting Style Kit version in Gulp using `package.json`, rather than redeclaring
* [Infrastructure] Style Kit version in `package.json` now uses `alpha/beta` not just `develop`

### Removed

* [Styles] Orphaned variables for the removed band component
* [Styles] Removing testbed samples for list groups, inverse jumbotrons and input group drop-down/split button menus

## [0.4.0] - 2018-07-06

### Added

* [Styles] Added `hr-dashed` HR variant
* [Styles] Added testbed sample for HR

### Fixed

* [Styles] URL to OGL symbol in footer governance component fixed
* [Infrastructure] Undefined lack of dependencies for review app CI task
* [Infrastructure] Missing output for SRI Gulp task
* [Infrastructure] Extra `develop` flag in Sass version variable

### Changed

* [Style] Length of governance statement shortened

## [0.4.0-beta] - 2018-05-23

### Added

* [Styles] Footer styles and samples for a Governance statement indicating BAS is part of NERC is part of UKRI
* [Styles] Testbed samples for contextual backgrounds, including experimental and primary variants
* [Styles] Testbed sample for experimental text
* [Styles] Testbed samples for footer 'is something wrong' and 'back to top' links
* [Styles] Adding 'is something wrong' and 'back to top' footer links to testbed pug footer include
* [Infrastructure] Gulp `watch` task to run `build` when a CSS or JS file is changed, for use with `docker-compose up`
* [Infrastructure] Gulp `watch` task to run `build` when a testbed file is changed, for use with `docker-compose up`

### Fixed

* [Styles] Visual alignment of dismissible cookie notices and navbars
* [Styles] Using footer components in various combinations
* [Styles] Structure of the navbar pug include used in the testbed index
* [Styles] Data attribute for cookie notice in testbed
* [Styles] Inline favicon for testbed
* [Styles] Fixing reference to OGL guidance
* [Infrastructure] Tagged releases were not being deployed to the BAS CDN

### Changed

* [Styles] Footer OGL styles updated to work with the added governance statement, now single line
* [Styles] Footer testbed samples updated
* [Styles] Added index of sample collections to testbed index
* [Styles] Tweaks to testbed index
* [Infrastructure] (App) Docker image entry point set to Gulp instead of nothing
* [Infrastructure] (Testbed) Docker image entry point set to Gulp instead of nothing
* [infrastructure] Gulp call removed from `cmd`, now done in entry point in (App) Docker image
* [infrastructure] Gulp call removed from `cmd`, now done in entry point in (Testbed) Docker image
* [Infrastructure] (App) Docker Compose server set to run `watch` task, for use with `docker-compose up`
* [Infrastructure] (Testbed) Docker Compose server set to run `watch` task, for use with `docker-compose up`
* [Infrastructure] Updated to latest Terraform and Terraform provider versions
* [Infrastructure] Updated to changed CDN and Packages Service bucket names
* [Admin] Project documentation revised and updated
* [Infrastructure] Switched to an ACM certificate for the testbed CloudFront distribution
* [Infrastructure] Adopting latest Terraform conventions for DNS record TTLs

## [0.4.0-alpha] - 2018-02-03 - BREAKING!

### Changed [BREAKING!]

* [Admin] This project is now duel licensed under the MIT (original bootstrap) and OGL (all other code) license
* [Styles] Deprecated band custom component removed
* [Styles] Header logo class refactored to a more generic header image class
* [Styles] Test (`tst`) and Special (`spc`) brand colours merged into an extended colour scheme
* [Infrastructure] All Gulp tasks rewritten and refactored to be simpler, giving significantly reduced file sizes
* [Infrastructure] Splitting 'app' Docker image into an 'app' and 'testbed' images
* [Infrastructure] Nginx moved into the testbed
* [Infrastructure] Updating Node dependencies to latest versions
* [Infrastructure] Updating support browser versions, IE 10 and Android 2.3 dropped
* [Infrastructure] Gulp is no longer a global package and must be called from within `node_modules`
* [Infrastructure] Replacing `gulp-util` package with `fancy-log` for logging in Gulp tasks
* [Infrastructure] `gulpfile.js` is now loaded at runtime within the app Docker image

### Removed [BREAKING!]

* [Infrastructure] Source map support

### Added

* [Admin] Project documentation on images
* [Styles] Styles for 'is something wrong with this page' link in footers
* [Styles] Specific styles for 'back to top' link in footers
* [Styles] Fix class for using a cookie notice alert with a navbar in a fluid width container
* [Infrastructure] jQuery and js-cookie as dependencies of the Style Kit's JS plugins
* [Infrastructure] StyleLint as an explicit dependency to remove Yarn dependency resolution warning
* [Infrastructure] Yarn lock file to ensure the same dependencies are used in CI

### Fixed

* [Styles] Correcting colour of dismiss icon in solid warning alerts
* [Styles] Repeating class name in jumbotron overlay styles
* [Styles] Import category for input group component
* [Resources] Correcting version specified in colour charts

### Changed

* [Admin] Updating project documentation
* [Styles] Active drop-down menus now use the same background colour as navbar drop-down active items (grey)
* [Infrastructure] Images compressed using external tool giving ~70% size reductions using indexed rather full RGB
* [Infrastructure] Switching docker file to Node 8 LTS (Carbon)
* [Infrastructure] Adding Yarn package manager to replace NPM
* [Infrastructure] No longer dependent on deprecated 'bas-aws' Docker image in CI/CD
* [Infrastructure] Reclassifying Bootstrap and web-fonts as dependencies rather than dev-dependencies in NPM package
* [Infrastructure] Rewriting CI tasks to install node modules before build tasks
* [Infrastructure] Updating to latest StyleLint configuration preset
* [Infrastructure] Tidying up Docker file
* [Infrastructure] Tidying up Node package file
* [Infrastructure] Updating to latest jQuery version (3.3.1)

### Removed

* [Infrastructure] Unused node dependencies
* [Infrastructure] Pager size sample as these classes don't exist

## [0.3.0] - 2018-01-09

### Added

* [Styles] Fix class for using a cookie notice alert with a navbar in a fixed width container

## [0.3.0-beta] - 2017-12-23

### Added

* [Scripts] Adding bootstrap-override for the Collapse plugin
* [Styles] Adding an extended colour scheme, currently made up of testing and special schemes but likely to be merged
* [Styles] Formalised navbar brand image classes for padding, extracted from Testbed styles
* [Styles] Conventional icon for back to top links
* [Styles] Minimum height for large navbars
* [Styles] Default padding for Jumbotron overlay text
* [Styles] Guidance on the use of fix classes
* [Styles] Testbed samples for contextual text classes

### Fixed

* [Styles] The maximum width of a container at the Full HD breakpoint was too large, causing an overflow
* [Styles] Setting HTML background colour to that used by the footer background, to ensure a consistent design
* [Styles] Experimental button hover font colour was too dark
* [Styles] Warning buttons font colour now matches alert warning variant (grey-darker)
* [Styles] Removing focus outline around non-interactive elements
* [Styles] Icons, headings and contents of alert blocks now align correctly
* [Styles] Inline labels used in forms in navbars now use a light font colour
* [Styles] Progress bars now use colours from the standard colour pallet
* [Styles] Inline code blocks now use colours from the standard colour pallet
* [Styles] Some testbed samples weren't using global prefix
* [Styles] Some testbed samples were incorrectly named
* [Infrastructure] Correcting path to project Docker image caused by change in repository URL
* [Infrastructure] Correcting other links referencing the old repository URL
* [Infrastructure] Font-faces were incorrectly stripped from minified styles
* [Infrastructure] Testbed font test styles incorrectly falled fallback fonts, potentially giving the impression they
were working when they weren't
* [Infrastructure] Minified styles were concatenated in the wrong order, placing Bootstrap styles after the Style Kit's

### Changed

* [Styles] The style and variant of an alert are now expressed as separate sets of classes
* [Styles] The base and block alert classes have been more clearly separated to make basic alerts simpler
* [Styles] Default alerts now use the base font size, a new large size has been added for the previous 120% font size
* [Styles] Opacity of dismissible alerts changed to be more visible (more opaque)
* [Styles] Conventional icon for dismissible alerts changed from `fa-times-circle` to `fa-times`
* [Infrastructure] Switching to GDS AWS-CLI image from our own version, should be no difference in functionality

## [0.3.0-alpha] - 2017-07-06 - BREAKING!

### Changed - BREAKING!

* [Styles] A common 'bsk-' prefix now applies to all class names, including variants and Bootstrap styles
* [Styles] `bas-style-kit.css` now contains all styles (inc. fonts and Bootstrap) as a single file
* [Styles] Classes for the standard grid are now styled `bsk-col-12-{breakpoint}-{width}`
* [Styles] Classes for the alternative grid are now styled `bsk-col-24-{breakpoint}-{width}`
* [Styles] The terms 'standard' and 'alternative' grid are now deprecated and should no longer be used
* [Styles] Refactoring all colour schemes (greyscale and colour) into a standard colour scheme (including
greyscale) based on colours from BAS/NERC, the GDS and Bootstrap - includes all contextual colours
* [Styles] Base font size increased from `14px` to `16px`
* [Styles] Image Purchase component replaced by new Image Copyright component
* [Styles] Removing override for large media breakpoint visibility classes, use `-lg` rather than `lg-x`
* [Styles] Minimum supported browser versions changed - I.E. 8 and 9 are no longer officially supported
* [Styles] Jumbotron text overlay class generalised to an overlay class (`bsk-jumbotron-overlay`)
* [Infrastructure] Gulp tasks for processing CSS styles have been refactored and updated
* [Infrastructure] Testbed styles are now compiled with other Style Kit styles with reference to variables etc.
* [Infrastructure] Font face declarations are now compiled as a separate `fonts-bsk.scss` file to avoid the common namespace
* [Infrastructure] `bas-style-kit.scss` renamed to `styles-bsk.scss` to fit with other files

### Removed - BREAKING!

* [Styles] `.navbar-brand-img-fix` class removed as it appears to be redundent
* [Infrastructure] Gulp watch tasks have been removed

### Added

* [Styles] Adding GDS colour pallets
* [Styles] Colours for GDS agile development phases (alpha, beta, etc.)
* [Styles] Styles for alerts, consisting of three variants (solid, outline and highlight) with three
* [Styles] Styles for labels
* [Styles] Label variants for the GDS agile development phases
* [Styles] Adding formal experimental style for labels, alerts, buttons, text-colour and background-colour
* [Styles] Adding testbed sample for responsive tables
* [Styles] Override styles for responsive utilities - this is considered a bug
* [Scripts] Adding bootstrap-override for the DropDown plugin
* [Scripts] Adding bootstrap-override for the Alerts plugin
* [Scripts] Adding CookieNotice plugin
* [Images] First set of images for the BAS Logo and BAS Roundel to provide a canonical/stable place to reference from
* [Images] Including OGL Symbol to provide a canonical/stable place to reference from
layouts (standard, block, static-top) for each contextual colour and a new primary alert
* [Infrastructure] Adding a permentant instance of the testbed through the testbed S3 bucket using the master branch
* [Infrastructure] Adding Gulp tasks for processing JavaScript files (linting)
* [Infrastructure] Gulp tasks for processing new fonts styles file
* [Infrastructure] Improve coverage of Jumbotron within the Testbed with additional samples
* [Infrastructure] Adding experiment heading class to Testbed classes
* [Infrastructure] Adding javascript heading class to Testbed classes
* [Infrastructure] Significantly improving NPM support
* [Infrastructure] Documenting GitHub mirror

### Fixed

* [Styles] Adding better support for input groups with input group buttons and dropdowns
* [Styles] Navbar styles for forms with buttons no longer sit lower than form elements
* [Styles] Rounded images are now correctly rounded
* [Styles] Correcting visibility samples to correctly hide or show elements
* [Styles] Navbar border variable set to the correct value, previously used '$navbar-color' incorrectly
* [Styles] Minimum height of the header component was half of its correct value
* [Styles] `$footer-ogl-text-max-height` corrected to `$footer-ogl-text-max-width`
* [Styles] Colours for the inverse jumbotron now use standard inverse component variables
* [Infrastructure] Correcting conventional icons in test alert samples
* [Infrastructure] Preventing review apps for tagged releases during CI
* [Infrastructure] Removing 'v' from version tags when publishing to the production CDN
* [Infrastructure] Correcting the name of some atomic Gulp tasks to make them consistent
* [Infrastructure] Correcting the name of the run sequence Gulp plugin to make it consistent
* [Infrastructure] Correcting dependent task for `atomic--sourcemaps-bootstrap-bsk` Gulp task
* [Infrastructure] Making grid macros suitable for both grid sizes
* [Infrastructure] The 'greyscale' colours in Bootstrap use 'gray' not 'grey', this was incorrect in the Testbed
* [Infrastructure] Invalid class attribute in BAS Style Kit 'colour' colour scheme
* [Infrastructure] Setting testbed sample/collection titles as page/HTML title
* [Infrastructure] Adding fake favicon for testbed to remove browser warnings

### Changed

* [Styles] Upgrading to Bootstrap SASS 3.3.7
* [Styles] Updating OGL Symbol styles to use usage guidlines
* [Infrastructure] Upgrading to NodeJS 8 and NPM 5
* [Infrastructure] Pinning 'Font Awesome' package to a specific version
* [Infrastructure] Upgrading NPM package dependencies
* [Infrastructure] Ignoring testbed sources from Git archives
* [Infrastructure] Updating location of spell checking settings due to plugin update
* [Infrastructure] Minor README file updates and clarifications
* [Infrastructure] Minor testbed layout changes
* [Infrastructure] Minor testbed content changes

## [0.2.0] - 2017-04-17

### Changed - BREAKING!

* [Infrastructure] Switching from Less to Sass preprocessor - compiled css remains compatible
* [Infrastructure] Gulp tasks heavily refactored
* [Infrastructure] Switching from 'develop/master' to 'master/tagged-master' branching model
* [Infrastructure] Semaphore CI/CD removed in favour of GitLab CI/CD
* [Infrastructure] Terraform environments removed in favour of a single set of configuration files

### Removed - BREAKING!

* [Infrastructure] Ansible provisioning removed
* [Style] Compiled CSS is no longer included in this project - download from the BAS CDN if this is needed
* [Documentation] Style Kit documentation is now maintained in an external project

### Added

* [Style] Page background and text colours are now explicitly listed as variables in this project (values are unchanged)
* [Infrastructure] Docker support using a project image and Docker compose
* [Infrastructure] Gulp tasks updated to support Docker workflow ('develop' task)
* [Infrastructure] Testbed added, using isolated samples to develop and preview styles
* [Infrastructure] SRI support for generated assets in a new 'process' CI stage

### Fixed

* [Style] Using brand images and text together were previously incompatible, a fix class address this
* [Style] Border radius on small/large form group inputs
* [Style] Padding on input group buttons to match height of inputs
* [Infrastructure] Wrong class name used for default buttons in testbed samples
* [Infrastructure] Language statistics in GitHub
* [Infrastructure] Names of BAS Package Service buckets
* [Infrastructure] Correcting name of `CHANGELOG.md` file

### Changed

* [Style] Font Awesome updated to 4.6
* [Style] Open-Sans web-font is now imported using its bundled Sass styles
* [Infrastructure] Using CSSNano instead of MinifyCSS to minify CSS styles
* [Infrastructure] README additions, improvements, refactoring and fixes
* [Infrastructure] Updating NPM modules
* [Infrastructure] Updating licensing file dates

### Removed

* [Infrastructure] Rsync related files, as these were never used as is now redundant due to Docker

## [0.1.0] - 2015-10-27

### Changed - BREAKING!

* [Styles] Linting tasks split out from other high level tasks to aid with split between CI and CD,
use `gulp lint` to run all linting tasks together
* [Documentation] URLs changed to meet WSF-1 (Hostnames and DNS records) standard
* [Documentation] A new method of hosting older documentation versions is used

### Added

* [Documentation] Jekyll plugin to show current revision in site footer if an environment variable is set
* [Infrastructure] Ansible Vault files and SSL certificates are now sourced from the BAS Credential Store project
* [Infrastructure] AWS CloudFront is added to the staging documentation static site, to support custom SSL
* [Infrastructure] Support for Continuous Integration and Continuous Deployment for production environments
* [Infrastructure] AWS S3 and CloudFront static website hosting used for production end-user documentation
* [Infrastructure] Continuous deployment added for copying distributed assets for each version to the BAS CDN

### Fixed

* [Documentation] CDN links in the basic template
* [Documentation] Repository URL links in the footer

### Changed

* [Styles] Less gulp tasks refactored to make them less repetitive, this also means they now rely on each other,
however if the `gulp less` task is run there should be no noticeable difference
* [Documentation] CDN links updated to new provider
* [Infrastructure] Developer documentation additions, improvements, refactoring and fixes
* [Infrastructure] README additions, improvements, refactoring and fixes - particularly environment requirements
* [Infrastructure] Jekyll Gem is now pinned to 2.5.3 to prevent version 3 being installed - this is a known issue

### Removed

* [Styles] Support for Glyphicons is now removed, having been previously deprecated
* [Infrastructure] Support for staging environments using DigitalOcean is removed, having been previously deprecated

## [0.1.0-beta] - 2015-10-16

### Changed - BREAKING!

* [Styles] Due to reaching the IE selector limit, it is now required to produce a customised Bootstrap build,
this will need to included wherever the Style Kit is used
* [Styles] The modified 24 column grid is removed in favour of the standard 12 column Bootstrap grid and optional
BSK 24 column grid. These grids can be used together (within rows, or nested), the 'extra large' breakpoint is
available in both grids
* [Infrastructure] AWS S3/Cloudfront backed CDN replaces Azure, CDN URLs have therefore changed

### Deprecated

* [Styles] Support for Glyphicons is deprecated in favour of Font Awesome, it will be removed in the next release
* [Infrastructure] Staging environments using DigitalOcean is deprecated in favour AWS S3 static website hosting

### Added

* [Styles] Gill Sans is now added for select elements (headings) and contexts (nav-bars) in line with the public
website and the BAS brand
* [Styles] The BAS brand colour is added as a Less variable for general use
* [Styles] Missing styles for BSK navbar variants
* [Infrastructure] Support for Continuous Integration and Continuous Deployment for staging environments
* [Infrastructure] AWS S3 static website hosting is now used for end-user documentation in the staging environment

### Fixed

* [Styles] Underlining in captions within inverted BSK thumbnails
* [Styles] Z-index for purchase symbol, now doesn't float over the top of navbars
* [Styles] Refining breakpoints for the image purchase component
* [Styles] Added additional styles for the extra-small breakpoint
* [Styles] WebStorm warnings about not implicitly referencing variables from other files in Less
* [Styles] Using `import (reference)` to import mixins rather than just `import`, this will have no noticeable effect
* [Documentation] Source download link updated to current release tag, not develop branch
* [Documentation] Corrected licensing text in the site footer

### Changed

* [Styles] Following feedback from Helpful Technology styles for tables, drop-downs and some colour variations updated
* [Styles] The BSK colour colour-scheme now includes the BAS brand colour, other blue shades are based off this colour
* [Styles] A border radius of 0 is now set to override the bootstrap default, the BSK specific variable has been removed
* [Styles] BSK buttons no longer have a border to match the style used on the public website
* [Styles] Light grey background added to BSK default buttons
* [Styles] Updating to Font Awesome 4.4
* [Styles] Rewriting footer breakpoints to be mobile first
* [Styles] Background of syntax highlighting sections in end-user documentation uses a shade of BSK grey shade
* [Styles] Proof of concepts for error pages have been moved to the scratch directory where they belong
* [Infrastructure] Significantly updating the developer documentation by refactoring sections from the README
* [Infrastructure] README additions, improvements, refactoring and fixes
* [Infrastructure] Jekyll variables are now set only in the main Jekyll `_config.yml` file

### Removed

* [Styles] `bsk-grey` and `bsk-grey-dark` have been removed from the BSK greyscale colour scheme
* [Styles] Unused variants of the OpenSans font family are removed to reduce download footprint
* [Styles] Support for SVG fonts is removed as all supported devices and browsers can use an alternative
* [Infrastructure] The `provisioned.yml` Jekyll data file is no longer needed (i.e. for provisioning)

## [0.1.0-alpha] - 2015-07-30

### Added

* Initial version - based on Bootstrap 3.3.5 and styles developed for the BAS Public Website
