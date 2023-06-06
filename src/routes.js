const {Router}= require("express");
const accesorioController= require('./controllers/accesoriosController');
const estilosController= require('./controllers/estilosController');
const usersController= require('./controllers/usersController');
const coloresController= require('./controllers/coloresController');
const clientesController= require('./controllers/clientesController');
const pedidosController= require('./controllers/pedidosController');
const detallesController= require('./controllers/detallesController');


const router=Router();

/**
 * @swagger 
 * components:
 *  schemas:
 *      Cliente:
 *          type: object
 *          properties:
 *              dni:
 *                type: integer
 *                description: Dni del cliente
 *              nombre_completo:
 *                type: string
 *                description: Nombre del cliente
 *              telefono:
 *                type: integer
 *                description: Telefono del cliente
 *              direccion:
 *                type: string
 *                description: Direccion del cliente
 *              ciudad:
 *                type: string
 *                description: Ciudad del cliente
 *              email:
 *                type: string
 *                description: Email del cliente
 *              password:
 *                type: string
 *                description: Contraseña para la cuenta del cliente
 *          required:
 *              -dni
 *              -nombre_completo
 *              -telefono
 *              -direccion
 *              -ciudad
 *              -email
 *              -password
 *          example:
 *              dni: 39171207
 *              nombre_completo: Ignacio Lopez
 *              telefono: 2923696662
 *              direccion: Humberto Primo 570
 *              ciudad: Bahia Blanca
 *              email: homer_s@gmail.com
 *              password: homero1234
 */
/**
 * @swagger
 * /api/clientes:
 *  get:
 *      summary: Retorna todos los clientes
 *      tags: [Cliente]
 *      responses:
 *          200:
 *              description: Clientes  
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array                      
 *                          $ref: '#/components/schemas/Cliente'
 */
router.get("/clientes", clientesController.getClientes);


/**
 * @swagger
 * /api/clientes/{param}:
 *  get:
 *      summary: Retorna un cliente por id o su email
 *      tags: [Cliente]
 *      parameters:
 *          - in: path
 *            name: id or email
 *            schema:
 *              type: string
 *            required: true
 *            description: Id del Cliente
 *      responses:
 *          200:
 *              description: Cliente encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Cliente'
 *          404:
 *              description: Cliente no encontrado 
 */
router.get("/clientes/:param", clientesController.getClientesByParam);


/**
 * @swagger
 * /api/clientes:
 *  post:
 *      summary: Crea un nuevo cliente
 *      tags: [Cliente]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Cliente'
 *      responses:
 *          200:
 *              description: Nuevo cliente creado
 */
router.post("/clientes", clientesController.addClientes);

/** 
 * @swagger
 * /api/login:
 *  post:
 *      summary: login 
 *      tags: [Cliente]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Cliente'
 *      responses:
 *          200:
 *              description: login
 */
router.post("/login", clientesController.postLogin);

/**
 * @swagger
 * /api/clientes/{id}:
 *  delete:
 *      summary: Elimina un cliente
 *      tags: [Cliente]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Id del usuario
 *      responses:
 *          200:
 *              description: Cliente eliminado
 *          404:
 *              description: Cliente no encontrado 
 */
router.delete("/clientes/:id", clientesController.removeCliente);

/**
 * @swagger
 * /api/clientes/{id}:
 *  put:
 *      summary: Actualiza cliente
 *      tags: [Cliente]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Id del cliente
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Cliente'
 *      responses:
 *          200:
 *              description: Cliente actualizado
 *          404:
 *              description: Cliente no encontrado 
 */
router.put("/clientes/:id", clientesController.updateCliente);

