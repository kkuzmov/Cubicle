const { Router } = require('express');



const productController = require('./controllers/productController');
const accessoryController = require('./controllers/accessoryController');
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');

const router = Router();

router.use('/', homeController);
router.use('/auth', authController);
router.use('/products', productController);
router.use('/accessories', accessoryController);
router.get('*', (req, res)=>{
    res.render('404')
})

module.exports = router;

// router използва home controller, ако path започва без нищо - напр. localhost:3000/....
// router използва product Controller, ако path започва с /products, напр. localhost:3000/products/....
// router използва рендерира 404, ако пътят не започва с / или /products, т.е. за всички останали.
// ЧАСТ ОТ EXAM PACKAGE