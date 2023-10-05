# Style-kit
FROM node:lts-alpine3.17

LABEL maintainer="Web & Apps <webapps@bas.ac.uk>"

# Setup project
WORKDIR /usr/src/app

# Setup project dependencies
ENV YARN_ENABLE_GLOBAL_CACHE=true
ENV YARN_GLOBAL_FOLDER=/usr/src/lib/yarn
COPY package.json /usr/src/app/
RUN mkdir -p /usr/src/lib/yarn && \
    yarn set version berry && \
    yarn install

# Run tests
RUN echo "style-kit" && \
    echo "node version: " && node --version && \
    echo "npm version: " && npm --version && \
    echo "yarn version: " && yarn --version && \
    echo "gulp version: " && yarn gulp --version

# Copy configuration files
COPY .csscomb.json .stylelintrc.yml .browserslistrc /usr/src/app/

# Copy meta files for NPM packages
COPY .gitattributes .gitignore .npmignore README.md /usr/src/app/

# Setup runtime
ENTRYPOINT ["yarn", "gulp"]
CMD ["--tasks-simple"]