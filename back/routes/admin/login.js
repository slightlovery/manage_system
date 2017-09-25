/**
 * Created by user on 2017/9/25.
 */
var express = require('express');
var router = express.Router();
var common = require('../../libs/common.js');
var db = require('../../db.js');

router.get('/', (req, res)=>{
    console.log(req.session['admin_id']);
    res.render('admin/login.ejs', {});
});

router.post('/', (req, res)=>{
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
                    req.session['admin_name']=data[0].username;
                    res.redirect('/admin/');
                }else{
                    res.status(400).send('this password is incorrect').end();
                }
            }
        }
    });
});    //接收用户登录

module.exports = router;