var express = require('express');
var router = express.Router();
var userController = require('../controller/api/user.api.controller')

router.get('/',userController.listUser);

module.exports = router;
