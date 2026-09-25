PROJECT=$(basename $PWD)

clear
cd ..
cp -f .env.$PROJECT .env
cp -f tasklist.$PROJECT.txt tasklist.txt

echo WORKDIR:$(pwd)

source .env
source tasklist.txt

function removeImage() {
    if [[ -n $IS_REMOVE_IMAGE ]]
    then
        rm_id=$(docker ps -a --filter name=MCQ_$1 -q)
        [[ -z $rm_id ]] && printf "No need for container removal." || (docker kill $rm_id && docker rm $rm_id)
        rmi_id=$(docker images --filter reference=*_$1 -q)
        [[ -z $rmi_id ]] && printf "No need for image removal." || docker rmi $rmi_id
    fi
}
function pullImage() {
    if [[ -n $IS_PULL_IMAGE ]]
    then
        case $1 in
            "db") (
                docker pull $DB_IMAGE_O 
                docker tag $DB_IMAGE_O $DB_IMAGE_F
                docker rmi $DB_IMAGE_O
            );;
            "app") (
                docker pull $APP_IMAGE_O 
                docker tag $APP_IMAGE_O $APP_IMAGE_F
                docker rmi $APP_IMAGE_O
            );;
        esac
    fi
}
function buildContainer() {
    if [[ -n $IS_BUILD_CONTAINER ]]
    then
        # --verbose
        docker-compose                      \
            -f docker-compose.$PROJECT.yml  \
            up -d
        docker restart docker_MCQ_app_1 docker_MCQ_db_1
        sleep 10
        # docker exec -uroot docker_MCQ_app_1 bash -c "cd / && create-react-app /myapp-app/client/"
        docker exec -uroot docker_MCQ_db_1 bash -c "mongod --noauth --bind_ip_all &"
        docker exec -uroot docker_MCQ_db_1 bash -c "    \
            cd /myapp-db/                               \
            && mongosh mc4it create_user.mc4it.js       \
            && mongosh mc4it insert_data.mc4it.js       \
            && mongod --shutdown
        "
        docker exec -uroot docker_MCQ_app_1 bash -c "                                                               \
            cp -f /myapp-app/server/config.env.template /myapp-app/server/conf/config.env                           \
            && sed -i 's/<CONF_DB_HOSTNAME>/$(docker ps --filter name="MCQ_db" -q)/g' /myapp-app/server/conf/config.env  \
        "
        docker exec -uroot docker_MCQ_db_1 bash -c 'nohup /usr/bin/bash /entrypoint.d/startup.sh &'
        docker exec -uroot docker_MCQ_app_1 bash -c 'nohup /usr/bin/bash /entrypoint.d/server/startup.sh &'
        docker exec -uroot docker_MCQ_app_1 bash -c 'nohup /usr/bin/bash /entrypoint.d/client/startup.sh &'
    fi
}

echo -e "\nINFO - [1] - <DB> - Remove image(s)...\n"
removeImage "db"
echo -e "\n             <DB> - Pull image(s)...\n"
pullImage "db"

echo -e "\nINFO - [1] - <APP> - Remove image(s)...\n"
removeImage "app"
echo -e "\n             <APP> - Pull image(s)...\n"
pullImage "app"

echo -e "\nINFO - [2] - <**> - Build container(s)...\n"
buildContainer

echo -e "
    IS_REMOVE_IMAGE: $IS_REMOVE_IMAGE
    IS_PULL_IMAGE: $IS_PULL_IMAGE
    IS_BUILD_CONTAINER: $IS_BUILD_CONTAINER
"