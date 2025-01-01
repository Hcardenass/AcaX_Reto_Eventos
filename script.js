document.addEventListener("DOMContentLoaded", function () {
  const botonesAgregar = document.querySelectorAll(".agregar-carrito");
  const mensaje = document.getElementById("mensaje");
  const mensajeContenido = document.getElementById("mensaje-contenido");
  const cartCountElement = document.getElementById("cart-count");

  function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    cartCountElement.textContent = carrito.length;
  }
  actualizarContadorCarrito();

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", function (e) {
      e.preventDefault();
      const producto = {
        id: this.dataset.id,
        nombre: this.dataset.nombre,
        precio: parseFloat(this.dataset.precio),
      };

      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));

      actualizarContadorCarrito();

      mensajeContenido.textContent = `${producto.nombre} agregado al carrito`;
      mensaje.style.display = "block";

      setTimeout(function () {
        mensaje.style.display = "none";
      }, 2000);
    });
  });
});
