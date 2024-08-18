// Inicialización del carrito y productos
let cart = [];
const products = [
    { id: 1, name: "Leche", price: 1000 },
    { id: 2, name: "Pan de Molde", price: 2000 },
    { id: 3, name: "Queso", price: 1200 },
    { id: 4, name: "Mermelada", price: 890 },
    { id: 5, name: "Azúcar", price: 1300 },
    { id: 6, name: "Mantequilla de Maní", price: 2290 },
];

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los botones "Añadir al Carrito"
    const buttons = document.querySelectorAll('.add');
    buttons.forEach(button => {
        button.addEventListener('click', addItemToCart);
    });

    // Configurar el botón de checkout
    const checkoutButton = document.getElementById('checkout');
    checkoutButton.addEventListener('click', () => {
        alert('Compra finalizada');
    });
});

// Función para agregar productos al carrito
function addItemToCart(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    const button = event.target;
    
    // Obtener ID del producto y precio desde los atributos data-* del botón
    const id = parseInt(button.getAttribute('data-id'), 10);
    const price = parseInt(button.getAttribute('data-price'), 10);
    
    // Obtener la cantidad del input asociado
    const amountInput = button.previousElementSibling; // El input número es el elemento anterior al botón
    const amount = parseInt(amountInput.value, 10);
    
    // Buscar el producto en el array de productos
    const product = products.find(p => p.id === id);
    
    // Verificar si el producto ya está en el carrito
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
        // Si el producto ya está en el carrito, solo actualizar la cantidad
        cartItem.quantity += amount;
    } else {
        // Si no está, añadirlo al carrito
        cart.push({ id: product.id, name: product.name, price: product.price, quantity: amount });
    }
    
    // Actualizar el HTML del carrito
    updateCartUI();
}

// Función para actualizar la interfaz del carrito
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    // Limpiar el contenedor de items
    cartItemsContainer.innerHTML = '';
    
    // Calcular el total
    let totalPrice = 0;
    
    // Mostrar cada item en el carrito
    cart.forEach(item => {
        const itemElement = document.createElement('p');
        itemElement.textContent = `${item.name} (x${item.quantity}): $${item.price * item.quantity}`;
        cartItemsContainer.appendChild(itemElement);
        
        // Sumar al total
        totalPrice += item.price * item.quantity;
    });
    
    // Mostrar el total
    totalPriceElement.textContent = totalPrice;
}


















