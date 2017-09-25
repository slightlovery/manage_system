/**
 * Created by user on 2017/9/25.
 */


var express = require('express');
var router = express.Router();
var db = require('../../db.js');

router.get('/', (req, res)=> {
    switch (req.query.act) {
        case 'mod':
            break;
        case 'del':
            db.query(`DELETE FROM banner_table WHERE ID = ${req.query.id}`, (err, data)=> {
                if (err) {
                    console.log(err);
                    res.status(500).send('Database Error', err).end();
                } else {
                    res.redirect('/admin/banners');
                }
            });
            break;
        default :
            db.query(`SELECT * FROM banner_table`, (err, data)=> {
                if (err) {
                    console.log(err);
                    res.status(500).send('Database Error', err);
                } else {
                    res.render('admin/banners.ejs', {result: data});
                }
            });
    }
});

router.post('/', (req, res)=> {
    var title = req.body.title;
    var description = req.body.description;
    var href = req.body.href;

    if(req.body.ID){              //修改
        db.query(`UPDATE banner_table SET title='${title}',description = '${description}',href = '${href}' WHERE ID = ${req.body.ID}`,
            (err, data)=> {
            if(err){
                console.log('Error',err);
            }else{
                console.log('插入');
                res.redirect('/admin/banners');
            }
        });
    }else{                          //添加
        db.query(`INSERT INTO banner_table (title, description, href) VALUES ('${title}','${description}','${href}')`,
            (err, data)=> {
                if (err) {
                    console.log(err);
                    res.status(500).send('Database Error', err).end();
                } else {
                    console.log('添加');
                    res.redirect('/admin/banners');
                }
            }
        );
    }


});

router.post('/get',(req, res)=> {
    var ID = req.body.id;
    db.query(`SELECT * FROM banner_table WHERE ID = ${req.body.id}`,(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).send('Database Error', err).end();
        }else{
            console.log(data[0]);
            res.send(data[0]);
        }
    });
});

module.exports = router;
