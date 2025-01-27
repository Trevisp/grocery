let cart = [];

function openModal() {
    const modal = document.getElementById('modal');
    modal.style.display = "block";
    updateModal();
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = "none";
}

function addToCart(productName, price, imgSrc) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;  // Update total price
    } else {
        cart.push({
            name: productName,
            price: parseFloat(price.replace('KSH ', '')),  // Remove 'KSH' and parse as float
            quantity: 1,
            imgSrc: imgSrc,
            totalPrice: parseFloat(price.replace('KSH ', '')),  // Initial total price
        });
    }
    updateCartIcon();
    openModal();
}

function updateCartIcon() {
    const cartIcon = document.querySelector('.cart i');
    cartIcon.classList.add('has-items');
}

function updateModal() {
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = ''; // Clear existing items

    let totalPriceOfAllItems = 0; // Variable to store total price of all items
    
    cart.forEach(item => {
        totalPriceOfAllItems += item.totalPrice; // Add each item's total price to the total
        
        const productRow = document.createElement('div');
        productRow.classList.add('product-row');
        
        productRow.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}" width="80px">
            <p>${item.name}</p>
            <p>KSH ${item.totalPrice.toFixed(2)}</p>
            <div class="quantity">
                <span class="quantity-control" onclick="changeQuantity('${item.name}', 1)"><i class="fa-solid fa-plus"></i></span> 
                <p>${item.quantity}</p>
                <span class="quantity-control" onclick="changeQuantity('${item.name}', -1)"><i class="fa-solid fa-minus"></i></span>
            </div>
        `;
        
        modalBody.appendChild(productRow);
    });

    // Update the modal footer with the total price of all items
    const modalFooter = document.querySelector('.modal-footer');
    const totalPriceDisplay = document.createElement('p');
    totalPriceDisplay.classList.add('total-price');
    totalPriceDisplay.innerHTML = `<b>Total: KSH ${totalPriceOfAllItems.toFixed(2)}</b>`;
    
    // Remove the old total price if it exists, then add the updated one
    const existingTotalPrice = modalFooter.querySelector('.total-price');
    if (existingTotalPrice) {
        modalFooter.removeChild(existingTotalPrice);
    }
    modalFooter.appendChild(totalPriceDisplay);
}

function changeQuantity(productName, change) {
    const item = cart.find(item => item.name === productName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.name !== productName);
        } else {
            item.totalPrice = item.quantity * item.price;  // Update total price
        }
    }
    updateModal();
}

// Example usage: assuming you have buttons for adding to cart
document.querySelectorAll('.view-more-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const productContainer = e.target.closest('.product-container');
        const productName = productContainer.querySelector('.cat-text').textContent;
        const price = productContainer.querySelector('.price').textContent;
        const imgSrc = productContainer.querySelector('img').src;
        
        addToCart(productName, price, imgSrc);
    });
});
//search functionality

function searchProduct() {
    let input = document.getElementById('product').value.toLowerCase();
    let productContainers = document.getElementsByClassName('product-container');
    let found = false;

    for (let i = 0; i < productContainers.length; i++) {
        let productName = productContainers[i].getElementsByClassName('cat-text')[0].innerText.toLowerCase();
        if (productName.includes(input)) {
            productContainers[i].style.display = "block";
            found = true;
        } else {
            productContainers[i].style.display = "none";
        }
    }

    if (!found) {
        let productInput = document.getElementById('product');
        productInput.value = ''; // Clear the input
        productInput.placeholder = 'No products found!'; // Display error message
        productInput.classList.add('error'); // Add an error class for styling
    } else {
        // Remove error message if a product is found
        let productInput = document.getElementById('product');
        productInput.placeholder = 'Search...';
        productInput.classList.remove('error');
    }
}
