FROM node:21-bullseye

RUN apt-get update && apt-get upgrade -y && \
  apt-get install -y \
  chromium nano vim mc \
  libatk-bridge2.0-0 \
  libxkbcommon0 \
  libwayland-client0 \
  libgtk-3-0 && \
  rm -rf /var/lib/apt/lists/* && \
  mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

RUN npm update whatsapp-web.js

COPY --chown=node:node . .

EXPOSE 5000

CMD ["npm", "start"]
