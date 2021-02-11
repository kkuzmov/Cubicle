const {Router} = require('express');
const accessoryService = require('../services/accessoryService');
const router = Router();

router.get('/create', (req, res) => {
    res.render('createAccessory')
})
router.post('/create', (req, res) => {
    accessoryService.create(req.body)
    .then(()=> res.redirect('/products'))
})

module.exports = router