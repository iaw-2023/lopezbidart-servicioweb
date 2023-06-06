const getDetallesById="SELECT * FROM detalle WHERE id_pedido= $1";
const addDetalle= "INSERT INTO detalle (id_pedido, producto, cantidad, costo_detalle, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)";

module.exports = {
    getDetallesById,
    addDetalle
};