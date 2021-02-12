const {
    Router
} = require('express');
const authService = require('../services/authService');
const router = Router();
const cookieName = 'USER_SESSION';
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');
const validator = require('validator');
const { body, validationResult } = require('express-validator');

let isStrongPasswordMiddleware = function(req, res, next){
    let password = req.body.password;
    let isStrongPassword = validator.isStrongPassword(password, [{
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }])
    if (!isStrongPassword) {
        return res.render('register', { error: {message: 'You must choose a stronger password!'}, username: req.body.username})
    }
    next();
}

router.get('/login', isGuest, (req, res) => {
    res.render('login')
})
router.post('/login', isGuest, async (req, res) => {
    const {
        username,
        password
    } = req.body;

    try {
        let token = await authService.login({
            username,
            password
        })

        res.cookie(cookieName, token);
        res.redirect('/products')
    } catch (error) {
        res.render('login', {
            error
        })
    }
})

router.get('/register', isGuest, (req, res) => {
    res.render('register')
})

router.post(
    '/register',
    isGuest,
    // body('email', 'Please use an e-mail for registration').isEmail().normalizeEmail(),
    // body('username', 'Specify username').notEmpty(), body('password', 'Password too short!').isLength({min: 6}),
    async (req, res) => {
    const {
        username,
        password,
        repeatPassword
    } = req.body;

    if (password !== repeatPassword) {
        res.render('register', {
            message: 'Passwords do not match!'
        });
        return;
    }
    console.log(req.body.email)
    let errors = validationResult(req)

    if(errors.errors.length > 0){
        return res.render('register', errors);
    }
    try {
        let user = await authService.register({
            username,
            password
        });
        console.log(user);

        res.redirect('/auth/login')
    } catch (error) {
        let errors = Object.keys(error.errors).map(x => ({msg: error.errors[x].message}))
        console.log(errors);
        res.render('register', {errors})
        return;
    }
})
router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie(cookieName);
    res.redirect('/products')
})
module.exports = router;