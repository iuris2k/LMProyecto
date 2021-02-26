//Cálculo para descuento automático

function calcular() {
    //Obtengo el valor del porcentaje a aplicar
    let valor = document.getElementById("valor").value;

    console.log(valor);

    if (valor < 100) {
        let result1 = document.getElementById("result1");
        let result2 = document.getElementById("result2");

        //Le aplico el porcentaje de descuento
        let promo1 = 15 * (1 - valor / 100);
        let promo2 = 29 * (1 - valor / 100);

        //agrego los resultados al DOM y fijo decimales en 2
        result1.innerHTML = `$${promo1.toFixed(2)}`;
        result2.innerHTML = `$${promo2.toFixed(2)}`;
    } else {
        console.log("El valor debe ser entre 0 y 100");
        alert("OJO! El valor debe ser entre 0 y 100");
    }
}

//Storage y Json

let testObject = { one: 1, two: 2, three: 3 };

// Poner el objeto en el storage
localStorage.setItem("testObject", JSON.stringify(testObject));

// Recibir el objeto desde el storage
let retrievedObject = localStorage.getItem("testObject");

console.log("retrievedObject: ", JSON.parse(retrievedObject));

//const carritoJson = JSON.stringify(valor);

//console.log(valor);
//console.log(carritoJson);

/* Guardar informacion en localStorage */
//localStorage.setItem("nombreStorage", nombre);
//localStorage.setItem("carritoStorage", carritoJson);
//localStorage.cursoStorage = curso;
//localStorage.producto = producto;

/* Leer informacion de localStorage */
//const nombreRecuperado = localStorage.getItem("nombreStorage");
//const cursoRecuperado = localStorage["cursoStorage"];
//const carritoRecuperado = JSON.parse(localStorage.carritoStorage);

//console.log(localStorage.carritoStorage);
//console.log(carritoRecuperado);

// function guardarStorage() {
//     localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
// }

//Desafío incorporar eventos

window.onload = function() {
    const boton = document.getElementById("boton");
    boton.addEventListener("click", function(event) {
        const nombre = document.getElementById("valor");
        if (nombre.value != "") {
            let contenedor = document.createElement("div");
            contenedor.setAttribute("class", "nota");
            contenedor.innerHTML = `
                <h1>${nombre.value}</h1>
                <button type="button" class="w-40 btn btn-lg btn-outline-primary" onclick="eliminar(event)">Eliminar</button>
            `;

            document.getElementById("container").appendChild(contenedor);
        }
    });
};

function eliminar(event) {
    event.target.parentElement.parentElement.removeChild(
        event.target.parentElement
    );
}

//Carrito de compras

const addToShoppingCartButtons = document.querySelectorAll(".addToCart");
addToShoppingCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener("click", addToCartClicked);
});

const comprarButton = document.querySelector(".comprarButton");
comprarButton.addEventListener("click", comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
    ".shoppingCartItemsContainer"
);

function addToCartClicked(event) {
    const button = event.target;
    const card = button.closest(".card");

    const cardHeaders = card.querySelector(".card-headers").textContent;
    const cardTitle = card.querySelector(".card-title").textContent;

    addItemToShoppingCart(cardHeaders, cardTitle);
}

