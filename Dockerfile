FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn
RUN yarn build
COPY . .
# HOST
ENV HOST 0.0.0.0
# PORT
EXPOSE 9999
# 실행 커맨드
CMD ["yarn", "start:dev"]