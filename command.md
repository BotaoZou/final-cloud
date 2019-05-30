# Login
>> ssh -i Lec.pem linux1@148.100.86.185

# Database
>> ## 1. open docker
>>> ### docker exec -it meandocker_database_1 bash
>> ## 2. connect database
>>> ### mogo
>> ## 3. show databases
>>> ### show dbs
>> ## 4. select database
>>> ### use docker-mean
>> ## 5. show tables
>>> ### db.todos.find()
>> ## 6. select specific row(s) of data
>>> ### db.todos.find({"text": "tom"})

# TODO...
>> ## 1. check docker list
>>> ### docker ps