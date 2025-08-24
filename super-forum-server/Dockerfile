FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Compile TS → JS into dist/
RUN npm run build

EXPOSE 8888
CMD ["node", "dist/index.js"]
