const { DatabaseError } = require('pg/lib');
const pool = require('../../db');
const queries= require('../queries/accesorioQueries');


const getAccesorios= (req, res) => {
    pool.query(queries.getAccesorios, (error, results)=>{
        if (error) throw error;
        res.status(200).json(results.rows);

    });
};

const getAccesoriosById= (req, res) => {
    const id= parseInt(req.params.id);
    pool.query(queries.getAccesoriosById,[id], (error, results)=>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};


const addAccesorios = (req, res) => {
    const {id_estilo, nombre_acc , precio_acc } = req.body;
    
    pool.query(queries.checkAccesorioExists, [id_estilo,nombre_acc.toUpperCase()], (error, results)=> {
        if (results.rows.length){
        res.send("Este Accesorio ya existe");
        } 
        else {

            pool.query(
                queries.addAccesorios,
                [id_estilo, nombre_acc.toUpperCase(), precio_acc,new Date(),new Date()],
                (error, results)=>{
                    if (error) throw error;
                    res.status(200).send("Accesorio agregado exitosamente");
                }
            
            );
        }
    });
};

const removeAccesorio = (req, res) => {
    const id= parseInt(req.params.id);
    pool.query(queries.getAccesoriosById,[id], (error, results)=>{
        const accesorioNoFound= !results.rows.length;
        if (accesorioNoFound) {
            res.send("No existe accesorio con ese id");
        }

        pool.query(queries.removeAccesorio,[id], (error, results)=>{
            if (error) throw error;
            res.status(200).send("Accesorio eliminado");
    
        });
    });
};


const updateAccesorio = (req, res) => {
    const id= parseInt(req.params.id);
    const {id_estilo, nombre_acc, precio_acc } = req.body;

    pool.query(queries.getAccesoriosById, [id], (error, results)=> {

        const accesorioNoFound= !results.rows.length;
        if (accesorioNoFound) {
            res.send("No existe accesorio con ese id");
        }
        
        
        pool.query(queries.checkAccesorioExistsUpdate, [id_estilo, nombre_acc.toUpperCase(), id], (error, results)=> {
            if (results.rows.length){
            res.send("Este Accesorio ya existe");
            } 
            else {

            pool.query(
                    queries.updateAccesorio,
                    [id_estilo, nombre_acc.toUpperCase(), precio_acc,new Date(),id],
                    (error, results)=>{
                        if (error) throw error;
                        res.status(200).send("Accesorio actualizado exitosamente");
            });
            }
        });
    });
};

module.exports = {
    getAccesorios,
    getAccesoriosById,
    addAccesorios,
    removeAccesorio,
    updateAccesorio,
};