const getColors ="SELECT * FROM color_tela";
const getColorsById="SELECT * FROM color_tela WHERE id= $1";
const checkColorExists="SELECT e FROM color_tela e WHERE e.id_estilo= $1 and e.color=$2";
const addColors= "INSERT INTO color_tela (id_estilo, color, created_at, updated_at) VALUES ($1, $2, $3,$4)";
const removeColor= "DELETE FROM color_tela WHERE id= $1";

module.exports = {
    getColors,
    getColorsById,
    addColors,
    checkColorExists,
    removeColor,
};