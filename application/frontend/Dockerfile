# Take smallest node image possible
FROM node:14-alpine3.10 as builder

ARG REACT_APP_TITLE
ENV REACT_APP_TITLE=$REACT_APP_TITLE

# Create/Set /usr/src/app directory as default working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package.json & package-lock.json
COPY package*.json /usr/src/app/

# Update package-lock.json file and install node modules
RUN npm ci

COPY . /usr/src/app
RUN npm run build

######

FROM nginx:stable-alpine

# copy static html files that were compiled by node to the nginx webserver folder
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY proxy/nginx.conf /etc/nginx/conf.d/default.conf
COPY proxy/configureProxy.sh /usr/

# Run nginx
CMD /bin/ash /usr/configureProxy.sh