function addItemToShoppingCart(cardHeaders, cardTitle) {
    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
        "shoppingCartcardHeaders"
    );
    for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === cardHeaders) {
            let elementQuantity = elementsTitle[
                i
            ].parentElement.parentElement.parentElement.querySelector(
                ".shoppingCartItemQuantity"
            );
            elementQuantity.value++;
            $(".toast").toast("show");
            updateShoppingCartTotal();
            return;
        }
    }

    const shoppingCartRow = document.createElement("div");
    const shoppingCartContent = `
  <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <h6 class="shopping-cart-item-title shoppingCartcardHeaders text-truncate ml-3 mb-0">${cardHeaders}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartcardTitle">${cardTitle}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow);

    shoppingCartRow
        .querySelector(".buttonDelete")
        .addEventListener("click", removeShoppingCartItem);

    shoppingCartRow
        .querySelector(".shoppingCartItemQuantity")
        .addEventListener("change", quantityChanged);

    updateShoppingCartTotal();
}

function updateShoppingCartTotal() {
    let total = 0;
    const shoppingCartTotal = document.querySelector(".shoppingCartTotal");

    const shoppingCartItems = document.querySelectorAll(".shoppingCartItem");

    shoppingCartItems.forEach((shoppingCartItem) => {
        const shoppingCartcardTitleElement = shoppingCartItem.querySelector(
            ".shoppingCartcardTitle"
        );
        const shoppingCartcardTitle = Number(
            shoppingCartcardTitleElement.textContent.replace("$", "")
        );
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
            ".shoppingCartItemQuantity"
        );
        const shoppingCartItemQuantity = Number(
            shoppingCartItemQuantityElement.value
        );
        total = total + shoppingCartcardTitle * shoppingCartItemQuantity;
    });
    shoppingCartTotal.innerHTML = `$${total.toFixed(2)}`;
}

function removeShoppingCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest(".shoppingCartItem").remove();
    updateShoppingCartTotal();
}

function quantityChanged(event) {
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateShoppingCartTotal();
}

function comprarButtonClicked() {
    shoppingCartItemsContainer.innerHTML = "";
    updateShoppingCartTotal();
}

// JQuery

$(document).ready(function() {
    $(window).scroll(function() {
        if ($(document).scrollTop() > 50) {
            $("h6").addClass("test");
        } else {
            $("h6").removeClass("test");
        }
    });
});

// API

let map = L.map("map").setView([-34.61, -58.37], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([-34.61, -58.37])
    .addTo(map)
    .bindPopup("Casa de Gobierno.<br> Buenos Aires, Argentina.")
    .openPopup();

// Botón de Scroll up o de ir hacia arriba

document.getElementById("button-up").addEventListener("click", scrollUp);

function scrollUp() {
    let currentScroll = document.documentElement.scrollTop;

    if (currentScroll > 0) {
        window.requestAnimationFrame(scrollUp);
        window.scrollTo(0, currentScroll - currentScroll / 10);
    }
}

///

buttonUp = document.getElementById("button-up");

window.onscroll = function() {
    let scroll = document.documentElement.scrollTop;

    if (scroll > 175) {
        buttonUp.style.transform = "scale(1)";
    } else if (scroll < 500) {
        buttonUp.style.transform = "scale(0)";
    }
};

// Cotización del dólar
// con extensión Allow CORS que permite recibir la información

// document.querySelector("#dolar").addEventListener("click", function() {
//     obtenerDatos("dolaroficial");
// });

// document.querySelector("#dolarblue").addEventListener("click", function() {
//     obtenerDatos("dolarblue");
// });

// document.querySelector("#dolarbolsa").addEventListener("click", function() {
//     obtenerDatos("dolarbolsa");
// });

// function obtenerDatos(valor) {
//     let url = `https://api-dolar-argentina.herokuapp.com/api/${valor}`;

//     const api = new XMLHttpRequest();
//     api.open("GET", url, true);
//     api.send();

//     api.onreadystatechange = function() {
//         if (this.status == 200 && this.readyState == 4) {
//             let datos = JSON.parse(this.responseText);
//             console.log(datos);
//             let resultado = document.querySelector("#resultado");
//             resultado.innerHTML = "";

//             resultado.innerHTML = `<li>El precio para la compra es: $${datos.compra} El precio para la venta es: $${datos.venta}</li>`;
//             resultado.classList = "fondo__titulos--h2";
//         }
//     };
// }

//  Cotizacion Dolar con Jquery y AJAX
// con extensión Allow CORS que permite recibir la información

document.querySelector("#dolar").addEventListener("click", function() {
    $.ajax({
        url: "https://api-dolar-argentina.herokuapp.com/api/dolaroficial", //un archivo json con datos de usuarios: nombre, apellido, etc
        dataType: "json",
        success: function(data) {
            console.log(data);
            let resultado = document.querySelector("#resultado");
            resultado.innerHTML = "";

            resultado.innerHTML = `<li>El precio para la compra es: $${data.compra} El precio para la venta es: $${data.venta}</li>`;
            resultado.classList = "fondo__titulos--h2";
        },
    });
});

document.querySelector("#dolarblue").addEventListener("click", function() {
    $.ajax({
        url: "https://api-dolar-argentina.herokuapp.com/api/dolarblue", //un archivo json con datos de usuarios: nombre, apellido, etc
        dataType: "json",
        success: function(data) {
            console.log(data);
            let resultado = document.querySelector("#resultado");
            resultado.innerHTML = "";

            resultado.innerHTML = `<li>El precio para la compra es: $${data.compra} El precio para la venta es: $${data.venta}</li>`;
            resultado.classList = "fondo__titulos--h2";
        },
    });
});

document.querySelector("#dolarbolsa").addEventListener("click", function() {
    $.ajax({
        url: "https://api-dolar-argentina.herokuapp.com/api/dolarbolsa", //un archivo json con datos de usuarios: nombre, apellido, etc
        dataType: "json",
        success: function(data) {
            console.log(data);
            let resultado = document.querySelector("#resultado");
            resultado.innerHTML = "";

            resultado.innerHTML = `<li>El precio para la compra es: $${data.compra} El precio para la venta es: $${data.venta}</li>`;
            resultado.classList = "fondo__titulos--h2";
        },
    });
});

// Animaciones con JQuery

$("#tit").hide();
$("#tit").slideDown(3000);