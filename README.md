# mail-web-service

# build
docker build . -t ${USER}/mail-web-service

# run
docker run --env SMTP_USER=henrik@haskoe.dk --env SMTP_PWD --name mailservice has/mail-web-service 
# non root
docker run -p 80:8080 --env WEB_SERVER_PORT=80 --env SMTP_USER=henrik@haskoe.dk --env SMTP_PWD --name mailservice has/mail-web-service