FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY .env .env  
COPY database.sqlite database.sqlite


RUN npm run build

CMD ["npm", "run", "start:prod"]
