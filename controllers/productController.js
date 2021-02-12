const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');


const { validateProduct } = require('../controllers/helpers/productHelper');
const accessoryService = require('../services/accessoryService');

router.get('/', (req, res) => {
    let products = productService.getAll(req.query)
        .then(products => {
            res.render('home', {title: 'Home', products})
        })
        .catch(() => res.status(500).end())
    // ВЗИМАШ ВСИЧКИ ПРОДУКТИ ОТ БАЗАТА ДАННИ, РЕНДЕРИРА 'home' от папка views и задаваш title и products като параметри
})
router.get('/create', isAuthenticated, (req, res) => {
    res.render('create', {title: 'Create a cube'});
})
router.post('/create', isAuthenticated, validateProduct, (req, res) => {

    productService.createCube(req.body, req.user._id)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end())
})
router.get('/details/:productId', async (req, res) => {

    let product = await productService.getOneWithAccessories(req.params.productId);
    res.render('details', {title: 'Details', product});
})
router.get('/:productId/attach', isAuthenticated, async (req, res) => {
    let product = await productService.getOne(req.params.productId);
    let accessories = await accessoryService.getAllWithout(product.accessories);
    res.render('attachAccessory', {title: 'Attach an accessory', product, accessories});
})
router.post('/:productId/attach', isAuthenticated, (req, res)=>{
    productService.attachAccessory(req.params.productId, req.body.accessory)
        .then(() =>{ res.redirect(`/products/details/${req.params.productId}`)})
})
router.get('/:productId/edit', isAuthenticated, (req, res)=>{
    productService.getOne(req.params.productId)
        .then(product =>{
            res.render('editCubePage', product);
        })
})
router.post('/:productId/edit', isAuthenticated, validateProduct,(req, res)=>{

    productService.updateOne(req.params.productId, req.body)
        .then(response =>{
            res.redirect(`/products/details/${req.params.productId}`)
        })
        .catch(err=>{
            console.log(err)
        })
})
// CONTROLLER ИЗПОЛЗВА ФУНКЦИИТЕ, СЪЗДАДЕНИ В PRODUCTSERVICE ЗА СЪЗДАВАНЕ ИЛИ ИЗВИКВАНЕ НА ВСИЧКИ ПРОДУКТИ
// ЧАСТ ОТ EXAM PACKAGE
router.get('/:productId/delete', isAuthenticated, (req, res)=>{
    productService.getOne(req.params.productId)
        .then(product =>{
            if(req.user._id != product.creator){
                res.redirect('/products')
            }else{
                res.render('deleteCubePage', product);            
            }
        })
})
router.post('/:productId/delete', isAuthenticated, (req, res)=>{
    productService.getOne(req.params.productId)
        .then(product =>{
            if(product.creator != req.user._id){
                return res.redirect('/products')
            }
            return productService.deleteOne(req.params.productId)
        })
        .then(response => res.redirect('/products'))
})

module.exports = router;