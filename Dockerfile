FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3000
CMD [ "node", "src/index.js" ]
