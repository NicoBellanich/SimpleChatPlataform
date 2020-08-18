FROM node:12

WORKDIR /app

COPY package.json .

COPY . .

RUN npm install

EXPOSE 3004

CMD ["npm","run","dev"]
