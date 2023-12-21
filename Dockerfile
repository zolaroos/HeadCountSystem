FROM node
WORKDIR /app
COPY package*.json ./
COPY . .
EXPOSE 3333
CMD ["node", "app.js"]