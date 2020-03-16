FROM node:10-alpine
# Or whatever Node version/image you want
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY ./dist/. /app
EXPOSE 5000
CMD DEBUG=app node index.js