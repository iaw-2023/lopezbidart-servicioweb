const {Router}= require("express");
const accesorioController= require('./controllers/accesoriosController');
const estilosController= require('./controllers/estilosController');
const usersController= require('./controllers/usersController');
const router= Router();

router.get("/accesorios", accesorioController.getAccesorios);
router.get("/accesorios/:id", accesorioController.getAccesoriosById);
router.post("/accesorios", accesorioController.addAccesorios);
router.delete("/accesorios/:id", accesorioController.removeAccesorio);
router.put("/accesorios/:id", accesorioController.updateAccesorio);

router.get("/estilos", estilosController.getEstilos);
router.get("/estilos/:id", estilosController.getEstilosById);
router.post("/estilos", estilosController.addEstilos);
router.delete("/estilos/:id", estilosController.removeEstilo);
router.put("/estilos/:id", estilosController.updateEstilo);

router.get("/users", usersController.getUsers);
router.get("/users/:id", usersController.getUsersById);
router.post("/users", usersController.addUsers);
router.delete("/users/:id", usersController.removeUser);
router.put("/users/:id", usersController.updateUser);

module.exports = router;

