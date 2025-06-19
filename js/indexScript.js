let productosMasVendidos = [];
let productosRecienLlegados = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("js/productos.json")
      .then(res => res.json())
      .then(data => {

        productosMasVendidos = data.slice(0, 5);
        productosRecienLlegados = data.slice(5, 10);
        mostrarProductos();
      });
});

const mostrarProductos = () => {
  const seccionProdMasVendidos = document.getElementById("best-seller");
  const seccionProdRecienLlegados = document.getElementById("fresh-products");

  let newHtmlMasVendidos = "";
  let newHtmlRecienLlegados = "";

  productosMasVendidos.forEach((item) => {
    newHtmlMasVendidos += `
      <a href="producto.html?producto=${encodeURIComponent(item.nombre)}" class="product-card">
        <div class="product-image"><img src="${item.imagen}" alt="${item.nombre}"/></div>
        <div class="product-info">
          <div class="product-details">
            <p class="product-brand">${item.marca}</p>
            <p class="product-name">${item.nombre}</p>
            <p class="product-price">S/ ${item.precio}</p>
          </div>
          <div class="product-actions">
            <img src="assets/images/icon_addCar.svg" alt="Agregar al carrito" class="add-icon"/>
            <span class="add-text">Comprar</span>
          </div>
        </div>
      </a>`;
  });

  productosRecienLlegados.forEach((item) => {
    newHtmlRecienLlegados += `
      <a href="producto.html?producto=${encodeURIComponent(item.nombre)}" class="product-card">
        <div class="product-image"><img src="${item.imagen}" alt="${item.nombre}"/></div>
        <div class="product-info">
          <div class="product-details">
            <p class="product-brand">${item.marca}</p>
            <p class="product-name">${item.nombre}</p>
            <p class="product-price">S/ ${item.precio}</p>
          </div>
          <div class="product-actions">
            <img src="assets/images/icon_addCar.svg" alt="Agregar al carrito" class="add-icon"/>
            <span class="add-text">Comprar</span>
          </div>
        </div>
      </a>`;
  });

  seccionProdMasVendidos.innerHTML = newHtmlMasVendidos;
  seccionProdRecienLlegados.innerHTML = newHtmlRecienLlegados;
};
const formularioPago = document.querySelector(".checkout-payment form");

formularioPago.addEventListener("submit", e => {
    e.preventDefault();

    localStorage.removeItem("carrito");

    alert("¡Gracias por tu compra! Tu pedido ha sido procesado con éxito.");

    window.location.href = "index.html";
});
