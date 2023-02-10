# Select the latest NodeJS image
FROM node:latest

# Create the directory!
RUN mkdir -p /strik3r/production
WORKDIR /strik3r/production

# Copy and Install our bot
COPY package.json /strik3r/production
RUN npm install

# Our precious bot
COPY . /strik3r/production

# Expose Ports
ENV PORT 8080
EXPOSE 8080

# Start me!
CMD ["npm", "start"]