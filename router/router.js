const router = require('express').Router()
const Controller = require("../controllers/controller")
// const multer = require('multer');
// const upload = multer({storage: multer.memoryStorage()})

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './assets')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
// const upload = multer({dest: './assets'})
const upload = multer({storage : storage})

router.get('/', Controller.loginPage)
router.post('/', Controller.loginProcess)
router.get('/register', Controller.registerPage)
router.post('/register', Controller.registerProcess)



router.use((req, res, next) => {
    if(!req.session.user){
        res.redirect('/')
    } else {
        next()
    }
})

router.get('/books', Controller.homePage)
router.get('/authors', Controller.authorPage)
router.get('/bookmarks/:userId', Controller.bookmarks)
router.get('/reads/:bookId', Controller.readPage)
router.get('/reads/:bookId/bookmarks', Controller.addBookmarks)

router.get('/books-admin', Controller.homePageAdmin)
router.get('/authors-admin', Controller.authorPageAdmin)
router.get('/books/add', Controller.addBook)
router.post('/books/add', upload.single('image'), Controller.processBook)
router.get('/books/edit/:id', Controller.editBook)
router.post('/books/edit/:id', Controller.editBookProcess)
router.get('/books/delete/:id', Controller.deleteBook)
router.get('/authors/add', Controller.authorAdd)
router.post('/authors/add', Controller.authorAddProcess)
router.get('/authors/edit/:id', Controller.authorEdit)
router.post('/authors/edit/:id', Controller.authorEditProcess)

router.get('/logout', Controller.logout)

module.exports = router