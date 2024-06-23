const express = require("express");
const cors = require('cors');
const routerApi = require("./routes");
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const app = express();
const { faker, el } = require('@faker-js/faker');
const PORT = 3001;

app.use(express.json())

const whitelist = ['http://localhost:8080'];  // Corregido
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {  // Añadido !origin para permitir peticiones sin origen (como Postman)
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
};

app.use(cors(options));

app.get("/", (req, res) => {
  res.send("<p style='text-align:center;font-size:40px;color:lightblue;background-color:#000'>Mi primer servidor en Express</p>");
});
app.get("/nueva-ruta", (req, res) => {
    res.send('Nuevo endpoint');
  });
  routerApi(app);
  // Utilizamos los middleware. Siempre deben ir después del routing:
  app.use(logErrors);
  app.use(boomErrorHandler);
  app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Escuchando en el puerto " + PORT);
});