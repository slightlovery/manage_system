var express = require('express');
var router = express.Router();
var common = require('../../libs/common.js');
var db = require('../../db.js');
var banners = require('./banners.js');
var login = require('./login.js');
var blog = require('./blog.js');
var contact = require('./contact.js');
var custom = require('./custom.js');
var intro = require('./intro.js');
var msg = require('./msg.js');
var news = require('./news.js');

router.use((req, res, next)=>{
    if(!req.session['admin_id'] && req.url!='/login'){ //没有登录
        res.redirect('/admin/login');
    }else{
        next();
    }
});        //admin下的全局拦截，判断用户是否已登录

router.get('/', (req, res)=>{
    res.render('admin/index.ejs', {});
});          //主页

router.use('/login/',login);

router.use('/banners/',banners);

router.use('/blog/',blog);

router.use('/contact/',contact);

router.use('/intro/',intro);

router.use('/custom/',custom);

router.use('/msg/',msg);

router.use('/news/',news);

module.exports = router;
