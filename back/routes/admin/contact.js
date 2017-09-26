/**
 * Created by user on 2017/9/25.
 */
var express = require('express');
var router = express.Router();
var db = require('../../db.js');

router.get('/', (req, res)=>{
    db.query(`SELECT * FROM contact_table`,(err, data)=>{
        if(err){
            console.log(err);
            res.status(500).send('Database Error', err).end();
        }else{
            console.log(data[0]);
            res.render('admin/contact.ejs', {result: data[0]});
        }
    });
});

router.post('/', (req, res)=>{
    var address = req.body.address;
    var phone = req.body.phone;
    var QQ = req.body.QQ;
    var email = req.body.email;
    var weibo = req.body.weibo;
    var wechat = req.body.wechat;

    db.query(`UPDATE contact_table SET address = '${address}', phone = '${phone}', QQ = '${QQ}',
    email = '${email}', weibo = '${weibo}', wechat = '${wechat}'`,(err, data)=>{
        if(err){
            console.log(err);
            res.status(500).send('Database Error', err).end();
        }else{
            console.log('success');
            res.redirect('/admin/contact');
        }
    });
});

module.exports = router;