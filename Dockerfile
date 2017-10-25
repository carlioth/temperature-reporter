FROM node:8.7-alpine

RUN mkdir -p /app/
WORKDIR /app/

COPY package.json ./
RUN npm install --quiet --production

COPY . src/

ENTRYPOINT ["node", "./src/index.js"]