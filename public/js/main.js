const socket = io.connect();

socket.on("productos", (data) => {
    showProductos(data)
})

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
    render(data)
})

function render(data) {
    const html = data.map((element) => {
        return `
        <div>
            <strong>${element.author}: </strong>
            <em>${element.text}</em>
        </div>
        `
    }).join(" ");

    document.getElementById("mensajes").innerHTML = html;
}

function addMessages(e) {
    const mensaje = {
        author: document.getElementById("userName").value,
        text: document.getElementById("texto").value
    }
    socket.emit("new-message", mensaje);
    return false;
}