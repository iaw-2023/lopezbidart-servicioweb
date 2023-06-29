const { DatabaseError } = require('pg/lib');
const pool = require('../../db');
const queries= require('../queries/pedidosQueries');
const queriesClientes= require('../queries/clientesQueries');
const queriesDetalles= require('../queries/detallesQueries');

//Metodo para uso interno
const getPedidosById= (req, res) => {
    const id= parseInt(req.params.id);
    pool.query(queries.getPedidosById,[id], (error, results)=>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getPedidosByIdCliente= (req, res) => {
  const id_cliente= parseInt(req.params.id_cliente);
  pool.query(queries.getPedidosByIdCliente,[id_cliente], (error, results)=>{
      if (error) throw error;
      res.status(200).json(results.rows);
  });
};
  

const addPedido = async (req, res) => {
    const { id_cliente, fecha, costo_final } = req.body;
    pool.query(queriesClientes.getClientesById, [id_cliente], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error al consultar la base de datos");
        return;
      }
      if (results.rows.length) {
        pool.query(
          queries.addPedido,
          [id_cliente, fecha, costo_final, new Date(), new Date()],
          (error, results) => {
            if (error) {
              console.error(error);
              res.status(500).send("Error al crear el pedido");
            } else {
              res.status(200).send("Pedido creado correctamente");
            }
          }
        );
      } else {
        res.status(404).send("No existe cliente con ese id");
      }
    });
};

//Metodo para uso interno
const addPedidoDetalles = async (req, res) => {
  const { id_cliente, fecha, costo_final } = req.body.pedido;
  const detalles = req.body.detalle;
  let detallesInsertados = 0; // Contador de detalles insertados

  pool.query(queriesClientes.getClientesById, [id_cliente], (error, results) => {
    console.log(results);
    if (error) {
      console.error(error);
      res.status(500).send("Error al consultar la base de datos");
      return;
    }
    if (results.rows.length) {
      pool.query(
        queries.addPedido,
        [id_cliente, fecha, costo_final, new Date(), new Date()],
        (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).send("Error al crear el pedido");
          } else {
            const pedidoId = results.rows[0].id; // Obtener el ID del pedido insertado
            for (let i in detalles) {
              pool.query(
                queriesDetalles.addDetalle,
                [
                  pedidoId,
                  detalles[i].producto,
                  detalles[i].cantidad,
                  detalles[i].costo_detalle,
                  new Date(),
                  new Date(),
                ],
                (error, results) => {
                  if (error) throw error;
                  detallesInsertados++; // Incrementar el contador de detalles insertados

                  if (detallesInsertados === detalles.length) {
                    // Verificar si se han insertado todos los detalles
                    res.status(200).send("Pedido y detalles agregados exitosamente");
                  }
                }
              );
            }
          }
        }
      );
    } else {
      res.status(404).send("No existe cliente con ese id");
    }
  });
};


module.exports = {
    getPedidosByIdCliente,
    getPedidosById,
    addPedido,
    addPedidoDetalles
};