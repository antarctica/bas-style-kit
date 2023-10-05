# BAS Style Kit

A collection of HTML, CSS, and JS components for developing web projects consistent with the BAS brand.

This README covers how this project is developed, see the [end-user documentation](https://style-kit.web.bas.ac.uk) for
what the Style Kit contains and how it use it.

## Overview

The BAS Style Kit is a CSS and JavaScript framework, incorporating the BAS brand to establish a consistent visual
design across BAS services and websites. It aims to build-in technical and accessibility best practices where practical.

The Style Kit is based on the official Sass port of [Bootstrap 3](http://getbootstrap.com) and consists of:

* BAS colour schemes and fonts
* customised version of the Bootstrap framework (using Sass variable overrides)
* custom variants of Bootstrap components
* additional components inspired by other frameworks or organisations
* design patterns (see below)

### Patterns

Design patterns are used to demonstrate preferred ways to pass on information to users, or ask them for information.
For example, information to show when a service is unavailable, formatting dates consistently or asking users for their
username in a consistent way.

Patterns should be based on evidence for their effectiveness, for common patterns evidence from organisations such as
GDS and other government departments should be strongly considered, for BAS/NERC use-cases, local research should be
conducted, though it is accepted this will be less developed than general use-cases.

Examples of each pattern are listed in the [Testbed](#testbed). For released patterns, these form reference examples to
aid their implementation in themes and templates, or use directly by copying the design/markup.

## Usage

These instructions show how to setup a development environment for the Style Kit.
See [style-kit.web.bas.ac.uk](https://style-kit.web.bas.ac.uk) for end-user documentation.

### Docker Compose

Source code for this project is available from two repositories:

* [BAS GitLab](https://gitlab.data.bas.ac.uk/web-apps/bsk/bas-style-kit) (canonical, private)
* [BAS GitHub](https://github.com/antarctica/bas-style-kit) (read-only mirror, public)

To create a local development environment using the *GitLab* repository [1]:

```
$ git clone https://gitlab.data.bas.ac.uk/web-apps/bsk/bas-style-kit.git
$ cd bas-style-kit/
$ docker-compose pull
$ docker-compose up
```

To create a local development environment using the *GitHub* repository:

```
$ git clone https://github.com/antarctica/bas-style-kit.git
$ cd bas-style-kit/
$ docker-compose build
$ docker-compose up
```

This will launch three containers:

1. `app` - runs the Gulp `watch` task to build the Style Kit's components (CSS, JS, etc.)
2. `testbed` - runs the Gulp `watch` task to build the Style Kit's Testbed (samples, etc.)
3. `web` - hosts the Testbed as a static website using Nginx

See the [Gulp tasks](#gulp-tasks) and [Testbed](#testbed) sections for more information on what these containers do.

Visit [localhost:9000](http://localhost:9000) to access a local version of the Testbed.

**Note:** On first run you will need to run these commands to generate Style Kit assets and the Testbed locally:

These are Gulp commands - see `gulpfile.js`

```
$ docker-compose run app build
$ docker-compose run app copy

$ docker-compose run testbed build
$ docker-compose run testbed copy
```

[1] If you have access to the [BAS GitLab](https://gitlab.data.bas.ac.uk) instance, you will need to authenticate to use
the BAS private Docker registry initially:

```shell
$ docker login docker-registry.data.bas.ac.uk
```

### Gulp tasks

The [Gulp](http://gulpjs.com/) task runner is used for copying font files, compiling Sass to CSS, compiling templates,
etc.

* see `gulpfile.js` for tasks available in the `app` container
* see `testbed/gulpfile.js` for tasks available in the `testbed` container

#### Running tasks

To run a gulp task `foo` in the `app` container:

```shell
$ docker-compose run app foo
```

To run a gulp task `foo` in the `testbed` container:

```shell
$ docker-compose run testbed foo
```

For example, to run all linting tasks in the `app` container:

```shell
$ docker-compose run app lint
```

#### Watch tasks

A `watch` task is included in both the `app` and `testbed` Gulpfiles. These watch for changes to inputs to their
respective build tasks, and run them automatically.

I.e. If a change is made to a Sass file or Testbed sample, the `watch` task will run the `build` task automatically.

These tasks run continuously with `docker-compose up`. Use `ctrl+c` to stop them.

### SRI

[Sub-Resource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) is a
security feature using file hashing to prevent remote resources (for example, from a CDN) being poisoned.

A Gulp task, `sri`, in the `app` container, is used to compute values for Style Kit assets, saving them to a JSON file.

If SRI values need to be calculated manually:

```
$ docker-compose run --entrypoint="" app ash
$ apk update
$ apk add openssl
$ openssl dgst -sha256 -binary [file] | openssl base64 -A
$ exit
```

For example:

```
$ docker-compose run --entrypoint="" app ash
$ apk update
$ apk add openssl
$ openssl dgst -sha256 -binary dist/css/bas-style-kit.css | openssl base64 -A
> Qb7inHp6i7iH2aWYv1LLe3N5x+Eu93lwo5mKzNAxkoo=/usr/src/app
$ exit
```

**Note:** Currently there is no ideal place, or automated process, to host SRI values. This is considered a
[bug](https://trello.com/c/NebCWKex).

### Testbed

To aid developing and testing the Style Kit, a *Testbed* is included. It consists of a number of atomic *samples* and
reference implementations of *patterns*.

Samples are designed to isolate individual styles to check for regressions or ensure various components fit together
well. [Patterns](#patterns) are best practice design solutions for specific user-focused tasks and page types.

When running locally, the testbed can be accessed at [localhost:9000](https://localhost:9000).

A hosted instance of the testbed for the *master* branch is available at:
[style-kit-testbed.web.bas.ac.uk/master](https://style-kit-testbed.web.bas.ac.uk/master).

### Patterns (Testbed)

The Testbed includes released patterns, where they act as reference implementations, as well as patterns under
development. For each pattern, multiple variants may be listed to show different use-cases or test different designs.

Patterns are numbered, but these do not imply any order, and may not be congruous for the variants of each pattern. For
example variants for the 'service unavailable' pattern may be numbered *0001*, *0003*, *0030* and *0500*. Where a
pattern has been removed, its number will not be reused. Pattern variants will each be numbered separately.

Pattern files **MUST** be named as `testbed/src/patterns/[pattern number]--[pattern label].pug` where:

* `[pattern number]` is the next highest pattern number (i.e. if the last sample was 5 the next would be 6)
* `[pattern label]` a hyphenated label for the pattern expressed from least to most specific (e.g.
  `service-unavailable-planned` not `planned-service-unavailable`)

Patterns use the [Pug](https://pugjs.org/api/getting-started.html) (formally Jade) template engine to wrap each pattern
in a lightweight layout to include a local version of the Style Kit for testing.

This layout exposes a `pattern` block to contain each pattern's content.

A minimal pattern would look like:

```pug
//-
  pattern:
    title: Pattern title
  ---

extends ../layouts/app-pattern-page.pug

block pattern
  ul
    li example list item
```

A minimal pattern variant would look like:

```pug
//-
  pattern_variant:
    title: Pattern variant title
  pattern:
    title: Pattern title
  ---

extends ../layouts/app-pattern-page.pug

block pattern
  ul
    li example list item
```

See the other pattern sub-sections for more information on different aspects of a sample.

A Gulp task, `build`, in the `testbed` container, is used to generate pattern variants, indexes and assets.

#### Pattern labels and titles

Each pattern will have a *label* (taken from the pattern file name) and *title* (taken from the pattern front matter),
following the same conventions as [Sample labels and titles](#sample-label-and-title).

#### Pattern variants

Patterns may consist of multiple variants, representing differences in circumstance or context but part of a general
use case / purpose. For example, a 'service unavailable' pattern may include variants for services unavailable
unexpectedly or due to planned maintenance. In both situations the same general information will be shown, with some
extra details for planned maintenance, such as a duration.

Pattern variants are related to a pattern using the `pattern.title` [Front matter](#pattern-front-matter) option. For
example:

| `pattern.title`       | `pattern_variant.title`           | Notes                       |
| --------------------- | --------------------------------- | --------------------------- |
| "Service unavailable" | "Service unavailable (basic)"     | Generic variant of pattern  |
| "Service unavailable" | "Service unavailable (planned)"   | Specific variant of pattern |
| "Service unavailable" | "Service unavailable (unplanned)" | Specific variant of pattern |

The pattern index will automatically group pattern variants together as a list.

#### Pattern front matter

Each pattern **MUST** include some metadata to help organise and classify patterns.

| Property                | Description                                        | Required                 | Example Value                   | Notes                                     |
| ----------------------- | -------------------------------------------------- | ------------------------ | ------------------------------- | ----------------------------------------- |
| `pattern`               | Container for properties about the pattern         | Yes                      | *N/A*                           | -                                         |
| `pattern.title`         | A short title for the pattern                      | Yes                      | "Service unavailable"           | Use most readable form, opposite of label |
| `pattern_variant`       | Container for properties about the pattern variant | No                       | *N/A*                           | Only used for pattern variants            |
| `pattern_variant.title` | A short title for the pattern variant              | Yes (if pattern variant) | "Service unavailable (planned)" | Only used for pattern variants            |

**Note:** For a property, wild cards (`*`), represent an item in a list.

**Note:** For a property, dots (`.`) represent an indented level - e.g. `foo.bar` should be expressed as:

```
foo:
  bar:
```

### Samples

Most samples are used to demonstrate valid, real-world, uses, however some are intended to prove a rule by offering an
exception. Other types of samples (*experiments*) are used to trail different possibilities to find which works best.

Samples are numbered, but these do not imply any order, and may not be congruous for a set of related styles. For
example, samples for lists may be numbers *0001*, *0003*, *0030* and *0500*. Where a sample has been removed, its number
will not be reused.

Sample files **MUST** be named as `testbed/src/samples/[sample number]--[sample label].pug` where:

* `[sample number]` is the next highest sample number (i.e. if the last sample was 5 the next would be 6)
* `[sample label]` a hyphenated label for the sample expressed from least to most specific (e.g. `ul-unstyled` not
  `unstyled-ul`)

Samples use the [Pug](https://pugjs.org/api/getting-started.html) (formally Jade) template engine to wrap each sample
in a lightweight layout to include a local version of the Style Kit for testing.

This layout exposes a `sample` block to contain each samples content.

A minimal sample would look like:

```pug
//-
  sample:
    title: Sample title
  ---

extends ../layouts/app-sample.pug

block sample
  ul
    li example list item
```

A typical sample would look like:

```pug
//-
  sample:
    title: Unstyled list
    code: ul.bsk-list-unstyled
  collections:
    - core--lists
  ---

extends ../layouts/app-sample.pug
include ../mixins/app/samples/lists.pug
include ../mixins/app/samples/alerts.pug

block sample
  section.app-sample-section
    header Standard
    +alert('info', 'highlight')
      | Class is #[strong not] supported with ordered list.

    +ul-ol('ul')(class="bsk-list-unstyled")

  section.app-sample-section
    header Nested (not applied)
    +alert('info', 'highlight')
      ul
        li Class #[strong is] supported with nested unordered lists but will appear flattened.
        li Class is #[strong not] applied to nested lists.

    +ul-ol--nested('ul')(class='bsk-list-unstyled')
```

Within a sample, different examples **SHOULD** be separated into sections with a header to explain what it represents.
It is a judgement call whether a variation/example should be a section within a sample, or a sample in it's own right.

E.g.

```pug
section.app-sample-section
  header Section title

  <!-- ... -->
```

Where you find yourself repeating the same structure, but applying different classes or properties, consider using a
Mixin to keep code DRY.

Other conventions/patterns for samples can be found by reading existing samples. See the other sample sub-sections for
more information on different aspects of a sample.

A Gulp task, `build`, in the `testbed` container, is used to generate samples, collections, indexes and assets.

#### Sample label and title

Each sample will have a *label* (taken from the sample file name) and *title* (taken from the sample front matter) each
serving different functions.

The label:

* is designed to be structural
* is intended to move from most generic to most specific (as with a CSS class)
* this allows related samples to be 'grouped' by sorting on their label
* to be as concise as possible whilst being fully qualified and as precise/unambiguous as necessary
* to be URL safe and stable

The title:

* is designed for display
* is intended to be the most grammatically/stylistically correct form
* can be less concise, and/or less precise if this aids readability (not should not a description)
* to change if useful

For example, for three variants of an unordered list:

| Example | Variant                   | Label         | Title            |
| ------- | ------------------------- | ------------- | ---------------- |
| (1)     | Unordered list            | `ul`          | `Unordered list` |
| (2)     | Unordered list (unstyled) | `ul-unstyled` | `Unstyled list`  |
| (3)     | Unordered list (inline)   | `ul-inline`   | `Inline list`    |

In (1), `ul` is the most concise way to represent an Unordered List, but is not the most readable if you don't know
what `ul` means. In this case the title can expand on the name to be useful.

In (2) and (3), the label is more precise than the title (e.g. (2) a more precise title would be
`Unstyled unordered list`) but as you can't have an ordered unstyled list this extra qualifier isn't useful and can be
omitted from the title). It shouldn't be omitted from the label because if an ordered unstyled list was added in the
future, the original `ul-unstyled` label would either be unambiguous (and inconsistent) or would have to be renamed and
so not stable, breaking URLs for example. In contrast, the title of the `Unstyled list` could be trivially changed as
it's only meant to be a more readable form of the label, and not important by itself.

In (2) and (3) the title reverses the specificity (from least -> most to most -> least) because this is
grammatically/stylistically correct in English (but wouldn't in say French).

#### Sample collections

Groups of related samples are referred to as *Collections*. For example, ordered and unordered list samples are part of
a lists collection. Samples can be, but typically are not, part of multiple collections.

Collections consist of a label (name) only, and are generated by being listed within Samples. This means it is important
to use collection labels consistently.

For example, If sample sample A refers to a collection of lists as 'list' and Sample B as 'lists' both 'list' and
'lists' will be generated as collections with one item in each. Both need to be 'list' or 'lists' to work correctly.

#### Sample types

Each sample has a type, with a 'normal' type being assumed. If you are unsure which type to use, use normal.

| Type       | Type Property (For Metadata) | Description                           | Notes              |
| ---------- | ---------------------------- | ------------------------------------- | ------------------ |
| Normal     | *N/A*                        | -                                     | Assumed by default |
| Experiment | `experiment`                 | Use for non-stable samples            | -                  |
| Removed    | `removed`                    | Use for deprecated samples            | -                  |
| JavaScript | `javascript`                 | Use for samples relying on JavaScript | -                  |

For *Removed* samples, the contents **SHOULD** be removed (i.e. leaving it blank). A suitable message will be shown by
the layout.

For *Experiment* and *JavaScript* samples, a notes section **SHOULD** be added to give details on:

* (for experiments)
  * the purpose of the experiment, any relevant context (links to Trello are ok)
  * the details of the variants in an experiment (if relevant, e.g. a summary of the different sizes used)
  * other notes as relevant
* (for JavaScript)
  * any dependencies the sample relies on (e.g. the cookie banner relies on a Cookie management library)
  * any plugins from the Style Kit the sample relies on (including it's own if relevant)

#### Sample front matter

Each sample **MUST** include some metadata to help organise and classify samples.

| Property       | Description                                             | Required | Example Value    | Notes                                     |
| -------------- | ------------------------------------------------------- | -------- | ---------------- | ----------------------------------------- |
| `sample`       | Container for properties about the sample               | Yes      | *N/A*            | -                                         |
| `sample.title` | A short title for the sample                            | Yes      | `Unordered list` | Use most readable form, opposite of label |
| `sample.code`  | CSS selector representing the style of the sample       | No       | `ul`             | -                                         |
| `sample.type`  | A valid sample type                                     | No       | `experiment`     | Use *sample types* for valid options      |
| `collection`   | Container for properties about the sample's collections | No       | *N/A*            | -                                         |
| `collection.*` | The label for a collection the sample should appear in  | No       | `core--lists`    | -                                         |

**Note:** For a property, wild cards (`*`), represent an item in a list.

**Note:** For a property, dots (`.`) represent an indented level - e.g. `foo.bar` should be expressed as:

```
foo:
  bar:
```

For example (normal sample):

```
//-
  sample:
    title: Unordered list
    code: ul
  collections:
    - core--lists
  ---
```

For example (experiment sample):

```
//-
  sample:
    title: Unordered list
    type: experiment
```

#### Sample mixins

To prevent repeating common/similar code a number of [Mixins](https://pugjs.org/language/mixins.html) are available.

Most relate to a set of samples (e.g. the 'thumbnails' mixin is used in thumbnail related samples). Some mixins will
produce structural elements (such as sections and section headers), as well as examples of an element or style.

Mixins are stored in `testbed/src/mixins` and can be included in a sample using `include ...`

For example:

```pug
extends ../layouts/app-sample.pug
include ../mixins/app/samples/foo.pug

block sample
  section.app-sample-section
    +mixin-foo('optional-parameter')(class='optional-additional-attributes')
```

### Assets

The Testbed relies on local, development, versions of the Style Kit's styles and scripts, generated using the `build`
Gulp task in the `app` container.

The Testbed also has a limited set of styles and other assets of it's own (for things like the index of patterns/samples
and displaying the current responsive breakpoint) located in `testbed/src/assets/`. These assets are also generated
using the `build` Gulp task in the `testbed` container.

## Developing

### CSS Styles

CSS styles within the Style Kit are written using [Sass](http://sass-lang.com/), a CSS preprocessor offering features
such as variables, mixins and intuitive nesting.

The Style Kit is distributed as a single CSS file, but made up of multiple parts:

1. `assets/stylesheets/bootstrap-bsk.scss` - customised version of the Bootrstap 3 official Sass port
2. `assets/stylesheets/fonts-bsk.scss` - custom web-fonts used within the Style Kit
3. `assets/stylesheets/bas-style-kit.scss` - custom styles, components and variables that make up the Style Kit

Gulp is used to compile these styles into regular CSS, in one file. Additional tasks are used to:

* improve the compatibility of the generated CSS with older browsers, or for newer features requiring vendor prefixes
* add a global prefix, `bsk-` to all CSS classes to act as a namespace - i.e. `.foo` becomes `.bsk-foo`
* combine separate, layer specific, files into one, removing duplicate or superseded rules
* ordering properties within rules in a consistent order
* minifying styles to give compressed and non-compressed versions
* copy fonts to the location in `dist/` expected by `fonts-bsk.scss`

See the [end-user documentation](https://style-kit.web.bas.ac.uk/start/distribution/) for how to use these styles in
applications and websites.

#### Fix classes

In some cases workarounds are needed to cater for certain use-cases, for example when using a brand image and brand
text together in a navbar.

These classes are termed 'fix classes' within the Style Kit and use a conventional `fix-` prefix (`bsk-fix` with the
global prefix) for consistency. This convention **MUST** be used for all fix classes.

E.g. a class `.navbar-brand-img-txt` becomes `fix-navbar-brand-img-txt` or `bsk-fix-navbar-brand-img-txt` with the
Global Prefix applied.

**Note:** Fix classes are not considered bugs, as they are usually used for situations where there is no optimal
solution without either causing large amounts of duplication, or restricting users in how other classes/features can be
used.

#### Bootstrap overrides

In rare cases, core Bootstrap styles need to be overridden within the context of the BAS Style Kit. This only done where
the relevant Bootstrap styles cannot be overridden any other way, usually as a result of how rules take precedence.

Overriding a Bootstrap style requires taking a copy of the Bootstrap styles and changing them directly. Where changes
are made to these styles in Bootstrap, they will need to be 'back-ported' to our copy.

**Note:** This practice is considered a bug, see this
[issue](https://trello.com/c/YRhYrux6/128-remove-the-need-for-bootstrap-overrides) for more information.

### Images

The Style Kit includes images for:

* `assets/images/bas-logo` - the full BAS logo (roundel and text)
* `assets/images/bas-roundel` - the BAS roundel
* `assets/images/ogl-symbol` - the Open Government License (OGL) symbol
* `assets/images/ms-pictogram.svg` - the recommended Microsoft Account pictogram

Gulp is used to copy these images into `dist/`.

#### Image formats

By convention, all images should use the PNG format and extension (`.png`).

#### Image optimisation

New images should be optimised before being adding to the Style Kit.

Tools such as [Optimizilla](http://optimizilla.com) can be used for this, producing indexed-RBG images which are
significantly smaller (~70%) than full-RGB.

### JavaScript

The Style Kit is distributed as a single JS file, but is made up of multiple parts:

1. `assets/javascripts/bootstrap-overrides/*.js` - customised versions of Bootrstap 3 plugins
2. `assets/javascripts/bas-style-kit/*.js` - custom plugins for use with the Style Kit

Gulp is used to combine these scripts into one file. Additional tasks are used to:

* minify scripts to give compressed and non-compressed versions

#### JavaScript dependencies

jQuery is a dependency of all JavaScript plugins. Some plugins depend on other external scripts for specific
functionality, such as managing cookies or auto-complete inputs.

Dependencies for 'core' plugins are listed in `package.json` for use when the Style Kit is used as a Node package, or
loaded from the [BAS CDN](https://gitlab.data.bas.ac.uk/WSF/bas-cdn) when used directly in a browser.

Dependencies for optional plugins will need to be included manually as listed in the
[end-user documentation](https://style-kit.web.bas.ac.uk). They are usually also available from the BAS CDN.

**Note:** This project uses [Yarn](https://yarnpkg.com/lang/en/) instead of
[NPM](https://docs.npmjs.com/getting-started/what-is-npm) for installing dependencies within the `app` Docker image.
This still uses the NPM package registry.

**Note:** This project uses [Snyk](https://snyk.io) to check for vulnerabilities in NodeJS/Javascript dependencies used
in the Style Kit. See the [Dependency vulnerability scanning](#dependency-vulnerability-scanning) section for more
information.

### Design resources

Some extra resources, such as colour charts, used to help design the Style Kit are included in `resources/`.

To edit these resources you will need to install these fonts locally:

* [Open Sans](https://fonts.google.com/specimen/Open+Sans)

### Updating dependencies

If `package.json`, `.csscomb.json`, `.stylelintrc.yml` or `.eslintrc.yml` in the `app` Docker image, or `package.json`
in the `testbed` Docker image, are changed the relevant image will need to be rebuilt and pushed to the private BAS
Docker Repository [1].

```shell
$ cd bas-style-kit/
$ docker-compose build [image]
$ docker-compose push [image]
```

During each *alpha* release dependencies should be updated to their latest versions and conflicts resolved.

* the `app` and `testbed` images should use the latest Node LTS release (as we don't rely on cutting edge Node features)
* JavaScript dependencies (inc. Bootstrap and web-fonts) should be updated to their latest versions [2]

Dependencies listed in `package.json` can be checked using tools such as
[Daivd-DM](https://david-dm.org/antarctica/bas-style-kit?type=dev) to identify outdated versions.

[1] The first time you use this registry, you will need to authenticate using:
`docker login docker-registry.data.bas.ac.uk`

[2] To update dependencies:

For the `app` image:

```shell
# add or update package to 'package.json'
$ rm yarn.lock
$ docker-compose build app
$ docker-compose run --entrypoint="" app ash
$ mv yarn.lock ./assets/
$ exit
$ docker-compose down
$ mv assets/yarn.lock ./
```

**Note:** Commit the Yarn lock file, `yarn.lock`, to the repository.

For the `testbed` image:

```shell
# add or update package to 'package.json'
$ rm testbed/yarn.lock
$ docker-compose build testbed
$ docker-compose run --entrypoint="" testbed ash
$ mv yarn.lock ./src/assets
$ exit
$ docker-compose down
$ mv testbed/src/assets/yarn.lock ./testbed
```

**Note:** Commit the Yarn lock file, `testbed/yarn.lock`, to the repository.

## Testing

### Integration tests

Linting is used to ensure Sass styles and JavaScript follow a set of standard conventions. They will be executed
automatically through *Continuous Integration*:

* [StyleLint](https://stylelint.io) is used for checking Sass styles
* [ESlint](https://eslint.org) is used for checking JavaScript styles

To run tests manually run the `lint` Gulp task.

### Continuous Integration

The BAS GitLab instance is used for
[Continuous Integration](https://gitlab.data.bas.ac.uk/web-apps/bsk/bas-style-kit/pipelines) using settings defined in
`.gitlab-ci.yml`.

### Review Apps

The BAS GitLab instance is used to provide [Review Apps](https://docs.gitlab.com/ce/ci/review_apps/) for merge requests
into the *master* branch. These review apps use the *Testbed* to review changes and prevent regressions.

Review Apps use a set of conventional jobs and stages, settings for these jobs are defined in `.gitlab-ci.yml`. GitLab
will show links to Review App instances within each merge request.

## Provisioning

[Git](https://git-scm.com), [Terraform](https://terrafrom.io) and permissions to the
[BAS AWS](https://gitlab.data.bas.ac.uk/WSF/bas-aws) environment are required to provision resources for this project.

```shell
$ cd bas-style-kit/provisioning/terraform
$ terraform init
$ terraform validate
$ terraform fmt
$ terraform apply
```

During provisioning, an AWS IAM user will be created with least-privilege permissions to enable access to resources
used by this project.

Access credentials for this user will need to generated manually through the AWS Console and set as secret variables
within GitLab. See the `.gitlab-ci.yml` file for specifics on how to do this.

**Note:** Commit all Terraform state files to this repository.

## Continuous Deployment

The BAS GitLab instance is used for
[Continuous Deployment](https://gitlab.data.bas.ac.uk/web-apps/bsk/bas-style-kit/pipelines) using settings defined in
`.gitlab-ci.yml`.

Deployment tasks can be triggered manually for any tagged commits to:

* deploy the contents of `/dist` to the [BAS CDN](https://gitlab.data.bas.ac.uk/WSF/bas-cdn)
* deploy a Zip archive of `/dist` to the [BAS Packages Service](https://gitlab.data.bas.ac.uk/WSF/bas-packages)

**Note:** Due to caching, deployed changes may not appear for up to 1 hour.

## Branching model

There is only one long-term branch in this repository, *master*, which represents a working, stable, version of the
project, but is not necessarily the released version.

All changes are made in feature branches, merged into the Master branch when ready. Multiple branches may be active at
any one time, and **MUST** therefore be rebased on *master* before they are merged.

As needed, releases are made using a release branch (see the *Release procedures* section for more information).
This is then merged with *master* and tagged, allowing *Continuous Deployment* tasks to be ran.

## GitHub mirror

To allow use outside of BAS a read-only mirror of this project's repository is maintained on GitHub.

Merge requests **WILL NOT** be accepted on this mirror.

## Release procedures

For all releases:

1. create a release branch
2. build & push docker images (`app` & `testbed`)
3. close release in `CHANGELOG.md`
4. merge release branch with master and tag with version
5. copy SRI values into the Style Kit Documentation project [1]
6. re-publish NPM package

[1] This is currently a manual process described in the relevant
[project documentation](https://gitlab.data.bas.ac.uk/web-apps/bsk/bas-style-kit-docs/README.md).

### Publishing NPM package

```shell
$ docker-compose run --entrypoint='' app ash
$ yarn gulp archive
$ npm login
$ npm publish
```

To preview the contents of the NPM package:

```shell
$ docker-compose run --entrypoint='' app ash
$ yarn gulp archive
$ npm pack --dry-run
```

**Note:** This project includes a `.npmignore` file to exclude additional files from NPM packages.

### After release

For all releases:

1. bump the version and add the next development phase in:
  * `package.json`
  * `/assets/scripts/javascripts/bas-style-kit/0_version.js` - `Version.VERSION` variable

For example:

* if version `0.4.0` has just been published, use `0.5.0-develop` and/or `0.5.0-alpha` as indicated
* if version `0.5.0-alpha` has just been published, leave `0.5.0-develop` and use `0.5.0-beta` as indicated

## Issue tracking

This project uses [issue tracking](https://trello.com/b/0Mhzizpk/bas-style-kit) to manage development of new
features/improvements and reporting bugs.

## Feedback

The maintainer of this project is the BAS Web & Applications Team, they can be contacted through the
[BAS Service Desk](mailto:servicedesk@bas.ac.uk).

## Acknowledgements

This project is a derivative of the [Bootstrap framework](http://getbootstrap.com) project.

80% of any credit for this project should go to Boostrap's [authors and contributors](http://getbootstrap.com/about/).

## Licence

This project is a derivative of the [Bootstrap framework](http://getbootstrap.com), with additional code unique to this
project.

See [Licence.md](/license.md) for more information.
