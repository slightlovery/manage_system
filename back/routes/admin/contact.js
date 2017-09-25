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
    //
});

module.exports = router;