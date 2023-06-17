const express = require("express");
const routes= require('./src/routes');
const path =require ("path");
const cors = require('cors');
const app= express();
const config = require('./config');
const swaggerUI= require("swagger-ui-express");
const swaggerJsDoc= require ("swagger-jsdoc");
const PORT = (5000);
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
//morgan?

//var mercadopago = require('mercadopago');
//mercadopago.configurations.setAccessToken("APP_USR-8894734259507762-061400-ee3cdd8bfc94e8439e137069bfc89fa6-159930080");

//swagger
const swaggerSpec= {
    definition:{
        openapi: "3.0.0",
        info: {
            servers: [config.SERVER],
            version: "1.0.0",
            title: "Amo Mis Cortinas Api",
            description: "Esta API permite obtener informacion de la base de datos de amo mis cortinas",
            contact:{
                name: "Ignacio Lopez Bidart",
                email: "lopezbidart@hotmail.com",
            },
        },
    },
    apis: [`${path.join(__dirname, "./src/routes.js")}`],
};

//para problemas de cors
app.options('*', cors());
app.use(cors());
//para recibir jsons
app.use(express.json());


//Routes
app.use("/api", routes);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec),{ customCssUrl: CSS_URL }));
app.get("/", (req, res) => {
    res.send("Api de amo mis cortinas: Ingrese /api/(accesorios/estilos/usuarios/clientes) o /api-doc/ ");
});

app.listen(PORT, () => console.log('Listening on port '+PORT+'...'));