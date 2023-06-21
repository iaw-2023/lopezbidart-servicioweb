const morgan = require('morgan');
const pool = require('../../db');
const mercadopago=require("mercadopago");
//Para que acepte la variable de entorno
require("dotenv").config();
mercadopago.configure({access_token: process.env.ACCESS_TOKEN})


const postPago= (req, res) => {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
 
    const {cliente, compra} = req.body;

    const productos = [];
    
    for (let i in compra) {
        productos[i]={
            id: i,
            title: 'Cortina Roller',
            currency_id: 'ARS',
            picture_url: 'https://i.ibb.co/hRKpTbP/logo-png.png',
            description:  compra[i].detalle,
            category_id: 'art',
            quantity: parseInt(compra[i].cantidad),
            unit_price: parseInt(compra[i].costo),
        }
    }
    
    let preference = {
            // declaramos las preferencias de pago
            items: productos,
            payer: { 
              email: cliente.email,
            },
            back_urls: {
                success: 'https://lopezbidart-react.vercel.app/home', 
                pending: '', 
                failure: '', 
            },
            auto_return:'approved',
            binary_mode: true,
    };

    mercadopago.preferences.create(preference).then((response)=>res.status(201).send({response})).catch((error)=>res.status(400).send({error: error.message}));
     
};
 

module.exports = {
    postPago
};
