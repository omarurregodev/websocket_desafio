const express = require("express");
const PORT = 8080;
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname })
});

const productos = [
    {
        nombre: "Primer prod",
        precio: 234.54,
        url: "www.google.co"
    }
];

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

    socket.emit("productos", productos);

    socket.on("new-product", (data) => {
        productos.push(data);
        io.sockets.emit("productos", productos)
    })

    // socket.on("new-message", (data) => {
    //     messages.push(data);
    //     io.sockets.emit("messages", messages)
    // })
}) 

const connectedServer = httpServer.listen(PORT, () => {
    console.log("Server On")
});    