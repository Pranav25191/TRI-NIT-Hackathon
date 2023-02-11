# Fetching the latest node image on apline linux
FROM node:18.3.0

# Declaring env
ENV NODE_ENV development
EXPOSE 3000
# Setting up the work directory
WORKDIR /BTP_Frontend

# Installing dependencies
COPY ./package.json /BTP_Frontend
RUN npm install

# Copying all the files in our project
COPY . .
# Starting our application
CMD npm start