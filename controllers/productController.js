const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');

const { validateProduct } = require('../controllers/helpers/productHelper');
const accessoryService = require('../services/accessoryService');

router.get('/', (req, res) => {
    let products = productService.getAll(req.query)
        .then(products => {
            res.render('home', {
                title: 'Home',
                products
            })
        })
        .catch(() => res.status(500).end())
    // ВЗИМАШ ВСИЧКИ ПРОДУКТИ ОТ БАЗАТА ДАННИ, РЕНДЕРИРА 'home' от папка views и задаваш title и products като параметри
})
router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create a cube'
    });
})
router.post('/create', validateProduct, (req, res) => {

    productService.createCube(req.body)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end())
})
router.get('/details/:productId', async (req, res) => {

    let product = await productService.getOneWithAccessories(req.params.productId);
    console.log(product)
    res.render('details', {
        title: 'Details',
        product
    });
})
router.get('/:productId/attach', async (req, res) => {
    let product = await productService.getOne(req.params.productId);
    let accessories = await accessoryService.getAllWithout(product.accessories);
    res.render('attachAccessory', {title: 'Attach an accessory', product, accessories})
})
router.post('/:productId/attach', (req, res)=>{
    productService.attachAccessory(req.params.productId, req.body.accessory)
        .then(() =>{ res.redirect(`/products/details/${req.params.productId}`)})
})

// CONTROLLER ИЗПОЛЗВА ФУНКЦИИТЕ, СЪЗДАДЕНИ В PRODUCTSERVICE ЗА СЪЗДАВАНЕ ИЛИ ИЗВИКВАНЕ НА ВСИЧКИ ПРОДУКТИ
// ЧАСТ ОТ EXAM PACKAGE


module.exports = router;