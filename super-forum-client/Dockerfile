# ==============================
# Stage 1: Build React app
# ==============================
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ==============================
# Stage 2: Final Nginx container
# ==============================
FROM nginx:alpine

# Copy React build output into nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config (handles SPA + API reverse proxy)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
