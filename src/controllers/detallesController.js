const pool = require('../../db');
const queries= require('../queries/detallesQueries');
const queriesPedidos= require('../queries/pedidosQueries');


const getDetallesById= (req, res) => {
    const id_pedido= parseInt(req.params.id_pedido);
    pool.query(queries.getDetallesById,[id_pedido], (error, results)=>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};


const addDetalle = (req, res) => {
    
    const {id_pedido, producto , cantidad, costo_detalle } = req.body;
        
    pool.query(queriesPedidos.getPedidosById, [id_pedido], (error, results)=> {
        if (results.rows.length){
                    pool.query(
                        queries.addDetalle,
                        [id_pedido, producto, cantidad, costo_detalle,new Date(),new Date()],
                        (error, results)=>{
                            if (error) throw error;
                            res.status(200).send("Detalle agregado exitosamente");
                        }
                    
                    );
                
        }
        else { res.send("El id de pedido no existe");
        }
    });
};

module.exports = {
    getDetallesById,
    addDetalle
    
};