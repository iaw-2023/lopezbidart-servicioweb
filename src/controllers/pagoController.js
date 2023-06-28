const morgan = require('morgan');
const mercadopago = require("mercadopago");
const pedidosController= require('./pedidosController');

// Para aceptar la variable de entorno
require("dotenv").config();
mercadopago.configure({ access_token: process.env.ACCESS_TOKEN });

//Se usa para que cuando se reciben muchas notificaciones del mismo pago solo se haga 1 post a la base de datos
let paymentAux = 0;

const postFeedback = (req, res) => {      
  const { query } = req;
  const topic = query.topic || query.type;

  if (topic === "payment") {
    const paymentId = query.id || query['data.id'];
    if(paymentAux != paymentId) {
      paymentAux = paymentId;
    mercadopago.payment.capture(paymentId, mercadopago, (error, response) => {
      if (error){
          console.log(error);
      }else{
          if( response.body.status === 'approved') {
              //Obtengo los datos de la compra
              let compra = response.body.additional_info.items;
              //Creo el pedido y los detalles del pedido para agregarlos a la base de datos
              let pedido = {};
              let detalles = [];
              let costoTotal = 0;
              let cliente_id = parseInt(compra[0].id);
              const fecha = new Date(Date.now());

              for (let i in compra) {
                

                costoTotal += (parseInt(compra[i].unit_price)*parseInt(compra[i].quantity));

                const nuevoDetalle = {
                  producto: compra[i].description,
                  cantidad: parseInt(compra[i].quantity),
                  costo_detalle: (parseInt(compra[i].quantity)*parseInt(compra[i].unit_price)),
                };

                detalles.push(nuevoDetalle);
              }

              pedido = {
                id_cliente: cliente_id,
                fecha: fecha,
                costo_final: costoTotal,
              };

              pedidosController.addPedidoDetalles({ body: { pedido: pedido, detalle: detalles } }, res);

          }
          
      }
    });
    }
  }

};

const postPago = (req, res) => {
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');

  const { cliente, compra } = req.body;
  const productos = [];

  for (let i in compra) {
    productos[i] = {
      id: cliente.id,
      title: 'Cortina Roller',
      currency_id: 'ARS',
      picture_url: 'https://i.ibb.co/hRKpTbP/logo-png.png',
      description: compra[i].detalle,
      category_id: 'art',
      quantity: parseInt(compra[i].cantidad),
      unit_price: parseInt(compra[i].costo),
    };
  }

  // Declaramos las preferencias de pago
  let preference = {
    items: productos,
    payer: {
      email: cliente.email,
    },
    notification_url:'https://lopez-bidart-servicio-web.vercel.app/api/feedback', //URL a la que se notifica cuando se hace el pago
    back_urls: {
      success: '',
      pending: '',
      failure: '',
    },
    binary_mode: true,
  };

  //crea el link de pago y lo devuelve
  mercadopago.preferences.create(preference)
  .then((response) => res.status(201).send({ response }))
  .catch((error) => res.status(400).send({ error: error.message }));

    
};

module.exports = {
  postPago,
  postFeedback,
  getFeedback
};
