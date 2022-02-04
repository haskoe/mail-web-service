# mail-web-service

# build
docker build . -t ${USER}/mail-web-service

# run
docker run --env SMTP_USER --env SMTP_PWD --name mailservice ${USER}/mail-web-service 
# nginx-proxy
docker run --expose 80 -e VIRTUAL_HOST=.dyndns.dk --env WEB_SERVER_PORT=80 --env SMTP_PORT --env SMTP_HOST --env SMTP_USER --env SMTP_PWD --name mailservice heas/mail-web-service
http --form POST http://.dyndns.dk/mail from="" to="" subject="subject 1" html="<body>body text</body>"

# w/o docker
docker run -p 80:8080 --env WEB_SERVER_PORT --env SMTP_PORT --env SMTP_HOST --env SMTP_USER --env SMTP_PWD --name mailservice has/mail-web-service
http --form POST http://localhost:8080/mail from="" to="" subject="subject 1" html="<body>body text</body>"


# on VPS
tmux
split
docker run -d -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro -v ~/dev/haskoe/mail-web-service/docker/proxy.conf:/etc/nginx/proxy.conf jwilder/nginx-proxy
docker run --expose 80 -e VIRTUAL_HOST=upload.humanassist.dyndns.dk --name upload -v $HOME/tmp:/var/root mayth/simple-upload-server -token <token> -port 80 -upload_limit 209715200 /var/root
