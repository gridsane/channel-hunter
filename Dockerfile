from node:6

ADD . /app

WORKDIR /app

ENV NODE_ENV=production

CMD npm start
