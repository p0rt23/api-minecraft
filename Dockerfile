FROM alpine

RUN apk update && \
    apk add build-base && \
    apk add python3 && \
    apk add nodejs && \
    apk add npm 

COPY ./api /api
WORKDIR /api
RUN npm install

ENTRYPOINT ["npm", "start"]
