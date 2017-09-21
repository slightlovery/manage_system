var express = require('express');
var router = express.Router();
var common = require('../libs/common.js');
var db = require('../db.js');

router.use((req, res, next)=>{
    if(!req.session['admin_id'] && req.url!='/login'){ //没有登录
        res.redirect('/admin/login');
    }else{
        next();
    }
});        //admin下的全局拦截，判断用户是否已登录

router.get('/login', (req, res)=>{
    res.render('admin/login.ejs', {});
});

router.post('/login', (req, res)=>{
    var username=req.body.username;
    var password=common.md5(req.body.password+common.MD5_SUFFIX);

    db.query(`SELECT * FROM admin_table WHERE username='${username}'`, (err, data)=>{
        if(err){
            console.error(err);
            res.status(500).send('database error').end();
        }else{
            if(data.length==0){
                res.status(400).send('no this admin').end();
            }else{
                if(data[0].password==password){
                    //成功
                    req.session['admin_id']=data[0].ID;
                    res.redirect('/admin/');
                }else{
                    res.status(400).send('this password is incorrect').end();
                }
            }
        }
    });
});    //接收用户登录

router.get('/', (req, res)=>{
    res.render('admin/index.ejs', {});
});          //主页

router.get('/banners', (req, res)=>{
    res.render('admin/banners.ejs', {});
});

router.post('/banners', (req, res)=>{
    //
});

router.get('/blog', (req, res)=>{
    res.render('admin/blog.ejs', {});
});

router.post('/blog', (req, res)=>{
    //
});

router.get('/contact', (req, res)=>{
    res.render('admin/contact.ejs', {});
});

router.post('/contact', (req, res)=>{
    //
});

router.get('/intro', (req, res)=>{
    res.render('admin/intro.ejs', {});
});

router.post('/intro', (req, res)=>{
    //
});

router.get('/custom', (req, res)=>{
    res.render('admin/custom.ejs', {});
});

router.post('/custom', (req, res)=>{
    //
});

router.get('/msg', (req, res)=>{
    res.render('admin/msg.ejs', {});
});

router.post('/msg', (req, res)=>{
    //
});

router.get('/news', (req, res)=>{
    res.render('admin/news.ejs', {});
});

router.post('/news', (req, res)=>{
    //
});

module.exports = router;
