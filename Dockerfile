FROM node:lts-alpine@sha256:2f50f4a428f8b5280817c9d4d896dbee03f072e93f4e0c70b90cc84bd1fcfe0d As build
ENV NODE_ENV production

WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./*js ./

RUN npm ci --only=production
RUN npm install -g esbuild
RUN esbuild server.js --outfile=index.js --bundle --platform=node

FROM node:lts-alpine@sha256:2f50f4a428f8b5280817c9d4d896dbee03f072e93f4e0c70b90cc84bd1fcfe0d As production

RUN apk add dumb-init

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/index.js ./ 

ENV SMTP_HOST ..
ENV SMTP_PORT 465
ENV WEB_SERVER_PORT 80
ENV SMTP_USER user
ENV SMTP_PWD pwd

EXPOSE 80
EXPOSE 465

USER node
CMD ["dumb-init", "node", "./index.js"]