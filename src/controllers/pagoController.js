const { token } = require('morgan');
const pool = require('../../db');
const queries= require('../queries/clientesQueries');
const bcrypt = require("bcrypt");



const postPago= (req, res) => {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
 
    const datos = req.body;
    const myObj = JSON.parse(datos);

    let cantidad = 0;
    let costoTotal= 0;

    let description="";

    for (const x in myObj.compra) {
        cantidad+=x.cantidad;
        costoTotal+=x.costo;
        description+= x.detalle+"."+"\n"+" ";
    }

    //Ver que completar
    let preference = {
        // declaramos las preferencias de pago
            items: [{
                title: "Cortinas Rollers",
                currency_id:'ARS',
                description: description,
                quantity: cantidad,
                unit_price: costoTotal
            }],
            payer: { 
              email: myObj.cliente.email,
            },
            back_urls: {
                success: "https://lopezbidart-react.vercel.app/home", 
                pending: "", 
                failure: "" 
            },
            auto_return:"approved",
            binary_mode: true
    };

    mercadopago.preferences.create(preference).then((response)=>res.status(200).send(response)).catch((error) => res.status(400).send({error: error.message}));
     
};
 

module.exports = {
    postPago
};
