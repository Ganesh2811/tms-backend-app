# tms-backend-app
username= gp11282001_db_user
password= ZuhBKVdiFphPYKFM
mongodb+srv://gp11282001_db_user:ZuhBKVdiFphPYKFM@cluster0.feeafjv.mongodb.net/taskDB?retryWrites=true&w=majority&appName=Cluster0
docker start redis-server
docker stop redis-server
docker ps -a
docker version
docker build -t tms-backend-app .
docker run -p 8800:8800 --env-file .env tms-app