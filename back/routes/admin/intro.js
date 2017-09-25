/**
 * Created by user on 2017/9/25.
 */
var express = require('express');
var router = express.Router();
var db = require('../../db.js');

router.get('/', (req, res)=>{
    res.render('admin/intro.ejs', {});
});

router.post('/', (req, res)=>{
    //
});

module.exports = router;