const morgan = require('morgan');
const pool = require('../../db');
const mercadopago=require("mercadopago");
//Para que acepte la variable de entorno
require("dotenv").config();
mercadopago.configure({access_token: process.env.ACCESS_TOKEN})

const getFeedback= (req, res) => {
    console.log(req.query.status);
    console.log(req.query);
    console.log(req.query);

    /* me da todo esto.. Igual deberia tener una variable guardada por las dudas.. si esta aprobado hago el post y sino la borro
  collection_id: '1315882437',
  collection_status: 'approved',
  payment_id: '1315882437',
  status: 'approved',
  external_reference: 'null',
  payment_type: 'credit_card',
  merchant_order_id: '9976225706',
  preference_id: '159930080-9ce80350-902c-48f7-b9aa-39d176479a70',
  site_id: 'MLA',
  processing_mode: 'aggregator',
  merchant_account_id: 'null'
  payment_id: '1315882437',
  status: 'approved',
  external_reference: 'null',
  payment_type: 'credit_card',
  merchant_order_id: '9976225706',
  preference_id: '159930080-9ce80350-902c-48f7-b9aa-39d176479a70',
  site_id: 'MLA', */
    res.location('http://localhost:3000/Carrito');
    
}

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
                success: 'http://localhost:5000/api/feedback', 
                pending: '', 
                failure: '', 
            },
            auto_return:'approved',
            binary_mode: true,
    };

    mercadopago.preferences.create(preference)
        .then((response)=>res.status(201).send({response})).catch((error)=>res.status(400).send({error: error.message}));
    
            
};  
 

module.exports = {
    postPago,
    getFeedback
};
