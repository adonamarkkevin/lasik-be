docker stop lasik_be_container
docker rm lasik_be_container
docker rmi lasik_be_img

docker build -t lasik_be_img .
docker run -d -p 3006:3006 --name lasik_be_container lasik_be_img
docker image prune -f