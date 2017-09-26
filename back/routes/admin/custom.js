/**
 * Created by user on 2017/9/25.
 */
var express = require('express');
var router = express.Router();
var db = require('../../db.js');
var pathLib = require('path');
var fs = require('fs');

router.get('/', (req, res)=>{
    switch (req.query.act) {
        case 'mod':
            break;
        case 'del':
            db.query(`DELETE FROM custom_table WHERE ID = ${req.query.id}`, (err, data)=> {
                if (err) {
                    console.log(err);
                    res.status(500).send('Database Error', err).end();
                } else {
                    res.redirect('/admin/custom');
                }
            });
            break;
        default :
            db.query(`SELECT * FROM custom_table`, (err, data)=> {
                if (err) {
                    console.log(err);
                    res.status(500).send('Database Error', err);
                } else {
                    res.render('admin/custom.ejs', {result: data});
                }
            });
    }
});

router.post('/', (req, res)=> {
    var title = req.body.title;
    var description = req.body.description;

    console.log(req.body);
    console.log(req.files);

    var ext = pathLib.parse(req.files[0].originalname).ext;
    var oldPath = req.files[0].path;
    var newPath = req.files[0].path+ext;
    var newFileName = req.files[0].filename+ext;

    fs.rename(oldPath, newPath, (err)=>{
        if(err){
            res.status(500).send('File operation error').end();
        }else{
            if(req.body.ID){              //修改
                db.query(`UPDATE custom_table SET title='${title}',description = '${description}',src = '${newFileName}' WHERE ID = ${req.body.ID}`,
                    (err, data)=> {
                        if(err){
                            console.log('Error',err);
                        }else{
                            console.log('插入');
                            res.redirect('/admin/custom');
                        }
                    });
            }else{                          //添加
                db.query(`INSERT INTO custom_table (title, description, src) VALUES ('${title}','${description}','${newFileName}')`,
                    (err, data)=> {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Database Error', err).end();
                        } else {
                            console.log('添加');
                            res.redirect('/admin/custom');
                        }
                    }
                );
            }
        }
    });
});

router.post('/get',(req, res)=> {
    var ID = req.body.id;
    db.query(`SELECT * FROM custom_table WHERE ID = ${req.body.id}`,(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).send('Database Error', err).end();
        }else{
            console.log(data);
            res.send(data[0]);
        }
    });
});

module.exports = router;