# mail-web-service

# build
docker build . -t ${USER}/mail-web-service

# run
docker run --env SMTP_USER --env SMTP_PWD --name mailservice has/mail-web-service 
# nginx-proxy
docker run --expose 80 -e VIRTUAL_HOST=.dyndns.dk --env WEB_SERVER_PORT=80 --env SMTP_USER --env SMTP_PWD --name mailservice heas/mail-web-service
http --form POST http://.dyndns.dk/mail from="" to="" subject="subject 1" html="<body>body text</body>"

# non root
docker run -p 80:8080 --env WEB_SERVER_PORT --env SMTP_USER --env SMTP_PWD --name mailservice has/mail-web-service