const socket = io.connect();

socket.on("productos", (data) => {
    showProductos(data)
});

function showProductos(data) {
    const htmlProductos = data.map((prod) => {
        return `
        <tr><td>${prod.nombre}</td><td>$ ${prod.precio}</td><td><img src="${prod.url}" width="50" alt="not found"></td></tr>
        `
    }).join(" ")
    document.getElementById("tableBodyProd").innerHTML = htmlProductos;
}
function addProduct(e) {
    const producto = {
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        url: document.getElementById("foto").value
    };
    socket.emit("new-product", producto);
    return false;
}

socket.on("messages", (data) => {
    showMessages(data);
})

function showMessages(data) {
    const htmlMessages = data.map((msg) => {
        return `
        <div>
            <strong style="color: blue;">${msg.author}</strong>
            <em style="color: brown;">${msg.date} :</em>
            <em style="color: green;">${msg.text}</em>
        </div>
        `
    }).join(" ");

    document.getElementById("chatZone").innerHTML = htmlMessages;
}

function addMessages(e) {
    const mensaje = {
        author: document.getElementById("email").value,
        date: new Date(),
        text: document.getElementById("texto").value
    }
    socket.emit("new-message", mensaje);
    return false;
}