const pool = require('../../db');
const queries= require('../queries/usersQueries');

const getUsers= (req, res) => {
    pool.query(queries.getUsers, (error, results)=>{
        if (error) throw error;
        res.status(200).json(results.rows);

    });
};

const getUsersById= (req, res) => {
    const id= parseInt(req.params.id);
    pool.query(queries.getUsersById,[id], (error, results)=>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addUsers = (req, res) => {
    const {name, role , email, password } = req.body;
    
    pool.query(queries.checkUserExists, [email], (error, results)=> {
        if (results.rows.length){
        res.send("Este existe un user con este email");
        } 
        else {

            pool.query(
                queries.addUsers,
                [name, role, email, password],
                (error, results)=>{
                    if (error) throw error;
                    res.status(201).send("User agregado exitosamente");
                }
            
            );
        }
    });
};

const removeUser = (req, res) => {
    const id= parseInt(req.params.id);
    pool.query(queries.removeUser,[id], (error, results)=>{
        const UserNoFound= !results.rows.length;
        if (UserNoFound) {
            res.send("No existe User con ese id");
        }

        pool.query(queries.removeUser,[id], (error, results)=>{
            if (error) throw error;
            res.status(200).send("User eliminado");
    
        });
    });
};

const updateUser = (req, res) => {
    const id= parseInt(req.params.id);
    const {password} = req.body;

    pool.query(queries.getUsersById, [id], (error, results)=> {

        const UserNoFound= !results.rows.length;
        if (UserNoFound) {
            res.send("No existe User con ese id");
        }
        

        pool.query(
                queries.updateUser,
                [password, id],
                (error, results)=>{
                    if (error) throw error;
                    res.status(201).send("User actualizado exitosamente");
        });
    });
};

module.exports = {
    getUsers,
    getUsersById,
    addUsers,
    removeUser,
    updateUser
};