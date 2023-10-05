# Update to BS5

## Projects
- All projects subgroup: https://gitlab.data.bas.ac.uk/web-apps/bsk
- this project - Core:
    - https://gitlab.data.bas.ac.uk/web-apps/bsk/bas-style-kit
- A set of jekyll template pages, for use in Jekyll SSGs
    - https://gitlab.data.bas.ac.uk/web-apps/bsk/bas-style-kit-jekyll-theme 
- https://gitlab.data.bas.ac.uk/web-apps/bsk/bas-style-kit-docs 
    - Documentation website for BAS style kit - uses the jekyll-theme project

## Workflow
- Update the core project to be based on BS5
- Update the base docker images & push to the BAS registry
- Create a new Ruby gem for the template files: bas-style-kit-jekyll-theme 
- Push the new gem to rubygems.com - 1password for details - need to increment the gem version number for the package to be used - `https://gitlab.data.bas.ac.uk/web-apps/bsk/bas-style-kit-jekyll-theme` > `bas-jekyll-theme-bas-style-kit.gemspec`