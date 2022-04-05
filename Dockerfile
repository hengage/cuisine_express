FROM node:16-alpine

WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm ci --only=production && npm cache clean --force
COPY . /app
CMD node app.js
EXPOSE 3000