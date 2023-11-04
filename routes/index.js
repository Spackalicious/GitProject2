const { auth } = require('express-openid-connect');
const dotenv = require('dotenv');
dotenv.config;

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SESSION_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

const express = require('express');
const router = express.Router();

// auth router attaches /login, /logout, and /callback routes to base url
router.use(auth(config));
router.get('/checkLoginStatus', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// get the user profile information??
const { requiresAuth } = require('express-openid-connect');

router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});
// router.get('/musicBooks', requiresAuth(), (req, res) => {
//     res.send('/musicBooks', require('./musicBooks'))
// });
router.use('/', requiresAuth(), (req, res) => {
    res.send("Pick an actual route!");
  });
router.use('/', requiresAuth(), require('./swagger'));
router.use('/musicBooks', requiresAuth(), require('./musicBooks'));
router.use('/students', requiresAuth(), require('./students'));

// router.use('/', require('./swagger'));
// router.use('/musicBooks', require('./musicBooks'));
// router.use('/students', require('./students'));

module.exports = router;
