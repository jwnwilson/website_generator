FROM library/postgres
ENV POSTGRES_USER docker
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB website_generator
ENV PGDATA /var/lib/postgresql/data/db-files/
COPY ./ops/init.sql /docker-entrypoint-initdb.d/
