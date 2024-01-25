const router = require('express').Router()
const Controller = require("../controllers/controller")

// router.get('/', (req, res) => {
//   res.send('Hello World!')
// })

router.get('/', Controller.loginPage)
router.post('/', Controller.loginProcess)
router.get('/register', Controller.registerPage)
router.post('/register', Controller.registerProcess)

router.get('/books', Controller.homePage)
router.get('/authors', Controller.authorPage)

router.get('/books-admin', Controller.homePageAdmin)
router.get('/authors-admin', Controller.authorPageAdmin)
router.get('/books/add', Controller.addBook)
router.post('/books/add', Controller.processBook)
router.get('/books/edit/:id', Controller.editBook)
router.post('/books/edit/:id', Controller.editBookProcess)
router.get('/books/delete/:id', Controller.deleteBook)

router.get('/reads/:bookId', Controller.readPage)

router.get('/bookmark/:BookId/:UserId')




module.exports = router