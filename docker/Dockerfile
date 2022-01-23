FROM node:alpine As build

WORKDIR /usr/src/app

COPY ../package*.json ./
COPY ../server.js ./

RUN npm install --only=production
RUN npm install -g esbuild
RUN esbuild server.js --outfile=index.js --bundle --platform=node

FROM node:alpine as production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/index.js ./. # Copy node_modules from build container

ENV SMTP_HOST=send.one.com
ENV SMTP_PORT=465
ENV SMTP_USER
ENV SMTP_PWD

EXPOSE 80
EXPOSE 465

CMD ["node", "./index.js"]