FROM node:16-alpine

RUN mkdir /proiect
RUN chown -R node:node /proiect

WORKDIR /proiect

COPY . /proiect/

EXPOSE 1234
CMD ["node", "server.js"]