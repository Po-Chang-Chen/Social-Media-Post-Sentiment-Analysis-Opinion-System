const express = require('express');
const cors = require('cors')
const app = express();
const port =7000; // your server port
app.use(express.json())
app.use(cors())
app.listen(port, () => {
    console.log(`RUN http://localhost:${port}`)
});
let mysql = require("mysql");
var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "pttDatabase",
    multipleStatements: true,
    connectionLimit: 10

});
let sqlConnection = (sql) => {
    return new Promise((resolve, reject) => {

        pool.query(sql, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}

//con.query('select * from News', function (err, rows) {
    //if (err) throw err;
    //console.log('Response: ', rows);
//});
app.get('/news/title', async function (req, res) {
    const sql = 'select news_title from News;'
    var response = [];
    console.log(sql);
    try {
        result = await sqlConnection(sql);
        console.log(result);
        result.forEach(function (item, index, array) {
            response.push(item['news_title'])
        });
    } catch (e) {
        console.log(e);
    }
    res.send(response);
});
app.get('/news/id', async function (req, res) {
    const sql = 'select id from News;'
    var response = [];
    console.log(sql);
    try {
        result = await sqlConnection(sql);
        console.log(result);
        result.forEach(function (item, index, array) {
            response.push(item['id'])
        });
    } catch (e) {
        console.log(e);
    }
    res.send(response);
});
app.get('/news/content', async function (req, res) {
    const sql = 'select news_content from News;'
    var response = [];
    console.log(sql);
    try {
        result = await sqlConnection(sql);
        console.log(result);
        result.forEach(function (item, index, array) {
            response.push(item['news_content'])
        });
    } catch (e) {
        console.log(e);
    }
    res.send(response);
});
//app.get('/comments/label', async function (req, res) {
//    const sql = 'select label from comments where comment_id = news_id;'
//    var response = [];
//    console.log(sql);
//    try {
//        result = await sqlConnection(sql);
//        console.log(result);
//        result.forEach(function (item, index, array) {
//            response.push(item['label'])
//        });
//    } catch (e) {
//        console.log(e);
//    }
//    res.send(response);
//});
app.get('/comments/id', async function (req, res) {
    const sql = 'select comment_id from comments where comment_id = news_id;'
    var response = [];
    console.log(sql);
    try {
        result = await sqlConnection(sql);
        console.log(result);
        result.forEach(function (item, index, array) {
            response.push(item['comment_id'])
        });
    } catch (e) {
        console.log(e);
    }
    res.send(response);
});
app.get('/comments/content', async function (req, res) {
    const sql = 'select comments_content from comments where comment_id = news_id;'
    var response = [];
    console.log(sql);
    try {
        result = await sqlConnection(sql);
        console.log(result);
        result.forEach(function (item, index, array) {
            response.push(item['comments_content'])
        });
    } catch (e) {
        console.log(e);
    }
    res.send(response);
});
//con.query('select * from News,comments where News.id=comments.news_id', function (err, rows) {
  //  if (err) throw err;
    //console.log('Response: ', rows[0]);
    //res.send(rows);
//});