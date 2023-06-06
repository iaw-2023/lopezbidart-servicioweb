const { DatabaseError } = require('pg/lib');
const pool = require('../../db');
const queries= require('../queries/pedidosQueries');
const queriesClientes= require('../queries/clientesQueries');

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

const addPedido = (req, res) => {
    
    const {id_cliente, fecha , costo_final } = req.body;
        
    pool.query(queriesClientes.getClientesById, [id_cliente], (error, results)=> {
        if (results.rows.length){
        

            pool.query(
                queries.addPedido,
                [id_cliente, fecha, costo_final,new Date(),new Date()],
                (error, results)=>{
                    if (error) throw error;
                    res.status(200).send("Pedido agregado exitosamente");
                }
            
            );
        }else {
            res.send("No existe cliente con ese id");
        }
    });
};

module.exports = {
    getPedidosByIdCliente,
    getPedidosById,
    addPedido
    
};