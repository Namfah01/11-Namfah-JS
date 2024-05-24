const productForm = document.getElementById('productForm');
const productDashboard = document.getElementById('productDashboard');
const cart = [];
const addToCartBtn = document.getElementById('addToCartBtn');
const calculatePriceBtn = document.getElementById('calculatePriceBtn');
const totalPrice = document.getElementById('totalPrice')

productForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const image = document.getElementById('productImage').value;

    if (!isNaN(price) && /\.(jpg|png|gif)$/i.test(image)) {
        const product = { name, price: parseFloat(price), image };
        addProductToDashboard(product);
		document.getElementById('productName').value = '';
		document.getElementById('productPrice').value = '';
		document.getElementById('productImage').value = '';
    } else {
        alert('Invalid input');
    }
});

function addProductToDashboard(product) {
    const productElement = document.createElement('div');
    productElement.innerHTML = `
        <input type="checkbox" class="productSelect">
        <span>${product.name}</span>
        <span>฿${product.price}</span>
        <img src="${product.image}" width="100" height="100">
    `;
	productElement.className = 'font-sans font-semibold text-[18px]';
    productDashboard.appendChild(productElement);
}

addToCartBtn.addEventListener('click', function () {
    const selectedProducts = document.querySelectorAll('.productSelect:checked');
    cart.length = 0;
    selectedProducts.forEach(productElement => {
        const name = productElement.nextElementSibling.textContent;
        const price = parseFloat(productElement.nextElementSibling.nextElementSibling.textContent.slice(1));
        cart.push({ name, price });
    });
    displayCart();
});

function displayCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = 'Cart: ';
    cart.forEach(product => {
        cartDiv.innerHTML += `${product.name} (฿${product.price}), `;
    });
}

calculatePriceBtn.addEventListener('click', function () {
    const total = cart.reduce((sum, product) => sum + product.price, 0);
    alert(`Total Price: ${total.toFixed(2)}฿`) ;
});

calculatePriceBtn.addEventListener('click', function () {
    const total = cart.reduce((sum, product) => sum + product.price, 0);
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = `Total Price: ${total.toFixed(2)}฿`;
});

addToCartBtn.addEventListener('click', function () {
    const selectedProducts = document.querySelectorAll('.productSelect:checked');
    cart.length = 0;
    selectedProducts.forEach(productElement => {
        const name = productElement.nextElementSibling.textContent;
        const price = parseFloat(productElement.nextElementSibling.nextElementSibling.textContent.slice(1));
        const image = productElement.nextElementSibling.nextElementSibling.nextElementSibling.getAttribute('src');
        cart.push({ name, price, image });
    });
    displayCart();
});

function displayCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = 'Cart: ';
    cart.forEach(product => {
        cartDiv.innerHTML += `${product.name} (${product.price}฿), <img src="${product.image}" width="100" height="100">, `;
    });
}


function displayCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    cart.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.innerHTML = `
            ${product.name} (${product.price}฿) <img src="${product.image}" width="100" height="100"> <i class="fa-solid fa-trash fa-lg absolute right-[-8px] top-[12px]" style="color: #f03838;"></i>
        `;
        productElement.className = 'relative';
        const removeBtn = productElement.querySelector('.fa-trash');
        removeBtn.addEventListener('click', () => removeFromCart(index));

        cartDiv.appendChild(productElement);
        cartDiv.appendChild(document.createElement('br'));
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}


