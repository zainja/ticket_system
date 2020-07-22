FROM node
WORKDIR /usr/app
RUN npm install -g expo-cli
ADD package.json /usr/app
RUN yarn add expo
RUN expo install
ADD . /usr/app
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
CMD /wait && npm start