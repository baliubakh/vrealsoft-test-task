FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY .env .env


EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
