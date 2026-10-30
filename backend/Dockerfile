
# Define the base image with version tag
FROM node:22-alpine

# Set the working directory
WORKDIR /app/

# Copy Package Files & Install Dependencies
COPY package*.json ./
RUN npm install

# Copy Build Files
COPY . .

# Run the Application
CMD ["npm", "run", "start"]