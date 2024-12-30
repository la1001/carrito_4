// API URL
const apiUrl = 'https://fakestoreapi.com/products'; // Puedes usar cualquier API REST

// Verifica si hay productos en el carrito almacenados en localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Función para cargar los productos desde la API
async function loadProducts() {
    const response = await fetch(apiUrl);
    const products = await response.json();
    displayProducts(products);
}

// Función para mostrar los productos
function displayProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';  // Limpiar los productos previos

    products.forEach(product => {
        const productHTML = `
            <div class="col-md-4 mb-4 product-item">
                <div class="card">
                    <div class="card-img">
                      <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p>$${product.price}</p>
                        <button class="btn btn-primary" onclick="addToCart('${product.title}', ${product.price})">Añadir al Carrito</button>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productHTML;
    });
}

// Función para añadir productos al carrito
function addToCart(productName, productPrice) {
    cart.push({ productName, productPrice });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartButton();
}

// Función para actualizar el botón del carrito
function updateCartButton() {
    const cartButton = document.getElementById("cartButton");
    cartButton.innerText = `Carrito (${cart.length})`;
}

// Cargar productos al cargar la página
window.onload = function() {
    loadProducts();
    updateCartButton();
};
