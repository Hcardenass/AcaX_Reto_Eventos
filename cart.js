document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cart-items");
  const finalizarCompraBtn = document.getElementById("finalizar-compra");
  const cartCountElement = document.getElementById("cart-count");

  function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    cartCountElement.textContent = carrito.length;

    if (carrito.length === 0) {
      cartItemsContainer.innerHTML =
        '<div class="producto"><p>El carrito está vacio</p></div>';
      return;
    }

    cartItemsContainer.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
      total += item.precio;
      const itemElement = document.createElement("div");
      itemElement.className = "producto";
      itemElement.innerHTML = ` 
                <h2>${item.nombre}</h2>
                <p>Precio: $${item.precio.toFixed(2)}</p>
                <button class="remove-item agregar-carrito" data-index="${index}">Eliminar</button>
                 `;
      cartItemsContainer.appendChild(itemElement);
    });

    // Añadir el total
    const totalElement = document.createElement("div");
    totalElement.className = "producto";
    totalElement.innerHTML = `<h2>Total: $${total.toFixed(2)}</h2>`;
    cartItemsContainer.appendChild(totalElement);
  }
  cargarCarrito();

  // Eliminar items
  cartItemsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-item")) {
      const index = parseInt(e.target.dataset.index);
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      cargarCarrito();
    }
  });

  // Finalizar compra
  finalizarCompraBtn.addEventListener("click", function () {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    const resumen = window.open(
      "",
      "Resumen de Compra",
      "width=600,height=400"
    );
    let contenido = `
            <html>
            <head>
                <title>Resumen de Compra</title>
                <style>
                    body { font-family: 'Segoe UI', sans-serif; padding: 20px; }
                    .item { margin: 10px 0; padding: 10px; border-bottom: 1px solid #ddd; }
                    .total { margin-top: 20px; font-weight: bold; }
                </style>
            </head>
            <body>
                <h1>Resumen de tu Compra</h1>
        `;

    let total = 0;
    carrito.forEach((item) => {
      contenido += `
                <div class="item">
                    <h3>${item.nombre}</h3>
                    <p>Precio: $${item.precio.toFixed(2)}</p>
                </div>
            `;
      total += item.precio;
    });

    contenido += `
                <div class="total">Total: $${total.toFixed(2)}</div>
            </body>
            </html>
        `;

    resumen.document.write(contenido);

    // Limpiar carrito
    localStorage.removeItem("carrito");
    cargarCarrito();
  });
});

