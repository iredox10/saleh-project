// Dependencies
// if(process.env.NODE.ENV != 'production'){
// 	require('dotenv').parse()
// }

require('dotenv').config()
const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const authCont = require('./controller/authcont')
// connecting to mongodb
mongoose
	.connect(process.env.DB_URL)
	.then((data) => app.listen(process.env.PORT|| 3000))
	.catch((err) => console.log(err));

app.use (express.urlencoded({extended:false}))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(methodOverride('_method'))
// request
app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/registration', authCont.get_register)
app.post('/registration', authCont.post_register)
app.get('/log', authCont.get_log)
app.post('/log', authCont.post_log)
app.get('/admin',authCont.get_admin)
app.get('/clearance/:id', authCont.clearance)
app.get('/:id',authCont.get_user)
app.delete('/:id',authCont.delete_user)

