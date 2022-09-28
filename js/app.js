//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaRemeras = document.querySelector('#lista-remeras');
let articulosCarrito = [];

//Events
registrarEventListeners();
function registrarEventListeners() {
    //Se agrega el producto al presionar "Agregar al carrito"
    listaRemeras.addEventListener('click', agregarRemera);

    //Elimina producto del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vacia el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //retear carrito
        limpiarHTML(); //Elimina todo el html
    })
}

//Functions
function agregarRemera(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito') ){
        const remeraSelecionada = e.target.parentElement.parentElement;
        leerDatosRemera(remeraSelecionada);
    }
    
}

//Elimina un producto9 del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-remera')) {
        const remeraId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( remera => remera.id !== remeraId );

        carritoHTML(); //iterar sobre el carrito y mostrar el html
    }
} 

//Lee el contenido del html al que le dimos click y extrae la información de la remera
function leerDatosRemera(remera) {
    //crear un objeto con el contenido de la remera actual
    const infoRemera = {
        imagen: remera.querySelector('img').src,
        titulo: remera.querySelector('h4').textContent,
        precio: remera.querySelector('.precio span').textContent,
        id: remera.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( remera => remera.id === infoRemera.id);
    if (existe) {
            //Actualizar la cantidad
            const remeras = articulosCarrito.map( remera => {
                if (remera.id === infoRemera.id) {
                    remera.cantidad++; 
                    return remera; //retorna objeto actualizado
            } else {
                return remera; //retorno objeto no duplicados
            }
        });
        articulosCarrito = [...remeras];
    } else {
        //Agrega el producto al carrito
        articulosCarrito = [...articulosCarrito, infoRemera];
    }
    carritoHTML();
}

//Muestra el carrito de compra en el html
function carritoHTML() {

    //limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( (remera) => {
        const { imagen, titulo, precio, cantidad, id} = remera;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-remera" data-id="${id}"> X </a>
            </td>
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

//Elimina las remeras del tbody
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}