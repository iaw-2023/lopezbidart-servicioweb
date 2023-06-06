const getAccesorios ="SELECT * FROM accesorio";
const getAccesoriosById="SELECT * FROM accesorio WHERE id= $1";
const checkAccesorioExists="SELECT a FROM accesorio a WHERE a.id_estilo=$1 and  a.nombre_acc= $2";
const addAccesorios= "INSERT INTO accesorio (id_estilo, nombre_acc, precio_acc, created_at, updated_at) VALUES ($1, $2, $3,$4, $5)";
const removeAccesorio= "DELETE FROM accesorio WHERE id= $1";
const updateAccesorio= "UPDATE accesorio SET id_estilo=$1, nombre_acc=$2, precio_acc= $3, updated_at=$4 WHERE id=$5";
const checkAccesorioExistsUpdate="SELECT a FROM accesorio a WHERE a.id_estilo=$1 and  a.nombre_acc= $2 and a.id!=$3";

module.exports = {
    getAccesorios,
    getAccesoriosById,
    addAccesorios,
    checkAccesorioExists,
    removeAccesorio,
    updateAccesorio,
    checkAccesorioExistsUpdate,
};