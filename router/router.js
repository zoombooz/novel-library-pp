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
router.get('/books-admin', Controller.homePageAdmin)
router.get('/books/add', Controller.addBook)
router.post('/books/add', Controller.processBook)
router.get('/reads/:bookId', Controller.readPage)
router.get('/authors', Controller.authorPage)



module.exports = router