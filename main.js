function showSidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}


const Producto = function (nombre, precio, stock){
    this.nombre = nombre
    this.precio = precio
    this.stock = stock
}

let producto1 = new Producto ("Auriculares Samsung Inalambricos",17000,5)
let producto2 = new Producto ("Auriculares Motorola Wired",15000,2)
let producto3 = new Producto ("Cable USB-C",4500,10)
let producto4 = new Producto ("Mouse Logitech Wired",23000,5)
let producto5 = new Producto ("Lego SuperMan",12500,10)
let producto6 = new Producto ("Lego Batman",11000,10)
let producto7 = new Producto ("Lego SpiderMan",12000,10)
let producto8 = new Producto ("Lego IronMan",15000,10)
let producto9 = new Producto ("Lapicera Tazo Grueso",1500,10)
let producto10 = new Producto ("Cuadernillo Tapa Blanda",4000,5)
let producto11 = new Producto ("Cuadernillo Tapa Dura",6000,5)
let producto12 = new Producto ("Lapicera Tazo Fino",1500,10)
let producto13 = new Producto ("Cargador Apple",25000,5)
let producto14 = new Producto ("Vidrio Templado",2000,50)
let producto15 = new Producto ("Cargador Samsung con Cable tipo C",13000,5)
let producto16 = new Producto ("Cargador Motorola con Cable tipo C",11000,5)


let listaProductos = [producto1,producto2,producto3,producto4,producto5,producto6,producto7,producto8,producto9,producto10,producto11,producto12,producto13,producto14,producto15,producto16]

function filtroBusqueda(){

    let palabraClave = prompt("¿Cual es tu proxima compra?").toUpperCase().trim()
    let resultado = listaProductos.filter((x)=>x.nombre.toUpperCase().includes(palabraClave))
    if (resultado.length >0){
        console.table(resultado)
    }else{
        Swal.fire({
            title: "Disculpe",
            text: "No disponemos del producto "+ palabraClave,
            icon: "warning"
            })
        }
    }


console.log(...listaProductos)

fetch("productos.json")
.then(response => response.json())
.then(data=>{

const articulos = data.articulos

const articulosContainer = document.getElementById("articulosContainer")
const verCarrito = document.getElementById("ver-carrito")
verCarrito.className ="ver-carrito"
const modalContainer = document.getElementById("modal-container")
modalContainer.className ="modal-container"

let carrito =[]

articulos.forEach(articulo => {
    const articuloContainer =document.createElement("div");
    articuloContainer.className = "articuloContainer";

    const articuloElement = document.createElement("p");
    articuloElement.className = "articuloElement";
    articuloElement.textContent = `Artículo: ${articulo.nombre} | Precio:$${articulo.precio}`;

    const imagenElement = document.createElement("img");
    imagenElement.src = articulo.imagen; 
    imagenElement.className = "imagenArticulo";

    const btnComprar = document.createElement("button");
    btnComprar.className = "btnComprar";
    btnComprar.textContent = "Agregar al Carrito";



    btnComprar.addEventListener("click",function () {
        carrito.push({
            nombre: articulo.nombre,
            precio: articulo.precio,
            stock: articulo.stock,
            imagen: articulo.imagen
        });
        console.log(carrito);
    });

    verCarrito.addEventListener("click",function () {
        modalContainer.innerHTML = "";
        modalContainer.style.display = "flex";
        const modalheader = document.createElement("div");
        modalheader.className = "modal-header";
        modalheader.innerHTML = `<h1 class="modal-header">Carrito</h1>;`
        modalContainer.append(modalheader);

        const modalButton = document.createElement("h1");
        modalButton.className = "modal-button";
        modalButton.innerText = "x";

        modalButton.addEventListener("click",function () {
            modalContainer.style.display = "none";
        });

        modalheader.append(modalButton);


        carrito.forEach((articulo) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
        <img src="${articulo.imagen}">
        <h3>${articulo.nombre}</h3>
        <p>Precio: $${articulo.precio}$</p>
        `;
        modalContainer.append(carritoContent);
        });

        const total = carrito.reduce((acc, el) => acc + el.precio, 0);
        
        const totalBuying = document.createElement("div");
        totalBuying.className = "totalContent";
        totalBuying.innerHTML = `Total: $${total}`;
        modalContainer.append(totalBuying);
    });
    

    articuloContainer.append(articuloElement);
    articuloContainer.append(btnComprar)
    articulosContainer.appendChild(articuloContainer);
    articuloContainer.append(imagenElement);
});





})

.catch(error=>{
    console.error("Fallaste bb")
});
