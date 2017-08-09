# Build:
# docker build -t redbus/ubuntu-nodejs .
#
# Run:
# docker run -it redbus/ubuntu-nodejs
#
# Compose:
# docker-compose up -d

FROM redbus/ubuntu-nodejs
MAINTAINER Julio Bonifacio Aliaga "juliosbonifacio@gmail.com"

# 80 = HTTP, 443 = HTTPS, 3000 = MEAN server, 35729 = livereload, 8080 = node-inspector
EXPOSE 80 3000 8080

# Set development environment as default
ENV NODE_ENV development

# Install nodejs
#RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN sudo apt-get install -yq nodejs \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN mkdir -p /srv/app/web/public/lib
WORKDIR /srv/app/web

# Copies the local package.json file to the container
# Install npm packages
COPY package.json /srv/app/web/package.json
RUN npm install --quiet && npm cache clean

COPY . /srv/app/web

# Run MEAN.JS server
CMD npm install && npm start
