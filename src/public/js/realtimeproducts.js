document.addEventListener('DOMContentLoaded', () => {
  const productsGrid = document.getElementById('products');
  const restockForm = document.getElementById('restock-products');
  const socket = io();

  socket.on('products', (products) => {
    productsGrid.innerHTML = '';
    
    products.payload.forEach((product) => {
      const productCard = document.createElement('div');
      productCard.classList.add('card');
      productCard.innerHTML = `
        <div class="card-title">
            <div class="card-img-top">
            <img src="${product.thumbnails}" alt="..." />
            </div>
            <h5>${product.title}</h5>
        </div>
        <div class="card-body">
            <p class="card-text">${product.description}</p>
            <p class="card-text">Stock: ${product.stock}</p>
            <p class="card-text">Precio: $${product.price}</p>
            <button class="btn btn-primary">Eliminar</button>
        </div>
        `;
      productsGrid.appendChild(productCard);

      productCard.querySelector('button').addEventListener('click', (event) => {
        event.preventDefault();
        console.log('MARTIN_LOG=> productCard.querySelector => button => click => product', product);
        socket.emit('deleteProduct', product.id);
        restockForm.style.display = 'block';
      });
    });
  });
});
