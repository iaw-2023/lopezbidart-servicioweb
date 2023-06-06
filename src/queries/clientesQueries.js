const getClientes ="SELECT * FROM clientes";
const getClientesById="SELECT * FROM clientes WHERE id= $1";
const getClientesByEmail="SELECT * FROM clientes WHERE email= $1";
const addClientes= "INSERT INTO clientes (dni, nombre_completo, telefono, direccion, ciudad, email, password, remember_token, created_at,updated_at) VALUES ($1, $2, $3, $4,$5,$6,$7,$8, $9, $10)";
const removeCliente= "DELETE FROM clientes WHERE id= $1";
const updateCliente= "UPDATE clientes SET dni=$1, nombre_completo=$2, telefono=$3, direccion=$4, ciudad=$5, email=$6, password=$7, updated_at=$8 WHERE id=$9";

module.exports = {
    getClientes,
    getClientesById,
    getClientesByEmail,
    addClientes,
    removeCliente,
    updateCliente,
};