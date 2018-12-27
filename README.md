# fileshare-ms
Fileshare microservice is for file upload based on MSSQL database, s3 bucket storage, Nodejs

## Prerequisite
  - MSSQL server
  - Redis server
  - AWS S3 Bucket Creds
  - Nodejs latest lts

## Installation And Run
 
After git clone via https or ssh
```sh
$ cd fileshare-ms
$ npm install
$ npm start
```

for dev server
```sh
$ npm run serve
```

## Default Configuration
  
first please create ***.env*** at root folder structure with this variable:

ACCESS_KEY_ID=***YOUR ACCESS KEY ID***
SECRET_ACCESS_KEY=***YOUR ACCESS KEY***
S3_BUCKET_NAME=***S3 BUCKET NAME***
  
Check ***appconfig/config*** (for db connection,databse name and app port ***4000***)

## Features!
CRUD operation are as follows
  - POST http://localhost:4000/upload : to upload file
  - GET http://localhost:4000/upload/all : to get all the files data
  - GET http://localhost:4000/upload/{id} : to get specific file data
  - DELETE http://localhost:4000/upload/{id} : to delete specific file data

License
----
MIT