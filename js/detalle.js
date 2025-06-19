
const productoFijo = {
  id: 1,
  nombre: "Laptop XPS 13",
  marca: "Dell",
  imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSIpHsriaKJuwY2IpngNe7W7I6Zf6feddJ8w&s",
  precio: 4693.96,
  descripcion: "La laptop Dell XPS 13 es un portátil ultradelgado con pantalla InfinityEdge, procesador Intel Core de última generación y excelente duración de batería."
};

const mostrarDetalleProducto = () => {
  
  document.querySelector('.product-detail-image img').src = productoFijo.imagen;
  
  const infoProducto = document.querySelector('.product-detail-info');
  
  
  const contenidoHTML = `
    <h1 class="product-detail-title">${productoFijo.nombre}</h1>
    <p class="product-detail-brand">Marca: ${productoFijo.marca}</p>
    <p class="product-detail-stock">Stock: <span>15 unidades</span></p>
    <p class="product-detail-price">S/ ${productoFijo.precio}</p>
    <div class="product-detail-quantity">
      <button class="quantity-btn" aria-label="Disminuir cantidad">-</button>
      <input class="quantity-input" type="number" min="1" max="15" value="1" readonly/>
      <button class="quantity-btn" aria-label="Aumentar cantidad">+</button>
    </div>
    <button class="add-to-cart-btn">
      <i class="fa-solid fa-cart-plus"></i> Agregar al carrito
    </button>
  `;
  
 
  infoProducto.innerHTML = contenidoHTML;
  
 
  actualizarPrecioTotal(1);
  
 
  const descContainer = document.querySelector('.product-detail-description p');
  
    descContainer.textContent = productoFijo.descripcion;
 
};


const actualizarPrecioTotal = (cantidad) => {
  const precioTotal = productoFijo.precio * cantidad;
  document.querySelector('.product-detail-price').textContent = `S/ ${precioTotal.toFixed(2)}`;
};


const inicializarControlCantidad = () => {
  const decrementarBtn = document.querySelector('.quantity-btn:first-child');
  const incrementarBtn = document.querySelector('.quantity-btn:last-child');
  const inputCantidad = document.querySelector('.quantity-input');
  
  const minCantidad = 1;
  const maxCantidad = parseInt(inputCantidad.max) || 15;
  
  decrementarBtn.addEventListener('click', () => {
    let cantidad = parseInt(inputCantidad.value);
    if (cantidad > minCantidad) {
      inputCantidad.value = cantidad - 1;
      mostrarFeedbackCantidad(inputCantidad.value);
    }
  });
  
  incrementarBtn.addEventListener('click', () => {
    let cantidad = parseInt(inputCantidad.value);
    if (cantidad < maxCantidad) {
      inputCantidad.value = cantidad + 1;
      mostrarFeedbackCantidad(inputCantidad.value);
    }
  });
  
  const agregarAlCarritoBtn = document.querySelector('.add-to-cart-btn');
  agregarAlCarritoBtn.addEventListener('click', (event) => {
    event.preventDefault(); 
    
    const cantidad = parseInt(inputCantidad.value);
    
    mostrarNotificacion(`${cantidad} unidad(es) agregadas`);
  });
};

const mostrarFeedbackCantidad = (cantidad) => {
  const inputCantidad = document.querySelector('.quantity-input');
  inputCantidad.classList.add('cantidad-modificada');
  actualizarPrecioTotal(cantidad);
  setTimeout(() => {
    inputCantidad.classList.remove('cantidad-modificada');
  }, 300);
};

const mostrarNotificacion = (mensaje) => {
  let notificacion = document.querySelector('.notificacion-temporal');
  
  if (!notificacion) {
    notificacion = document.createElement('div');
    notificacion.className = 'notificacion-temporal';
    document.body.appendChild(notificacion);
  }
  
  
  notificacion.textContent = mensaje;
  notificacion.style.display = 'block';
  notificacion.style.opacity = '1';
  
  
  setTimeout(() => {
    notificacion.style.opacity = '0';
    setTimeout(() => {
      notificacion.style.display = 'none';
    }, 500);
  }, 3000);
};

const crearEstilos = () => {
  if (document.querySelector('#estilos-detalle')) return;
  
  const estilos = document.createElement('style');
  estilos.id = 'estilos-detalle'; 
  estilos.textContent = `
    .notificacion-temporal {
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #4CAF50;
      color: white;
      padding: 15px 25px;
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      display: none;
      opacity: 0;
      transition: opacity 0.5s;
      z-index: 1000;
    }
    
    .cantidad-modificada {
      background-color: #f0f8ff;
      transition: background-color 0.3s;
    }
  `;
  document.head.appendChild(estilos);
};


let eventosInicializados = false;

document.addEventListener('DOMContentLoaded', () => {
 
  crearEstilos();
  
  mostrarDetalleProducto();
  
  const decrementarBtn = document.querySelector('.quantity-btn:first-child');
  const incrementarBtn = document.querySelector('.quantity-btn:last-child');
  const agregarAlCarritoBtn = document.querySelector('.add-to-cart-btn');
  
  if (decrementarBtn) {
    const nuevoDecrementarBtn = decrementarBtn.cloneNode(true);
    decrementarBtn.parentNode.replaceChild(nuevoDecrementarBtn, decrementarBtn);
  }
  
  if (incrementarBtn) {
    const nuevoIncrementarBtn = incrementarBtn.cloneNode(true);
    incrementarBtn.parentNode.replaceChild(nuevoIncrementarBtn, incrementarBtn);
  }
  
  if (agregarAlCarritoBtn) {
    const nuevoAgregarBtn = agregarAlCarritoBtn.cloneNode(true);
    agregarAlCarritoBtn.parentNode.replaceChild(nuevoAgregarBtn, agregarAlCarritoBtn);
  }
  
  inicializarControlCantidad();
});