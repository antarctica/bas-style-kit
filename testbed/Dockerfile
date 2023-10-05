# Testbed
FROM node:lts-alpine3.17

LABEL maintainer="Web & Apps <webapps@bas.ac.uk>"

# Setup project
WORKDIR /usr/src/app/testbed

# Setup project dependencies
RUN npm install --global --force yarn

ENV YARN_ENABLE_GLOBAL_CACHE=true
ENV YARN_GLOBAL_FOLDER=/usr/src/lib/yarn
COPY package.json /usr/src/app/testbed/
RUN mkdir -p /usr/src/lib/yarn && \
    yarn set version berry && \
    yarn install --no-immutable

# Copy configuration files
COPY .browserslistrc /usr/src/app/testbed/

# Setup runtime
ENTRYPOINT ["yarn", "gulp"]
CMD ["--tasks-simple"]