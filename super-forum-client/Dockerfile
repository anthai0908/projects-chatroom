# ==============================
# Stage 1: Build React app
# ==============================
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Build React app → outputs to /app/build
RUN npm run build


# ==============================
# Stage 2: Nginx to serve files
# ==============================
FROM nginx:alpine

# Copy custom nginx.conf if you want (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy React build output into nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
