const getEstilos ="SELECT * FROM estilo_cortina";
const getEstilosById="SELECT * FROM estilo_cortina WHERE id= $1";
const checkEstiloExists="SELECT e FROM estilo_cortina e WHERE e.tela= $1 and e.color=$2";
const addEstilos= "INSERT INTO estilo_cortina (tela, color, precio_m2) VALUES ($1, $2, $3)";
const removeEstilo= "DELETE FROM estilo_cortina WHERE id= $1";
const updateEstilo= "UPDATE estilo_cortina SET tela=$1, color=$2, precio_m2= $3 WHERE id=$4";

module.exports = {
    getEstilos,
    getEstilosById,
    addEstilos,
    checkEstiloExists,
    removeEstilo,
    updateEstilo,
};