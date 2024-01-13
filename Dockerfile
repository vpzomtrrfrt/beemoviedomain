FROM node:18-alpine

RUN adduser -S web
WORKDIR /usr/src/beemoviedomain
USER web

COPY . .

ENV NODE_OPTIONS "--max-http-header-size=64000"

CMD ["npm", "start"]
