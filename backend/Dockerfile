FROM node
WORKDIR /api/ticket
RUN npm install pm2 -g
RUN npm install babel -cli -g

ADD package.json /api/ticket
RUN npm install

ADD . /api/ticket
EXPOSE 5000
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
CMD /wait && npm start