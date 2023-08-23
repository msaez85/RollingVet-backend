const express = require('express'); //importo express dentro de una constante, equivalente al import de react
const cors = require('cors');
const bodyParser = require('body-parser');
const {dbConnection} = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.app.port = process.env.PORT;
        this.rootPath = "/api";
        this.middlewares();
        this.routes();
        this.conectarDB();
    }
    async conectarDB(){
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(bodyParser.json())
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.rootPath, require('../routes/auth'));
        this.app.use(this.rootPath, require('../routes/categorias'));
        this.app.use(this.rootPath, require('../routes/usuarios'));
        this.app.use(this.rootPath, require('../routes/pacientes'));
        this.app.use(this.rootPath, require('../routes/turnos'));
        this.app.use(this.rootPath, require('../routes/productos'));

    }

    listen() {
        this.app.listen(8080, () => {
            console.log('server online', this.app.port);
            console.log('backend server iniciado');
       //   console.log(process.env);
        })
    }
}

module.exports = Server;