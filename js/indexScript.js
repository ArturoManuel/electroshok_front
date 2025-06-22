let productosMasVendidos = [];
let productosRecienLlegados = [];
let todosLosProductos = [];
let tipoActivo = "todos";

/**
 * Iniciar el archivo index.html con Live Server (si usa VSCode)
 * o una herramienta similar para poder cargar los productos correctamente,
 * en caso contrario podra encontrar algunos errores.
 *
 */

document.addEventListener("DOMContentLoaded", () => {
  fetch("js/productos.json")
    .then((res) => res.json())
    .then((data) => {
      todosLosProductos = data;

      actualizarProductosPorTipo("todos");

      configurarFiltros();
    });
});

const configurarFiltros = () => {
  const botonesDesktop = document.querySelectorAll(".nav-desktop button");
  const botonesMobile = document.querySelectorAll(".nav-mobile-menu button");

  botonesDesktop.forEach((boton) => {
    boton.addEventListener("click", () => {
      const tipo = obtenerTipoDesdeCategoriaTexto(boton.textContent);
      actualizarProductosPorTipo(tipo);
      botonesDesktop.forEach((b) => b.classList.remove("active"));
      if (tipo !== "todos") boton.classList.add("active");
    });
  });

  botonesMobile.forEach((boton) => {
    boton.addEventListener("click", () => {
      const tipo = obtenerTipoDesdeCategoriaTexto(boton.textContent);
      actualizarProductosPorTipo(tipo);
      botonesMobile.forEach((b) => b.classList.remove("active"));
      if (tipo !== "todos") boton.classList.add("active");
    });
  });

  //Configurando categorias en responsive

  const botonMobileToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.querySelector(".nav-mobile-menu");

  botonMobileToggle.addEventListener("click", () => {
    mobileMenu.style.display =
      mobileMenu.style.display === "flex" ? "none" : "flex";
  });
};

const obtenerTipoDesdeCategoriaTexto = (textoCategoria) => {
  const texto = textoCategoria.trim().toLowerCase();
  switch (texto) {
    case "celulares":
      return "celular";
    case "tablets":
      return "tablet";
    case "laptops":
      return "laptop";
    case "pc":
      return "pc";
    case "accesorios":
      return "accesorio";
    default:
      return "todos";
  }
};

const actualizarProductosPorTipo = (tipo) => {
  tipoActivo = tipo;

  if (tipo === "todos") {
    productosMasVendidos = todosLosProductos.slice(0, 5);
    productosRecienLlegados = todosLosProductos.slice(5, 10);
  } else {
    const productosFiltrados = todosLosProductos.filter(
      (producto) => producto.tipo === tipo
    );

    const mitad = Math.min(5, Math.ceil(productosFiltrados.length / 2));
    productosMasVendidos = productosFiltrados.slice(0, mitad);
    productosRecienLlegados = productosFiltrados.slice(mitad);
  }

  mostrarProductos();
};

const mostrarProductos = () => {
  const seccionProdMasVendidos = document.getElementById("best-seller");
  const seccionProdRecienLlegados = document.getElementById("fresh-products");

  let newHtmlMasVendidos = "";
  let newHtmlRecienLlegados = "";

  productosMasVendidos.forEach((item) => {
    newHtmlMasVendidos += `
      <a href="producto.html?producto=${encodeURIComponent(
        item.nombre
      )}" class="product-card">
        <div class="product-image"><img src="${item.imagen}" alt="${
      item.nombre
    }"/></div>
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
      <a href="producto.html?producto=${encodeURIComponent(
        item.nombre
      )}" class="product-card">
        <div class="product-image"><img src="${item.imagen}" alt="${
      item.nombre
    }"/></div>
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
