
# Stage 1: Build Static Assets

# Define the Base Image with Version Tag
FROM node:22-alpine AS build

# Set the Working Directory
WORKDIR /app/

# Copy Package Files & Install Dependencies
COPY package*.json ./
RUN npm install

# Copy Build Files
COPY . .
RUN npm run build

# # Expose Port for Vite
# EXPOSE 5173

# # Run the Application
# CMD ["npm", "run", "dev"]



# Stage 2: Serve w/Lightweight Nginx
FROM nginx:alpine

# Copy Compiled Static Assets from the Build Stage
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx Default Port
EXPOSE 80

# Run Nginx
CMD [ "nginx", "-g", "daemon off;" ]