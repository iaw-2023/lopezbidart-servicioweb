const getEstilos ="SELECT * FROM estilo_cortina";
const getEstilosById="SELECT * FROM estilo_cortina WHERE id= $1";
const checkEstiloExists="SELECT e FROM estilo_cortina e WHERE e.tela= $1";
const addEstilos= "INSERT INTO estilo_cortina (tela, precio_m2,created_at,updated_at) VALUES ($1, $2, $3,$4)";
const removeEstilo= "DELETE FROM estilo_cortina WHERE id= $1";
const updateEstilo= "UPDATE estilo_cortina SET tela=$1, precio_m2= $2, updated_at= $3 WHERE id=$4";
const checkEstiloExistsUpdate="SELECT e FROM estilo_cortina e WHERE e.tela= $1 and e.id!=$2";

module.exports = {
    getEstilos,
    getEstilosById,
    addEstilos,
    checkEstiloExists,
    removeEstilo,
    updateEstilo,
    checkEstiloExistsUpdate,
};