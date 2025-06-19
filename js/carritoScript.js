document.addEventListener('DOMContentLoaded', () => {
    const carritoContainer = document.querySelector('.cart-items');
    const totalContainer = document.querySelector('.cart-total');

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        carritoContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
        totalContainer.textContent = "S/ 0.00";
        return;
    }

    carrito.forEach((producto, index) => {
        const item = document.createElement('div');
        item.classList.add('cart-item');

        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="cart-item-image"/>
            <div class="cart-item-details">
                <h3 class="cart-item-title">${producto.nombre}</h3>
                <p class="cart-item-price">S/ ${producto.precio.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <label for="quantity-${index}">Cantidad:</label>
                    <input type="number" id="quantity-${index}" value="${producto.cantidad}" min="1" data-index="${index}" data-precio="${producto.precio}" />
                </div>
                <button class="cart-item-remove" data-index="${index}">
                    <i class="fa-solid fa-trash"></i> Eliminar
                </button>
            </div>
        `;

        carritoContainer.appendChild(item);
    });

    actualizarTotal();

    carritoContainer.addEventListener('input', e => {
        if (e.target.type === "number") {
            const index = e.target.dataset.index;
            carrito[index].cantidad = parseInt(e.target.value);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarTotal();
        }
    });


    carritoContainer.addEventListener('click', e => {
        if (e.target.closest('.cart-item-remove')) {
            const index = e.target.closest('.cart-item-remove').dataset.index;
            carrito.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            location.reload();
        }
    });

    function actualizarTotal() {
        let total = 0;
        carrito.forEach(item => {
            total += item.precio * item.cantidad;
        });
        totalContainer.textContent = `S/ ${total.toFixed(2)}`;
    }
});
