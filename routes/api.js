var express = require('express');
var router = express.Router();
var user_api = require('../controller/api/user.api.controller')
var comic_api = require('../controller/api/comic.api.controller')
var comment_api = require('../controller/api/comment.api.controller')
var multer = require('multer');
var uploader = multer({dest: './tmp'});
var uploaderarray = multer({dest: './tmp'});


router.get('/user',user_api.listUser);
router.get('/user/login',user_api.loginApp);
router.post('/user/register',user_api.register);


router.get('/comic',comic_api.listComic);
router.get('/comicfa',comic_api.listComicFavorite);
router.post('/comic/add',uploader.fields([{name : "img" ,maxCount : 1},{name : "imgnd"}]),comic_api.addComic);
router.put('/comic/edit/:idcomic',uploader.fields([{name : "img" ,maxCount : 1},{name : "imgnd"}]),comic_api.updateComic);
router.delete('/comic/delete/:idcomic',comic_api.deleteComic);

router.put('/comicfa/add/:idcomic',comic_api.addFavorite);
router.get('/comment',comment_api.listComment)
router.get('/findcomment',comment_api.findlistComment)
router.post('/comment/add',comment_api.addcomment)
router.put('/comment/edit/:idcomment',comment_api.updatecomment)
router.delete('/comment/delete/:idcomment',comment_api.deletecomment)


router.put('/user/edit/:iduser',user_api.updateUser)
router.delete('/user/delete/:iduser',user_api.deleteUser)
router.post('/user/changerpass',user_api.changerPassword)
module.exports = router;