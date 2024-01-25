const uploadTime = require("../helpers/uploadTime");
const { Author, Book, Profile, User } = require("../models")
const bcryptjs = require('bcryptjs');

class Controller {

// ----- Untuk Customer -----
    static async homePage(req, res){
        try {
            let dataBook = await Book.findAll({
                include: {
                    model: Author
                }
            })
            res.render('home', {dataBook, uploadTime})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

// ----- Untuk Admin -----
    static async homePageAdmin(req, res){
        try {
            let dataBook = await Book.findAll({
                include: {
                    model: Author
                }
            })
            res.render('home-admin', {dataBook})
        } catch (error) {
            console.log(error);
            res.send(error)
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
            res.render('book-detail', {book})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

// ----- Untuk Customer dan Admin -----
    static async authorPage(req, res){
        try {
            let dataAuthor = await Author.findAll({
                include : Book
            })
            res.render('authors', {dataAuthor})
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
            console.log(error);
            res.render('login', {error})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

// ----- Untuk Customer dan Admin -----
    static async registerPage(req, res){
        try {
            res.render('register')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

// ----- Untuk Customer dan Admin -----
    static async registerProcess(req, res){
        try {
            let data = req.body
            console.log(data);
            let newProfile = await Profile.create({
                name: data.name,
                phone: data.phone,
                gender: data.gender,
                dateOfBirth: data.dateOfBirth
            })

            let salt = bcryptjs.genSaltSync(10)
            let encryptPassword = bcryptjs.hashSync(data.password, salt)
            console.log(encryptPassword);

            await User.create({
                username: data.username,
                password: encryptPassword,
                email: data.email,
                ProfileId: newProfile.id
            })
            res.redirect('/')
        } catch (error) {
            console.log(error);
            res.send(error)
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
                    res.redirect('/books-admin')
                }else {
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

// ----- Untuk Admin -----
    static async homePageAdmin(req, res){
        try {
            let dataBook = await Book.findAll({
                include: {
                    model: Author
                }
            })
            res.render('home-admin', {dataBook, uploadTime})
        } catch (error) {
            res.send(error)
        }
    }
// ---- Untuk Admin -----

    static async authorPageAdmin(req, res){
        try {
            let author = await Author.findAll()

            res.render('authors-admin', {author})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

// ----- Untuk Admin -----
    static async addBook(req, res){
        try {
            let dataAdd = await Author.findAll()
            res.render("add-book", {dataAdd})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

// ----- Untuk Admin -----
    static async processBook(req, res){
        try {
            let data = req.body
            console.log(data);
            const { title, genre, description, text, AuthorId, image } = data
            await Book.create({
                title: title,
                genre: genre,
                description: description,
                text: text,
                AuthorId: AuthorId,
                image: image                
            })
            res.redirect("/books-admin")
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

// ----- Untuk Admin -----
    static async deleteBook(req, res) {
        try {
            let {id} = req.params
            await Book.destroy({
                where: {
                    id: +id
                }
            })  
            res.redirect("/books-admin")
        } catch (error) {
            res.send(error)
        }
    }

    static async editBook(req, res){
        try {
            let dataAuthor = await Author.findAll()
            let book = await Book.findOne({
                include : Author,
                where : {
                    id : req.params.id
                }
            })
            console.log(book);
            res.render('edit-book', {dataAuthor, book})
        } catch (error) {
            console.log(error);
            res.send(error)
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
            console.log(error);
            res.send(error)
        }
    }

}

module.exports = Controller