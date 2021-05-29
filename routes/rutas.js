const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const clienteDB = require('../models/modelo')

router.get('/', (req, res) => res.render('pages/index'));
router.get('/home', (req, res) => res.render('pages/index'));
router.get('/about', (req, res) => res.render('pages/about'));
router.get('/products', (req, res) => res.render('pages/products'));

router.get('/clientes', (req, res) => {
    try {
        clienteDB.find({}, (err, results) => {
            res.render('clientes', {
                clientesList: results
            })
        })
    } catch (err) {
        res.send(json({
            message: error.message
        }))
    }
})



router.get('/contact', (req, res) => res.render('pages/contact'));

router.post('/contact', (req, res) => {
    const {
        name,
        email,
        phone,
        message
    } = req.body;

    contentHTML = `
    <div style="width: 70%; margin: 0 auto;">
        <h1 style="color: red;">CLIENT INFORMATION</h1>
    
        <h2>Thank you for contact us!</h2>
        <ul style="list-style: none;">
            <li><span style="font-weight: bold;">Username:</span> ${name}</li>
            <li><span style="font-weight: bold;">email:</span> ${email}</li>
            <li><span style="font-weight: bold;">phone:</span> ${phone}</li>
        </ul>
        <p>${message}</p>
    </div>
    `
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'proyectofinaljorge@gmail.com',
            pass: 'tabletennis27'
        }
    })

    const mailOption = {
        from: "proyectofinaljorge@gmail.com", // sender address
        to: "proyectofinaljorge@gmail.com", // receiver
        subject: `Hola, ${name}`, // Subject
        html: contentHTML // html body
    };

    try {
        clienteDB.find({
            email: req.body.email
        }, (err, results) => {
            if (!results.length > 0) {
                try {
                    const newCliente = new clienteDB({
                        name: req.body.name,
                        email: req.body.email,
                        phone: req.body.phone
                    })
                    newCliente.save()
                    console.log('cliente agregado!');
                } catch (error) {
                    throw error
                }
            } else {
                console.log('El cliente existe');
            }

            transporter.sendMail(mailOption, err => {
                if (err) throw err
                else console.log('Email enviado!');
            })
            res.render('pages/index')
        })
    } catch (err) {
        throw err
    }
})

module.exports = router