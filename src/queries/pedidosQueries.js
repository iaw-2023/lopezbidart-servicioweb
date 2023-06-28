const getPedidosById="SELECT * FROM pedido WHERE id= $1";
const getPedidosByIdCliente="SELECT * FROM pedido WHERE id_cliente= $1";
//const addPedido= "INSERT INTO pedido (id_cliente, fecha, costo_final, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)";
const addPedido = "INSERT INTO pedido (id_cliente, fecha, costo_final, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING id";
const getLastId= "SELECT currval(pg_get_serial_sequence('pedido', 'id')) AS ultimo_id";

module.exports = {
    getPedidosByIdCliente,
    getPedidosById,
    addPedido,
    getLastId
};