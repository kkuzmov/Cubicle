const {Router} = require('express');
const router = Router();
const productService = require('../services/productService');
const { validateProduct }= require('../controllers/helpers/productHelper');


router.get('/', (req, res) => {
    let products = productService.getAll(req.query)
    res.render('home', {title: 'Home', products});
    // ВЗИМАШ ВСИЧКИ ПРОДУКТИ ОТ БАЗАТА ДАННИ, РЕНДЕРИРА 'home' от папка views и задаваш title и products като параметри
})
router.get('/create', (req, res) => {
    res.render('create', {title: 'Create a cube'});
})
router.post('/create', validateProduct, (req, res) => {

    productService.createCube(req.body)
        .then(()=> res.redirect('/products'))
        .catch(()=> res.status(500).end())
})
router.get('/details/:productId', (req, res) => {
    console.log(req.params.productId);

   let product = productService.getOne(req.params.productId);

    res.render('details', {title: 'Details', product});
})


// CONTROLLER ИЗПОЛЗВА ФУНКЦИИТЕ, СЪЗДАДЕНИ В PRODUCTSERVICE ЗА СЪЗДАВАНЕ ИЛИ ИЗВИКВАНЕ НА ВСИЧКИ ПРОДУКТИ
// ЧАСТ ОТ EXAM PACKAGE


module.exports = router;