// This starts here
const express = require('express')
const router = require('./router/router')
const app = express()
const port = 3000

const multer  = require('multer')
const upload = multer({ dest: 'assets/' })

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))

app.use(router)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})






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