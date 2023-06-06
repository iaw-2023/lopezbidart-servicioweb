const { DatabaseError } = require('pg/lib');
const pool = require('../../db');
const queries= require('../queries/coloresQueries');


const getColors= (req, res) => {
    pool.query(queries.getColors, (error, results)=>{
        if (error) throw error;
        res.status(200).json(results.rows);

    });
};

const getColorsById= (req, res) => {
    const id= parseInt(req.params.id);
    pool.query(queries.getColorsById,[id], (error, results)=>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};


const addColors = (req, res) => {
    const {id_estilo, color  } = req.body;
    
    pool.query(queries.checkColorExists, [id_estilo,color.toUpperCase()], (error, results)=> {
        if (results.rows.length){
        res.send("Este Color ya existe");
        } 
        else {

            pool.query(
                queries.addColors,
                [id_estilo, color.toUpperCase(),new Date(),new Date()],
                (error, results)=>{
                    if (error) throw error;
                    res.status(200).send("Color agregado exitosamente");
                }
            
            );
        }
    });
};

const removeColor = (req, res) => {
    const id= parseInt(req.params.id);
    pool.query(queries.getColorsById,[id], (error, results)=>{
        const ColorNoFound= !results.rows.length;
        if (ColorNoFound) {
            res.send("No existe Color con ese id");
        }

        pool.query(queries.removeColor,[id], (error, results)=>{
            if (error) throw error;
            res.status(200).send("Color eliminado");
    
        });
    });
};



module.exports = {
    getColors,
    getColorsById,
    addColors,
    removeColor,
};