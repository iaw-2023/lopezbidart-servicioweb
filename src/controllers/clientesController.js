const { token } = require('morgan');
const pool = require('../../db');
const queries= require('../queries/clientesQueries');
const bcrypt = require("bcrypt");



const getClientes= (req, res) => {
    pool.query(queries.getClientes, (error, results)=>{
        if (error) throw error;
        res.status(200).json(results.rows);

    });
};

const getClientesByParam= (req, res) => {
    const param = parseInt(req.params.param);
    if (isNaN(param)) {
      // El parámetro es una cadena de texto (email)
      getClientesByEmail(req, res);
      
    } else {
      // El parámetro es un entero (ID)
      getClientesById(req, res);
    
    }
};

const getClientesById= (req, res) => {
    const id= parseInt(req.params.param);
    pool.query(queries.getClientesById,[id], (error, results)=>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getClientesByEmail= (req, res) => {
    const email= req.params.param;
    pool.query(queries.getClientesByEmail,[email.toLowerCase()], (error, results)=>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};
  

const postLogin= (req, res) => {
   res.setHeader('Access-Control-Allow-Headers', '*');
   res.setHeader('Access-Control-Allow-Methods', '*');

    const {email, password } = req.body;

    pool.query(queries.getClientesByEmail, [email.toLowerCase()], (error, results)=> {
        if (error) throw error;
            if (!results.rows.length){
                res.status(404).send('Email no registrado');
            }    
            const cliente = results.rows[0];   
            return  bcrypt.compare(password, cliente.password).then(resul => {
                if (resul == true ) return res.status(200).send({
                    token: cliente.remember_token
                  }); 
                else res.status(401).send('Contraseña incorrecta');
            })
    });
    
};


const addClientes = (req, res) => {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');

    const {dni, nombre_completo, telefono, direccion, ciudad, email, password } = req.body;
        
    pool.query(queries.getClientesByEmail, [email.toLowerCase()], (error, results)=> {
        if (results.rows.length){
            res.status(401).send("Existe un cliente con este email");
        } 
        else {

            const hash = bcrypt.hashSync(password.toString(), 10);
            const token=(Math.random() + 1).toString(36).substring(7);

            pool.query(
                queries.addClientes,
                [dni, nombre_completo, telefono, direccion, ciudad, email.toLowerCase(), hash, token, new Date(),new Date()],
                (error, results)=>{
                    if (error) throw error;
                    res.status(200).send("Cliente agregado exitosamente");
                }
            
            );
        }
    });
};

const removeCliente = (req, res) => {
    const id= parseInt(req.params.id);

    pool.query(queries.getClientesById,[id], (error, results)=>{
        const ClienteNoFound= !results.rows.length;
        if (ClienteNoFound) {
            res.status(401).send("No existe Cliente con ese id");
        }

        pool.query(queries.removeCliente,[id], (error, results)=>{
            if (error) throw error;
            res.status(200).send("Cliente eliminado");
    
        });
    });
};

const updateCliente = (req, res) => {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');

    const id= parseInt(req.params.id);
    const {dni, nombre_completo, telefono, direccion, ciudad, email, password} = req.body;    
    const hash = bcrypt.hashSync(password, 10);

    pool.query(queries.getClientesById, [id], (error, results)=> {

        const ClienteNoFound= !results.rows.length;
        if (ClienteNoFound) {
            res.status(401).send("No existe Cliente con ese id");
        }
        else{
                pool.query(queries.updateCliente,[dni, nombre_completo, telefono, direccion, ciudad, email.toLowerCase(), hash, new Date(), id],(error, results)=>{
                    if (error) throw error;
                    res.status(200).send("Cliente actualizado exitosamente");
                });
        }   
    });
};


module.exports = {
    getClientes,
    addClientes,
    removeCliente,
    updateCliente,
    getClientesByParam,
    postLogin
};
