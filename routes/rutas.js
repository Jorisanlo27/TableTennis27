const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const clienteDB = require('../models/modelo')

router.get('/', (req, res) => res.render('pages/index'));
router.get('/home', (req, res) => res.render('pages/index'));
router.get('/about', (req, res) => res.render('pages/about'));
router.get('/products', (req, res) => res.render('pages/products'));
router.get('/contact', (req, res) => res.render('pages/contact'));

router.post('/contact', (req, res) => {
    const {
        name,
        email,
        phone,
        message
    } = req.body;

    contentHTML = `
        <h1>Client Information</h1>
        <ul>
            <li>Username: ${name}</li>
            <li>email: ${email}</li>
            <li>phone: ${phone}</li>
        </ul>
        <p>${message}</p>
    `
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'proyectofinaljorge@gmail.com',
            pass: 'tabletennis27'
        }
    })

    const mailOption = {
        from: "'proyectofinaljorge@gmail.com'", // sender address
        to: "jorgersantana27@gmail.com", // receiver
        subject: "Contact form", // Subject
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