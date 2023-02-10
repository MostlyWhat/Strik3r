FROM node:14
WORKDIR /strik3r-prod
COPY . /strik3r-prod/
RUN npm install
ENV PORT 8080
EXPOSE 8080
CMD ["npm", "start"]