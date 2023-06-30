FROM node:18

WORKDIR /home/app

RUN mkdir -p /home/app

COPY . /home/app

RUN npm install

EXPOSE 80

CMD ["node", "/home/app/index.js"]