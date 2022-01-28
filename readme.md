# how to start
1. git clone the project
2. run npm install in each of the frontend and backend folders
3. make a database
-   psql
-   create database war_app
-   create user war with password '123'
-   grant all privileges on database war_app to war;

4. run migrations -  npx sequelize db:migrate
5. (optional) run seed - npx sequelize db:seed:all

5. run npm start in each of the frontend and backend folders

6. to run a frontend test, use npm test
