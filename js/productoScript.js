document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const nombreProducto = params.get("producto");

  fetch("js/productos.json")
    .then((res) => res.json())
    .then((productos) => {
      const producto = productos.find(
        (p) =>
          decodeURIComponent(p.nombre.trim().toLowerCase()) ===
          nombreProducto.trim().toLowerCase()
      );

      if (!producto) {
        alert("Producto no encontrado");
        return;
      }

      document.querySelector(".product-image").src = producto.imagen;
      document.querySelector(".product-image").alt = producto.nombre;
      document.querySelector(".product-detail-title").textContent =
        producto.nombre;
      document.querySelector(".price-value").textContent =
        producto.precio.toFixed(2);
      document.querySelector(".stock-value").textContent = "15";
      document.querySelector(".description-text").textContent =
        "Producto de excelente calidad con componentes de alto rendimiento y diseño moderno.";
      document.querySelector(".product-features").innerHTML = `
        <li>Procesador potente</li>
        <li>Buena autonomía</li>
        <li>Materiales premium</li>
        <li>Ideal para oficina o estudio</li>
      `;

      const inputCantidad = document.querySelector(".quantity-input");
      const btnMenos = document.querySelectorAll(".quantity-btn")[0];
      const btnMas = document.querySelectorAll(".quantity-btn")[1];

      btnMenos.addEventListener("click", () => {
        let actual = parseInt(inputCantidad.value);
        if (actual > 1) {
          inputCantidad.value = actual - 1;
        }
      });

      btnMas.addEventListener("click", () => {
        let actual = parseInt(inputCantidad.value);
        let max = parseInt(inputCantidad.max);
        if (actual < max) {
          inputCantidad.value = actual + 1;
        }
      });

      const btnAgregar = document.querySelector(".add-to-cart-btn");
      btnAgregar.addEventListener("click", (e) => {
        e.preventDefault(); // Evita navegación inmediata

        const cantidad = parseInt(inputCantidad.value);
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        const existente = carrito.find(
          (item) => item.nombre === producto.nombre
        );
        if (existente) {
          existente.cantidad += cantidad;
        } else {
          carrito.push({
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: cantidad,
          });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));

        window.location.href = "carrito.html";
      });
    });
});
