// array carrito
let cart = [];

// array productos
const products = [
    { id: 1, name: "Leche", price: 1000 },
    { id: 2, name: "Pan de Molde", price: 2000 },
    { id: 3, name: "Queso", price: 1200 },
    { id: 4, name: "Mermelada", price: 890 },
    { id: 5, name: "Azúcar", price: 1300 },
    { id: 6, name: "Mantequilla de Maní", price: 2290 },
];

// click por cada botón
const buttons = document.querySelectorAll('.add');
buttons.forEach(button => {
    button.addEventListener('click', addToCart);
})

// función agregar al carrito
function addToCart(event) {

    event.preventDefault(); // evita el comportamiento por default y que tire error el form

    const button = event.target;

    // obtiene el id del producto por data-id del button
    const id = parseInt(button.getAttribute('data-id'), 10);

    // obtiene la cantidad del input
    const amountInput = button.previousElementSibling; // para encontrar en el elemento anterior al button
    const amount = parseInt(amountInput.value, 10);

    // busca en el array products
    const product = products.find(p => p.id === id);

    // verifica si el producto esta en cart
    const item = cart.find(item => item.id === id);
    if (item) {
        // si ya está, solo actualiza la cantidad
        item.quantity += amount;
    } else {
        // si no está, lo añade a cart
        cart.push({ id: product.id, name: product.name, price: product.price, quantity: amount });
    }

    // actualiza el html del carrito
    update();
}

// función actualizar el carrito
function update() {
    const itemsContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('total-price');

    // limpiar el contenedor de items para que no se repitan
    itemsContainer.innerHTML = '';

    // calcula el total
    let totalPrice = 0;

    // muestra cada item en el carrito
    cart.forEach(item => {
        const itemCart = document.createElement('p');
        itemCart.textContent = `${item.quantity} x ${item.name}: $${(item.price * item.quantity).toLocaleString('es-CL')}`;
        itemsContainer.appendChild(itemCart);

        // crear botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', () => deleteItem(item.id));

        // agregar el botón al elemento del carrito
        itemCart.appendChild(deleteButton);
        itemsContainer.appendChild(itemCart);

        // función eliminar del carrito
        function deleteItem(id) {
            // elimina el item
            cart = cart.filter(item => item.id !== id);

            // aplica función update 
            update();
        }

        // suma al total
        totalPrice += item.price * item.quantity;
    });

    // muestra el total
    totalContainer.textContent = `Total: $${totalPrice.toLocaleString('es-CL')}`;
    
}

// click button finish
const finishButton = document.querySelector('.finish');

finishButton.addEventListener('click', finalizePurchase);

// función finalizar compra
function finalizePurchase() {

    if (cart.length === 0) {

        alert('Su carrito está vacío.\nAgregue algún producto para realizar la compra.');

    } else {

        let totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

        alert(`Realizó una compra con un total de: $${totalPrice.toLocaleString('es-CL')}.\n¡Muchas gracias por preferirnos!`);
        window.location.reload();

    }
}






