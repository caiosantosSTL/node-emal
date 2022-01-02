const express = require('express')
const nodemailer = require('nodemailer')
const path = require('path'); //caminho de rotas
const bodyParser = require('body-parser'); //para pegar infos do formulario
require('dotenv').config() // criar arquivo .env

const app = express()
const port = process.env.PORT

// seu email e password
const user = process.env.USER_MAIL
const passw = process.env.EMAIL_PASSW
// service
const servicex = process.env.SERVICE

//body parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// index
app.get('/', function (req, res) {
    res.send('oi oi')
})

app.get('/form', function(req, res){
    res.sendFile(path.join(__dirname+'/form.html'));
})

app.post('/voo', function(req, res){
    
    console.log('Foi nome '+req.body.nomex+' e email '+req.body.emailx)
})


app.post('/send', function (req, res) {

    const transport = nodemailer.createTransport({
        service: `${servicex}`,
        auth: {
            user: `${user}`,
            pass: `${passw}`
        }

    })
    //con body parser pegamos as infos do formulario
    var nomev = req.body.nomex
    var emailv = req.body.emailx

    var mailOptions = {
        from: `${user}`,
        to: `${emailv}`,
        subject: `Sending Email using Node.js`,
        text: `Do formulario colocamos ${nomev} e tambem o email ${emailv}`
    };

    transport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.redirect('/form')

})

app.listen(port, function () {
    console.log(`Rodando na porta ${port}`)
})

// run projeto com: npm run start /* por causa do nodemon *