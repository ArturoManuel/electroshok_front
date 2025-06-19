document.addEventListener("DOMContentLoaded", () => {
    const resumenLista = document.querySelector(".order-summary-list");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    resumenLista.innerHTML = ""; // Limpiar contenido previo si hay

    let total = 0;
    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const li = document.createElement("li");
        li.innerHTML = `
            <span>${producto.nombre} (x${producto.cantidad})</span>
            <span class="price">S/ ${subtotal.toFixed(2)}</span>
        `;
        resumenLista.appendChild(li);
    });

    const envio = 20;
    total += envio;

    const envioLi = document.createElement("li");
    envioLi.innerHTML = `<span>Envío</span><span class="price">S/ ${envio.toFixed(2)}</span>`;
    resumenLista.appendChild(envioLi);


    const totalLi = document.createElement("li");
    totalLi.classList.add("total-row");
    totalLi.innerHTML = `<strong>Total</strong><strong>S/ ${total.toFixed(2)}</strong>`;
    resumenLista.appendChild(totalLi);


    const formulario = document.querySelector(".checkout-payment form");
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        if (carrito.length === 0) {
            alert("El carrito está vacío.");
            return;
        }

        alert("¡Gracias por tu compra! Tu pedido ha sido procesado.");
        localStorage.removeItem("carrito");
        window.location.href = "index.html";
    });
});
