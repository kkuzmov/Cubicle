const {Router} = require('express');
const router = Router();
const productService = require('../services/productService');
router.get('/', (req, res) => {
    let products = productService.getAll()
    res.render('home', {title: 'Home', products});
})
router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create a cube'
    });
})
router.post('/create', (req, res) => {
    productService.createCube(req.body);    

    res.redirect('/products')
})
router.get('/details/:productId', (req, res) => {
    console.log(req.params.productId);

   let product = productService.getOne(req.params.productId);

    res.render('details', {title: 'Details', product});
})

module.exports = router;