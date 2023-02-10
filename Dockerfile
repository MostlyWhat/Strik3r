# Use the official Node.js image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /strik3r-app

# Copy the application files into the working directory
COPY . /strik3r-app

# Install the application dependencies
RUN npm install

# Define the entry point for the container
CMD ["npm", "start"]