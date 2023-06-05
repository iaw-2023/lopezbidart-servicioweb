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
    const {nombre_acc , color_acc , precio_acc } = req.body;
    
    pool.query(queries.checkAccesorioExists, [nombre_acc, color_acc], (error, results)=> {
        if (results.rows.length){
        res.send("Este Accesorio ya existe");
        } 
        else {

            pool.query(
                queries.addAccesorios,
                [nombre_acc, color_acc, precio_acc],
                (error, results)=>{
                    if (error) throw error;
                    res.status(201).send("Accesorio agregado exitosamente");
                }
            
            );
        }
    });
};

const removeAccesorio = (req, res) => {
    const id= parseInt(req.params.id);
    pool.query(queries.removeAccesorio,[id], (error, results)=>{
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
    const {nombre_acc , color_acc , precio_acc } = req.body;

    pool.query(queries.getAccesoriosById, [id], (error, results)=> {

        const accesorioNoFound= !results.rows.length;
        if (accesorioNoFound) {
            res.send("No existe accesorio con ese id");
        }
        

        pool.query(
                queries.updateAccesorio,
                [nombre_acc, color_acc, precio_acc, id],
                (error, results)=>{
                    if (error) throw error;
                    res.status(201).send("Accesorio actualizado exitosamente");
        });
    });
};

module.exports = {
    getAccesorios,
    getAccesoriosById,
    addAccesorios,
    removeAccesorio,
    updateAccesorio
};