/**
 * @swagger 
 * components:
 *  schemas:
 *      Accesorio:
 *          type: object
 *          properties:
 *              id_estilo:
 *                type: integer
 *                description: Id de un estilo
 *              nombre_acc:
 *                type: string
 *                description: Nombre del accesorio
 *              precio_acc:
 *                type: double
 *                description: Precio del accesorio por unidad
 *          required:
 *              -id_estilo
 *              -nombre_acc
 *              -precio_acc
 *          example:
 *              id_estilo: 1
 *              nombre_acc: ZOCALO DE ALUMINIO
 *              precio_acc: 1500
 */
/**
 * @swagger
 * /api/accesorios:
 *  get:
 *      summary: Retorna todos los accesorios
 *      tags: [Accesorio]
 *      responses:
 *          200:
 *              description: Todos los accesorios   
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          $ref: '#/components/schemas/Accesorio'
 */
router.get("/accesorios", accesorioController.getAccesorios);

/**
 * @swagger
 * /api/accesorios/{id}:
 *  get:
 *      summary: Retorna un accesorio por id
 *      tags: [Accesorio]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Id del accesorio
 *      responses:
 *          200:
 *              description: Accesorio encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Accesorio'
 *          404:
 *              description: Accesorio no encontrado 
 */
router.get("/accesorios/:id", accesorioController.getAccesoriosById);

/**
 * @swagger
 * /api/accesorios:
 *  post:
 *      summary: Crea un nuevo accesorio
 *      tags: [Accesorio]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Accesorio'
 *      responses:
 *          200:
 *              description: Nuevo accesorio creado
 */
router.post("/accesorios", accesorioController.addAccesorios);

/**
 * @swagger
 * /api/accesorios/{id}:
 *  delete:
 *      summary: Elimina un accesorio
 *      tags: [Accesorio]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Id del usuario
 *      responses:
 *          200:
 *              description: Accesorio eliminado
 *          404:
 *              description: Accesorio no encontrado 
 */
router.delete("/accesorios/:id", accesorioController.removeAccesorio);

/**
 * @swagger
 * /api/accesorios/{id}:
 *  put:
 *      summary: Actualiza un accesorio
 *      tags: [Accesorio]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Id de estilo
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Accesorio'
 *      responses:
 *          200:
 *              description: Accesorio actualizado
 *          404:
 *              description: Accesorio no encontrado 
 */
router.put("/accesorios/:id", accesorioController.updateAccesorio);

/**
 * @swagger 
 * components:
 *  schemas:
 *      Estilo:      
 *          type: object
 *          properties:
 *              tela: 
 *                  type: string
 *                  description: Tipo de tela que usara la cortina
 *              precio_m2:
 *                  type: double
 *                  description: Precio del metro cuadrado del estilo
 *          required:
 *              -tela
 *              -precio_m2
 *          example:
 *              tela: BLACK OUT
 *              precio_m2: 2500
 */
/**
 * @swagger
 * /api/estilos:
 *  get:
 *      summary: Retorna todos los estilos de cortinas disponibles
 *      tags: [Estilo]
 *      responses:
 *          200:
 *              description: Estilos de cortinas
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array                      
 *                          $ref: '#/components/schemas/Estilo'
 */
router.get("/estilos", estilosController.getEstilos);

/**
 * @swagger
 * /api/estilos/{id}:
 *  get:
 *      summary: Retorna un estilo de cortina por id
 *      tags: [Estilo]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Id del estilo de cortina
 *      responses:
 *          200:
 *              description: Estilo de cortina encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Estilo'
 *          404:
 *              description: Estilo de cortina no encontrado 
 */
router.get("/estilos/:id", estilosController.getEstilosById);

/**
 * @swagger
 * /api/estilos:
 *  post:
 *      summary: Crea un nuevo estilo de cortinas
 *      tags: [Estilo]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Estilo'
 *      responses:
 *          200:
 *              description: Nuevo estilo de cortinas creado
 */
router.post("/estilos", estilosController.addEstilos);

