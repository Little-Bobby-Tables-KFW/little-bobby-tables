# Take smallest node image possible
FROM node:14-alpine3.10

# Set /home/node directory as default working directory
WORKDIR /home/node

# Copy package.json & package-lock.json
COPY package*.json ./

# Update package-lock.json file and install node modules
RUN npm ci

# Copy all files from current dir to container
COPY . .

ARG BUILDTIMESTAMP=''
ARG CI_COMMIT_SHA=''

ENV BUILDTIMESTAMP ${BUILDTIMESTAMP}
ENV CI_COMMIT_SHA ${CI_COMMIT_SHA}
ENV NODE_ENV production

# Label the docker image for showing meta data when `docker inspect`
# This way the downloaded docker image shows more details about the image
LABEL org.label-schema.vcs-ref=$CI_COMMIT_SHA \
      org.label-schema.vcs-url=$CI_REPOSITORY_URL \
      org.label-schema.name="dobib" \
      org.label-schema.description="This project is showing a webserver-api-db software architecture using a modern book rental example website"

# cmd to start service
CMD [ "npm", "start" ]

