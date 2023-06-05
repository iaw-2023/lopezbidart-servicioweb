const express = require("express");
const app= express();
const routes= require('./src/routes')

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello World!!");
});


app.use("/api", routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Listening on port '+PORT+'...'));