"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var router = express_1.Router();
exports.router = router;
router.get('/login', function (req, res) {
    res.send("\n        <form method=\"POST\"> \n            <div>\n                <label>Email</label>\n                <input name=\"email\" />\n            </div>\n            <div>\n                <label>Password</label>\n                <input name=\"password\" type=\"password\" />\n            </div>\n            <button>Submit</button>\n        </form>\n    ");
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    //type guard
    if (email && password) {
        if (email === 'hi@hi.com' && password === 'password') {
            //mark this person as logged in
            req.session = { loggedIn: true };
            //redirect to the root route
            res.redirect('/');
        }
        else {
            res.send('Wrong email or password. Cannot log in.');
        }
    }
    else {
        res.send('Error 422: Email or password property is missing.');
    }
});
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n            <div> \n                <div> You are logged in. </div>\n                <a href=\"/logout\">Logout</a>\n            </div>\n        ");
    }
    else {
        res.send("\n            <div> \n                <div> You are logged out. </div>\n                <a href=\"/login\">Log in</a>\n            </div>\n        ");
    }
});
router.get('/logout', function (req, res) {
    req.session = null;
    res.redirect('/');
});
