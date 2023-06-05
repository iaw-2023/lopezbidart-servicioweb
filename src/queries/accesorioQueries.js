const getAccesorios ="SELECT * FROM accesorio";
const getAccesoriosById="SELECT * FROM accesorio WHERE id= $1";
const checkAccesorioExists="SELECT a FROM accesorio a WHERE a.nombre_acc= $1 and a.color_acc=$2";
const addAccesorios= "INSERT INTO accesorio (nombre_acc, color_acc, precio_acc) VALUES ($1, $2, $3)";
const removeAccesorio= "DELETE FROM accesorio WHERE id= $1";
const updateAccesorio= "UPDATE accesorio SET nombre_acc=$1, color_acc=$2, precio_acc= $3 WHERE id=$4";

module.exports = {
    getAccesorios,
    getAccesoriosById,
    addAccesorios,
    checkAccesorioExists,
    removeAccesorio,
    updateAccesorio,
};