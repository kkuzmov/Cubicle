const {Router} = require('express');
const router = Router();
const productService = require('../services/productService');
const { validateProduct }= require('../controllers/helpers/productHelper');


router.get('/', (req, res) => {
    let products = productService.getAll(req.query)
        .then(products => {
            res.render('home', {title: 'Home', products})
            console.log(products)
        })
        .catch(()=> res.status(500).end())
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
router.get('/details/:productId', async (req, res) => {

   let product = await productService.getOne(req.params.productId);
   console.log(product)
    res.render('details', {title: 'Details', product});
})


// CONTROLLER ИЗПОЛЗВА ФУНКЦИИТЕ, СЪЗДАДЕНИ В PRODUCTSERVICE ЗА СЪЗДАВАНЕ ИЛИ ИЗВИКВАНЕ НА ВСИЧКИ ПРОДУКТИ
// ЧАСТ ОТ EXAM PACKAGE


module.exports = router;