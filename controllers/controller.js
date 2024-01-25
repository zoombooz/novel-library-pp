const uploadTime = require("../helpers/uploadTime");
const { Author, Book, Profile, User } = require("../models")

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
            await User.create({
                username: data.username,
                password: data.password,
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
            console.log(data);
            let found = await User.findOne({
                include : Profile,
                where : {
                    username : data.username,
                    password : data.password
                }
            })
            if(found){
                if(found.role === "admin"){
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
// ----- Untuk Admin -----
    static async addBook(req, res){
        try {
            let dataAdd = await Book.findAll({
                include: {
                    model: Author
                }
            })
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
            const { title, genre, description, text, AuthorId, image } = data
            await Book.create({
                title: title,
                genre: genre,
                description: description,
                text: text,
                AuthorId: AuthorId,
                image: image                
            })
            res.redirect("/books")
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

}

module.exports = Controller