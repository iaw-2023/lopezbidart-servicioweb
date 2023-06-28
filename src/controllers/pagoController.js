const morgan = require('morgan');
const mercadopago = require("mercadopago");
const pedidosController= require('./pedidosController');



// Para aceptar la variable de entorno
require("dotenv").config();
mercadopago.configure({ access_token: process.env.ACCESS_TOKEN });

/*

mercadopago.configure({
		access_token: ACCESS_TOKEN,
		access_control_allow_origin: '*',
		access_control_allow_methods: 'GET, POST',
		access_control_allow_headers: 'Authorization, Content-Type',
});
*/
//let pedido = {};
//let detalles = [];

// Para que se ejecute solo una vez el post del pedido
let paymentAux = 0;

const getFeedback = async (req, res) => {

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
              
              //console.log(paymentId);
              //el metodo anda bien probar si imprime...
              //otro dato, sin ningun if, parece que se agrego un solo pedido y los detalles, verificar eso...
              pedidosController.addPedidoDetalles({ body: { pedido: this.pedido, detalle: this.detalles } }, res);

          } else {
              pedido = {};
              detalles.length = 0;
          }
          
      }
    });
    }
  }

};



const postFeedback = (req, res) => {      
  
  //console.log('entre');
  const { query } = req;
  //console.log(query);
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
              
              //console.log(response);
              //console.log(response.body.additional_info.items);
              let compra = response.body.additional_info.items;
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

              //console.log(pedido);
              //console.log(detalles);
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

  //const fecha = new Date(Date.now());
  const { cliente, compra } = req.body;

  const productos = [];
  //let costoTotal = 0;

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
/*
    costoTotal += compra[i].costo;

    const nuevoDetalle = {
      id_pedido:0,
      producto: compra[i].detalle,
      cantidad: parseInt(compra[i].cantidad),
      costo_detalle: parseInt(compra[i].costo) * parseInt(compra[i].cantidad),
    };
*/
    //detalles.push(nuevoDetalle);
  }
/*
  pedido = {
    id_cliente: cliente.id,
    fecha: fecha,
    costo_final: costoTotal,
  };*/
  //console.log(pedido);
  let preference = {
    // Declaramos las preferencias de pago
    items: productos,
    payer: {
      email: cliente.email,
    },
    notification_url:'https://lopez-bidart-servicio-web-nacholb22.vercel.app/api/feedback',
    //purpose: 'wallet_purchase',
    back_urls: {
      success: '',
      pending: '',
      failure: '',
    },
    binary_mode: true,
  };

    
  
    mercadopago.preferences.create(preference)
    .then((response) => res.status(201).send({ response }))
    .catch((error) => res.status(400).send({ error: error.message }));

    
};

module.exports = {
  postPago,
  postFeedback,
  getFeedback
};
