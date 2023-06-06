const pool = require('../../db');
const queries= require('../queries/estilosQueries');
 
const getEstilos= (req, res) => {
    pool.query(queries.getEstilos, (error, results)=>{
        if (error) throw error;
        res.status(200).json(results.rows);

    });
};

const getEstilosById= (req, res) => {
    const id= parseInt(req.params.id);
    pool.query(queries.getEstilosById,[id], (error, results)=>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addEstilos = (req, res) => {
    
    const {tela , precio_m2 } = req.body;
        
    pool.query(queries.checkEstiloExists, [tela.toUpperCase()], (error, results)=> {
        if (results.rows.length){
        res.send("Este Estilo ya existe");
        } 
        else {

            pool.query(
                queries.addEstilos,
                [tela.toUpperCase(), precio_m2,new Date(),new Date()],
                (error, results)=>{
                    if (error) throw error;
                    res.status(200).send("Estilo agregado exitosamente");
                }
            
            );
        }
    });
};

const removeEstilo = (req, res) => {
    const id= parseInt(req.params.id);
    pool.query(queries.getEstilosById,[id], (error, results)=>{
        const EstiloNoFound= !results.rows.length;
        if (EstiloNoFound) {
            res.send("No existe Estilo con ese id");
        }

        pool.query(queries.removeEstilo,[id], (error, results)=>{
            if (error) throw error;
            res.status(200).send("Estilo eliminado");
    
        });
    });
};

const updateEstilo = (req, res) => {
   
    const id= parseInt(req.params.id);
    const {tela, precio_m2 } = req.body;
   
    pool.query(queries.getEstilosById, [id], (error, results)=> {

        const EstiloNoFound= !results.rows.length;
        if (EstiloNoFound) {
            res.send("No existe Estilo con ese id");
        }
        
        pool.query(queries.checkEstiloExistsUpdate, [tela.toUpperCase(), id], (error, results)=> {
            if (results.rows.length){
            res.send("Este Estilo ya existe");
            } 
            else {
    

            pool.query(
                    queries.updateEstilo,
                    [tela.toUpperCase(), precio_m2,new Date(), id],
                    (error, results)=>{
                        if (error) throw error;
                        res.status(200).send("Estilo actualizado exitosamente");
            });
            }
        });
    });
};

module.exports = {
    getEstilos,
    getEstilosById,
    addEstilos,
    removeEstilo,
    updateEstilo,
};