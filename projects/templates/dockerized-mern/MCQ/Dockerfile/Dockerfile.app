FROM ubuntu_app:22.04

RUN     echo 'PS1="\$(tput dim)[HKT \\t (app)]\$(tput sgr0) \$(tput setaf 1)\\u@\\h\$(tput setaf 7):\$(tput setaf 3)\$PWD\$(tput sgr0)\$ "'      \
                >> /root/.bashrc

RUN     mkdir -p                                \
                /myapp-app/server/db/           \
                /myapp-app/server/routes/       \
                /myapp-app/client/
RUN     apt-get -y update && apt-get -y upgrade
RUN     apt-get -y install              \
            wget                        \
            curl
RUN     curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh   \
        && bash nodesource_setup.sh                                             \
        && apt-get -y install           \
                nodejs                  \
                git                     \
                nano
RUN     node -v && npm -v

RUN     npm install npm@latest -g
RUN     node -v && npm -v
RUN     npm install -g create-react-app
RUN     create-react-app --version

WORKDIR /myapp-app/client/
RUN     npm install                     \
                axios                   \
                bootstrap               \
                react-router-dom        \
                use-state-with-callback \
                react-bootstrap         \
                react

WORKDIR /myapp-app/server/
RUN     wget -qO- https://www.mongodb.org/static/pgp/server-7.0.asc | tee /etc/apt/trusted.gpg.d/server-7.0.asc         \
        && echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" |       \
                tee /etc/apt/sources.list.d/mongodb-org-7.0.list                                                        \
        && apt-get -y update                                                                                            \
        && apt-get -y install mongodb-mongosh

ENTRYPOINT [ "sleep", "infinity" ]
