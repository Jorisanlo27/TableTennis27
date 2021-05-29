const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const clienteDB = require('../models/modelo')

router.get('/', (req, res) => res.render('pages/index'));
router.get('/home', (req, res) => res.render('pages/index'));
router.get('/products', (req, res) => res.render('pages/products'));
router.get('/about', (req, res) => res.render('pages/about'));
router.get('/contact', (req, res) => res.render('pages/contact'));


// find *
router.get('/clientes', (req, res) => {
    try {
        clienteDB.find({}, (err, results) => {
            res.render('pages/clientes', {
                clientesList: results
            })
        })
    } catch (err) {
        res.send(json({
            message: error.message
        }))
    }
})


// insert one
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

// update one
router.post('/upCliente', async (req, res) => {
    try {
        clienteDB.findOneAndUpdate({email: req.body.emailform}, {name: req.body.nameform}, (err, result) => {
            if (err) throw err
        })

        clienteDB.findOneAndUpdate({email: req.body.emailform}, {phone: req.body.phoneform}, (err, result) => {
            if (err) throw err
        })

        res.send('Cliente actualizado correctamente <br> <div style="text-align: center;"><h2>Volver a el form</h2><form action="/clientes" method="get"><button class="btn btn-primary" type="submit">← Volver</button></form></div>')

    } catch (error) {
        console.log(error.message);
    }
})

// delete one
router.get('/delCliente/:id', getCliente, (req, res) => {
    try {
        var removeById = function (personId) {
            clienteDB.findByIdAndDelete(personId, (err, deletedCliente) => {
                if (err) throw err
                else {
                    deletedCliente.remove()
                }
            })
        }
        removeById(res.cliente.id)
        res.send('Cliente Eliminado correctamente <br> <div style="text-align: center;"><h2>Volver a el form</h2><form action="/clientes" method="get"><button class="btn btn-primary" type="submit">← Volver</button></form></div>')
    } catch (error) {
        res.status(500).send(json({
            message: error.message
        }))
    }
})

async function getCliente(req, res, next) {
    let cliente
    try {
        cliente = await clienteDB.findById(req.params.id)
        if (cliente == null) {
            return res.status(404).json({
                message: 'Estudiante no encontrado'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.cliente = cliente
    next()
}

module.exports = router