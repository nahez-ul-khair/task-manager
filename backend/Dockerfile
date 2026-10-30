
# Stage 1: Common Dependencies

# Define the base image with version tag
FROM node:22-alpine AS base

# Set the working directory
WORKDIR /app/

# Copy Package Files & Install Dependencies
COPY package*.json ./


# Stage 2a: Development

# Include Dev Dependencies and Run nodemon
FROM base AS development
RUN npm install

# Copy Build Files
COPY . .

# # Expose Port for API Calls
EXPOSE 3000

# Run the Application
CMD ["npm", "run", "dev"]


# Stage 2b: Production

# Minimal Dependencies, Non-root User
FROM base AS production

ENV NODE_ENV=production

# Install only Production Dependencies
RUN npm ci --omit=dev

# Copy Build Files
COPY . .

# Run Container as Unprivileged 'node' User
USER node

# # Expose Port for API Calls
EXPOSE 3000

# Run the Application
CMD ["npm", "run", "start"]