
# base image
FROM node:16

#  the code will be inside /app
WORKDIR ./app

COPY ./ ./

RUN npm install

EXPOSE 3000
CMD ["npm","start"]

