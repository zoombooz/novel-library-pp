// This starts here






/* 
SEQUELIZE MIGRATION COMMAND

npx sequelize-cli model:generate --name User --attributes username:string,password:string,ProfileId:integer

npx sequelize-cli model:generate --name Profile --attributes name:string,email:string,phone:string,gender:string,dateOfBirth:date

npx sequelize-cli model:generate --name Book --attributes title:string,description:blob,text:blob,genre:string,AuthorId:integer

npx sequelize-cli model:generate --name UserReadBook --attributes UserId:integer,BookId:integer

npx sequelize-cli model:generate --name Author --attributes name:string,age:integer,gender:string

npx sequelize-cli migration:generate --name add-foreign-key-to-Users-and-Books


SEQUELIZE SEED COMMAND

npx sequelize-cli seed:generate --name data-insert

*/