/**
 * @swagger
 * /api/estilos/{id}:
 *  delete:
 *      summary: Elimina un usuario administrador
 *      tags: [Estilo]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Id del estilo de cortina
 *      responses:
 *          200:
 *              description: Estilo de cortina eliminado
 *          404:
 *              description: Estilo de cortina no encontrado 
 */
router.delete("/estilos/:id", estilosController.removeEstilo);

/**
 * @swagger
 * /api/estilos/{id}:
 *  put:
 *      summary: Actualiza un estilo de cortinas
 *      tags: [Estilo]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Id de estilo
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Estilo'
 *      responses:
 *          200:
 *              description: Estilo de cortinas actualizado
 *          404:
 *              description: Estilo de cortinas no encontrado 
 */
router.put("/estilos/:id", estilosController.updateEstilo);


/**
 * @swagger 
 * components:
 *  schemas:
 *      Color:      
 *          type: object
 *          properties:
 *              id_estilo: 
 *                type: integer
 *                description: id de un estilo
 *              color:
 *                type: string
 *                description: Color de una tela
 *          required:
 *              -id_estilo
 *              -color
 *          example:
 *              id_estilo: 1
 *              color: BLANCO
 */
/**
 * @swagger
 * /api/Colores:
 *  get:
 *      summary: Retorna todos los Colores
 *      tags: [Color]
 *      responses:
 *          200:
 *              description: Todos los Colores   
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          $ref: '#/components/schemas/Color'
 */
 router.get("/Colores", coloresController.getColors);

 /**
  * @swagger
  * /api/Colores/{id}:
  *  get:
  *      summary: Retorna un Color por id
  *      tags: [Color]
  *      parameters:
  *          - in: path
  *            name: id
  *            schema:
  *              type: integer
  *            required: true
  *            description: Id del Color
  *      responses:
  *          200:
  *              description: Color encontrado
  *              content:
  *                  application/json:
  *                      schema:
  *                          type: object
  *                          $ref: '#/components/schemas/Color'
  *          404:
  *              description: Color no encontrado 
  */
 router.get("/Colores/:id", coloresController.getColorsById);
 
 /**
  * @swagger
  * /api/Colores:
  *  post:
  *      summary: Crea un nuevo Color
  *      tags: [Color]
  *      requestBody:
  *          required: true
  *          content:
  *              application/json:
  *                  schema:
  *                      type: object
  *                      $ref: '#/components/schemas/Color'
  *      responses:
  *          200:
  *              description: Nuevo Color creado
  */
 router.post("/Colores", coloresController.addColors);
 
 /**
  * @swagger
  * /api/Colores/{id}:
  *  delete:
  *      summary: Elimina un Color
  *      tags: [Color]
  *      parameters:
  *          - in: path
  *            name: id
  *            schema:
  *              type: integer
  *            required: true
  *            description: Id del usuario
  *      responses:
  *          200:
  *              description: Color eliminado
  *          404:
  *              description: Color no encontrado 
  */
 router.delete("/Colores/:id", coloresController.removeColor);
 
/**
 * @swagger 
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              name: 
 *                type: string
 *                description: Nombre de usuario
 *              role:
 *                type: string
 *                description: Roll de usuario (auth, admin, jefe)
 *              email:
 *                type: email
 *                description: Email del usuario administrador
 *              password:
 *                type: password
 *                description: Contraseña para la cuenta de usuario administrador
 *          required:
 *              -name
 *              -role
 *              -email
 *              -password
 *          example:
 *              name: Homero
 *              role: admin
 *              email: homer_s@gmail.com
 *              password: homero1234
 */ 
/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: Retorna todos los usuario administradores
 *      tags: [User]
 *      responses:
 *          200:
 *              description: Usuario administradores   
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array                      
 *                          $ref: '#/components/schemas/User'
 */
