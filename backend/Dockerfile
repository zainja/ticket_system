FROM node
WORKDIR /api/ticket
RUN npm install pm2 -g
RUN npm install babel -cli -g

ADD package.json /api/ticket
RUN npm install

ADD . /api/ticket

EXPOSE 5000
CMD ["npm", "start"]