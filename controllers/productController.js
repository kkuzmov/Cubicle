const { Router } = require('express');

const router = Router();


router.get('/', (req, res)=>{
    res.render('home', {title: 'Home'});
})
router.get('/create', (req, res)=>{
    res.render('create', {title: 'Create a cube'});
})
router.post('/create', (req, res)=>{
    res.redirect('/products')
})
router.get('/details/:productId', (req, res)=>{
    console.log(req.params.productId);
    res.render('details', {title: 'Details'});
})

module.exports = router;