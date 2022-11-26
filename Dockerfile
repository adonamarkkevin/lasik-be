FROM node:16.15.0
# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .
COPY dev.env .env

RUN yarn build

ENV NODE_ENV development

EXPOSE 4545

CMD ["node", "dist/index.js"]