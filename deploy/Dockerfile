FROM nginx

COPY ./dist /oneteamweb
COPY conf.json /oneteamweb/conf.json
COPY run.sh /oneteamweb/run.sh
COPY nginx.conf /etc/nginx/nginx.conf
COPY oneteamweb.conf /etc/nginx/conf.d/oneteamweb.conf

RUN chmod -R 755 /oneteamweb && chmod +x /oneteamweb/run.sh

CMD ["/oneteamweb/run.sh"]
