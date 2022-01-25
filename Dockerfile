FROM node:alpine As build

WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./*js ./

RUN npm install --only=production
RUN npm install -g esbuild
RUN esbuild server.js --outfile=index.js --bundle --platform=node
RUN ls

FROM node:alpine as production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/index.js ./ 
RUN ls

ENV SMTP_HOST ..
ENV SMTP_PORT 465
ENV WEB_SERVER_PORT 80
ENV SMTP_USER user
ENV SMTP_PWD pwd

EXPOSE 80
EXPOSE 465

CMD ["node", "./index.js"]