router.get("/users", usersController.getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *      summary: Retorna un usuario administrador por id
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Id del usuario
 *      responses:
 *          200:
 *              description: Usuario administrador encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/User'
 *          404:
 *              description: Usuario administrador no encontrado 
 */
router.get("/users/:id", usersController.getUsersById);

/**
 * @swagger
 * /api/users:
 *  post:
 *      summary: Crea un nuevo usuario administrador
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: Nuevo usuario creado
 */
router.post("/users", usersController.addUsers);

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *      summary: Elimina un usuario administrador
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Id del usuario
 *      responses:
 *          200:
 *              description: Usuario administrador eliminado
 *          404:
 *              description: Usuario administrador no encontrado 
 */
router.delete("/users/:id", usersController.removeUser);

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *      summary: Actualiza usuario administrador
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Id del usuario
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: Usuario administrador actualizado
 *          404:
 *              description: Usuario administrador no encontrado 
 */
router.put("/users/:id", usersController.updateUser);

/**
 * @swagger 
 * components:
 *  schemas:
 *      Pedido:      
 *          type: object
 *          properties:
 *              id_cliente:
 *                  type: integer
 *                  description: Cliente que realizo el pedido
 *              fecha:
 *                  type: date
 *                  description: Fecha del pedido
 *              costo_final:
 *                  type: double
 *                  description: Costo total del pedido
 *          required:
 *              -id_cliente
 *              -fecha
 *              -costo_final
 *          example:
 *              id_cliente: 1
 *              fecha: 12/05/2023
 *              costo_final: 25000
 */

/**
 * @swagger
 * /api/pedido/{id_cliente}:
 *  get:
 *      summary: Retorna todos los pedidos de un cliente mediante su id
 *      tags: [Pedido]
 *      parameters:
 *          - in: path
 *            name: id_cliente
 *            schema:
 *              type: integer
 *            required: true
 *            description: Id del cliente
 *      responses:
 *          200:
 *              description: Pedidos encontrados
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Pedido'
 *          404:
 *              description: Pedidos no encontrados
 */
router.get("/pedido/:id_cliente", pedidosController.getPedidosByIdCliente);
/**
 * @swagger
 * /api/pedido:
 *  post:
 *      summary: Crea un nuevo pedido
 *      tags: [Pedido]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Pedido'
 *      responses:
 *          200:
 *              description: Nuevo pedido creado
 */
router.post("/pedido", pedidosController.addPedido);

/**
 * @swagger 
 * components:
 *  schemas:
 *      Detalle:      
 *          type: object
 *          properties:
 *              id_pedido:
 *                  type: integer
 *                  description: Id del pedido al que pertenece el detalle
 *              producto:
 *                  type: string
 *                  description: Descripcion del producto
 *              cantidad:
 *                  type: integer
 *                  description: Cantidad de producto
 *              costo_detalle:
 *                  type: double
 *                  description: Costo del producto multiplicado la cantidad
 *          required:
 *              -id_pedido
 *              -producto
 *              -cantidad
 *              -costo_detalle
 *          example:
 *              id_pedido: 1
 *              producto: Cortina black out zacalo y cadena estandar
 *              cantidad: 2
 *              costo_detalle: 15000
 */
/**
 * @swagger
 * /api/detalle/{id_pedido}:
 *  get:
 *      summary: Retorna todos los detalles de un pedido mediante su id
 *      tags: [Detalle]
 *      parameters:
 *          - in: path
 *            name: id_pedido
 *            schema:
 *              type: integer
 *            required: true
 *            description: Id del pedido
 *      responses:
 *          200:
 *              description: Detalles encontrados
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Detalle'
 *          404:
 *              description: Detalles no encontrados
 */
router.get("/detalle/:id_pedido", detallesController.getDetallesById);
/**
 * @swagger
 * /api/detalle:
 *  post:
 *      summary: Crea un nuevo detalle para un pedido
 *      tags: [Detalle]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Detalle'
 *      responses:
 *          200:
 *              description: Nuevo detalle creado
 */
router.post("/detalle", detallesController.addDetalle);

module.exports = router;

