const uploadTime = require("../helpers/uploadTime");
const { Author, Book, Profile, User, UserReadBook } = require("../models")
const bcryptjs = require('bcryptjs');
const { Op } = require("sequelize");
const { use } = require("../router/router");

class Controller {

// ----- Untuk Customer -----
    static async homePage(req, res){
        try {

            let user = req.session.user

            let dataBook = await Book.findAll({
                include: {
                    model: Author
                },
                order : [
                    ['id', "ASC"]
                ]
            })

            let total = await Book.getTotalBooks()

            console.log(req.query.search);
            if(req.query.search){
                dataBook = await Book.findAll({
                    include: {
                        model: Author
                    },
                    where : {
                        title : {
                            [Op.iLike] : `%${req.query.search}%`
                        }
                    },
                    order : [
                        ['id', "ASC"]
                    ]
                }) 
            }

            if(req.query.author){
                dataBook = await Book.findAll({
                    include: {
                        model: Author
                    },
                    where : {
                        AuthorId : req.query.author
                    },
                    order : [
                        ['id', "ASC"]
                    ]
                }) 
            }

            res.render('home', {dataBook, uploadTime, user, total})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

// ----- Untuk Admin -----
    static async homePageAdmin(req, res){
        try {
            if(req.session.user.role !== "admin"){
                throw new Error("Hanya admin yang boleh mengakses halaman ini")
            }

            let dataBook = await Book.findAll({
                include: {
                    model: Author
                },
                order: [
                    ['id', 'ASC']
                ]
            })

            if(req.query.author){
                dataBook = await Book.findAll({
                    include: {
                        model: Author
                    },
                    order: [
                        ['id', 'ASC']
                    ],
                    where : {
                        AuthorId : req.query.author
                    }
                })
            }

            if(req.query.search){
                dataBook = await Book.findAll({
                    include: {
                        model: Author
                    },
                    order: [
                        ['id', 'ASC']
                    ],
                    where : {
                        title : {
                            [Op.iLike] : `%${req.query.search}%`
                        }
                    }
                })
            }
            

            res.render('home-admin', {dataBook})
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

// ----- Untuk Customer -----
    static async readPage(req, res){
        try {
            let id = req.params.bookId
            let book = await Book.findOne({
                where : {
                    id : id
                }
            })
            let userRole = req.session.user.role
            console.log(userRole);
            res.render('book-detail', {book, userRole})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

// ----- Untuk Customer dan Admin -----
    static async authorPage(req, res){
        try {
            let dataAuthor = await Author.findAll({
                include : Book,
                order : [
                    ['id', 'ASC']
                ]
            })

            res.render('authors', {dataAuthor})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async addBookmarks(req, res){
        try {
            let bookId = req.params.bookId

            let userId = req.session.user.id

            await UserReadBook.create({
              UserId : userId,
              BookId : bookId  
            })

            res.redirect(`/reads/${bookId}`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async bookmarks(req, res){
        try {

            let data = await User.findOne({
                where : {
                    id : req.session.user.id
                },
                include: Book
            })

            console.log(data, "<<<<<");
            console.log(data.Books, ">>>>>>");
            res.render('bookmark', {data})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

// ----- Untuk Customer dan Admin -----
    static async loginPage(req, res){
        try {
            let error = ""
            if(req.query.error){
                error = req.query.error
            }
            res.render('login', {error})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

// ----- Untuk Customer dan Admin -----
    static async registerPage(req, res){
        try {
            let error = ""
            if(req.query.err){
                error = req.query.err.split(",")
            }
            console.log(error);
            res.render('register', {error})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

// ----- Untuk Customer dan Admin -----
    static async registerProcess(req, res){
        try {
            let data = req.body
            let newProfile = await Profile.create({
                name: data.name,
                phone: data.phone,
                gender: data.gender,
                dateOfBirth: data.dateOfBirth
            })

            let salt = bcryptjs.genSaltSync(10)
            let encryptPassword = bcryptjs.hashSync(data.password, salt)

            await User.create({
                username: data.username,
                password: encryptPassword,
                email: data.email,
                ProfileId: newProfile.id
            })
            res.redirect('/')
        } catch (error) {
            if(error.name === "SequelizeValidationError"){
                let errorMessage = error.message
                let message = errorMessage.split(',')
                let err = message.map(item => {
                    let temp = item.split(":")
                    return temp[1]
                })
                res.redirect(`/register?err=${err}`)
            }else {
                console.log(error);
                res.send(error)
            }
        }
    }

// ----- Untuk Customer dan Admin -----
    static async loginProcess(req, res){
        try {
            let data = req.body

            let user = await User.findOne({
                include : Profile,
                where : {
                    username : data.username
                }
            })
            
            let isFound = bcryptjs.compareSync(data.password, user.password)

            if(isFound){
                if(user.role === "admin"){
                    req.session.user = {
                        id: user.id,
                        username: user.username,
                        role: user.role
                    }
                    res.redirect('/books-admin')
                }else {
                    req.session.user = {
                        id: user.id,
                        username: user.username,
                        role: user.role
                    }
                    res.redirect('/books')
                }
                
            }else {
                res.redirect(`/?error=${"Akun tidak ditemukan. Coba cek apakah username dan password yang anda masukkan sudah benar."}`)
            }
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

// ---- Untuk Admin -----

    static async authorPageAdmin(req, res){
        try {
            if(req.session.user.role !== "admin"){
                throw new Error("Hanya admin yang boleh mengakses halaman ini")
            }
            let author = await Author.findAll({
                order : [
                    ['id', 'ASC']
                ]
            })

            res.render('authors-admin', {author})
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

// ----- Untuk Admin -----
    static async addBook(req, res){
        try {
            if(req.session.user.role !== "admin"){
                throw new Error("Hanya admin yang boleh mengakses halaman ini")
            }

            let error = ""
            if(req.query.err){
                error = req.query.err.split(",")
            }

            let dataAdd = await Author.findAll()
            res.render("add-book", {dataAdd, error})
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

// ----- Untuk Admin -----
    static async processBook(req, res){
        try {

            let data = req.body

            // const buffer = req.file.buffer
            // console.log(buffer);
            // const decodeBuffer = Buffer.from(buffer).toString("base64")
            // const changeImg = `data:${req.file.mimetype};base64,${decodeBuffer}`

            // console.log(changeImg, "<<<<<<<");

            const { title, genre, description, text, AuthorId, image } = data
            await Book.create({
                title: title,
                genre: genre,
                description: description,
                text: text,
                AuthorId: AuthorId,
                image: req.file.path                
            })
            res.redirect("/books-admin")
        } catch (error) {
            if(error.name === "SequelizeValidationError"){
                let errorMessage = error.message
                let message = errorMessage.split(',')
                let err = message.map(item => {
                    let temp = item.split(":")
                    return temp[1]
                })
                res.redirect(`/books/add?err=${err}`)
            }else {
                console.log(error);
                res.send(error)
            }
        }
    }

// ----- Untuk Admin -----
    static async deleteBook(req, res) {
        try {
            if(req.session.user.role !== "admin"){
                throw new Error("Hanya admin yang boleh mengakses halaman ini")
            }
            let {id} = req.params
            await Book.destroy({
                where: {
                    id: +id
                }
            })  
            res.redirect("/books-admin")
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    static async editBook(req, res){
        try {
            if(req.session.user.role !== "admin"){
                throw new Error("Hanya admin yang boleh mengakses halaman ini")
            }
            
            let error = ""
            if(req.query.err){
                error = req.query.err.split(",")
            }

            let dataAuthor = await Author.findAll()
            let book = await Book.findOne({
                include : Author,
                where : {
                    id : req.params.id
                }
            })
            console.log(book);
            res.render('edit-book', {dataAuthor, book, error})
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    static async editBookProcess(req, res){
        try {
            let data = req.body
            console.log(data);
            await Book.update({ 
                title: data.title,
                genre: data.genre,
                description: data.description,
                text: data.text,
                AuthorId: data.AuthorId,
                image: data.image
             }, {
                where: {
                  id : req.params.id
                }
            });
            res.redirect('/books-admin')
        } catch (error) {
            if(error.name === "SequelizeValidationError"){
                let errorMessage = error.message
                let message = errorMessage.split(',')
                let err = message.map(item => {
                    let temp = item.split(":")
                    return temp[1]
                })
                res.redirect(`/books/edit/${req.params.id}?err=${err}`)
            }else {
                console.log(error);
                res.send(error)
            }
        }
    }

    static async authorAdd(req, res){
        try {

            let error = ""
            if(req.query.err){
                error = req.query.err.split(",")
            }

            res.render('author-add', {error})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async authorAddProcess(req, res){
        try {

            let data = req.body

            await Author.create({
                name: data.name,
                age: data.age,
                gender: data.gender
            })

            res.redirect('/books/add')

        } catch (error) {
            if(error.name === "SequelizeValidationError"){
                let errorMessage = error.message
                let message = errorMessage.split(',')
                let err = message.map(item => {
                    let temp = item.split(":")
                    return temp[1]
                })
                res.redirect(`/authors/add?err=${err}`)
            }else {
                console.log(error);
                res.send(error)
            }
        }
    }

    static async authorEdit(req, res){
        try {

            let author = await Author.findOne({
                where : {
                    id : req.params.id
                }
            })

            let error = ""
            if(req.query.err){
                error = req.query.err.split(",")
            }

            res.render('author-edit', {author, error})

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async authorEditProcess(req, res){
        try {

            let data = req.body

            await Author.update({
                name: data.name,
                age: data.age,
                gender: data.gender
            },{
                where: {
                    id : req.params.id
                }
            })

            res.redirect('/authors-admin')

        } catch (error) {
            if(error.name === "SequelizeValidationError"){
                let errorMessage = error.message
                let message = errorMessage.split(',')
                let err = message.map(item => {
                    let temp = item.split(":")
                    return temp[1]
                })
                res.redirect(`/authors/edit/${req.params.id}?err=${err}`)
            }else {
                console.log(error);
                res.send(error)
            }
        }
    }

    static async logout(req, res){
        req.session.destroy(() => {
            res.redirect('/')
        })
    }

}

module.exports = Controller