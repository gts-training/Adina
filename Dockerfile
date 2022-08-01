FROM node:16-alpine

RUN mkdir /calculator
RUN chown -R node:node /calculator

WORKDIR /calculator

COPY . /calculator
RUN npm install
CMD ["npm", "start"]