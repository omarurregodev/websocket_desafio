const express = require("express");
const Productos = require('./api/productos.js');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const PORT = 8080;
const server = httpServer.listen(PORT, () => {
    console.log("Servidor levantado en el puerto " + server.address().port);
});

server.on("error", (error) => console.log(`Hubo un error ${error}`));

const messages = [
    {
        author: "Juan",
        text: "Hola que tal"
    },
    {
        author: "Maria",
        text: "bien y tu"
    },
    {
        author: "Juan",
        text: "Me alegra"
    }
];


io.on("connection", (socket) => {
    console.log("Se conectó un usuario!");

    socket.emit("messages", messages);

    socket.on("new-message", (data) => {
        messages.push(data);
        io.sockets.emit("messages", messages)
    })
}) 

let productos = new Productos();

// configuración engine

app.set("view engine", "ejs");

app.use(express.static("public"));

const router = express.Router();
app.use("/api", router);

router.use(express.urlencoded({ extended: false }))
router.use(express.json());

router.get("/productos/listar", (req, res) => {
    res.json(productos.listarAll())
})

router.get("/productos/listar/:id", (req, res) => {
    let { id } = req.params;
    res.json(productos.listar(id));
})

router.post("/productos/guardar", (req, res) => {
    let producto = req.body;
    productos.guardar(producto);
    res.redirect("/");
})

router.put("/productos/actualizar/:id", (req, res) => {
    let { id } = req.params;
    let producto = req.body;
    productos.actualizar(producto, id);
    res.json(producto)
})

router.delete("/productos/borrar/:id", (req, res) => {
    let { id } = req.params;
    let producto = productos.borrar(id);
    res.json(producto);
})

router.get("/productos/vista", (req, res) => {
    let prods = productos.listarAll();

    res.render("layouts/index", {
        productos: prods,
        hayProductos: prods.length
    })
})