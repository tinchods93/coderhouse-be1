const form = document.getElementById('addProductForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const price = parseFloat(document.getElementById('price').value);
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  const thumbnails = document.getElementById('thumbnails').value;
  const stock = document.getElementById('stock').value;

  const product = {
    title,
    price: parseFloat(price),
    description,
    category,
    thumbnails: thumbnails.split(','),
    stock: parseInt(stock, 10),
  };

  try {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    }).then(async (res) => {
      return {
        ok: res.status >= 200 && res.status < 300,
        data: await res.json(),
      };
    });

    console.log('MARTIN_LOG=> response', response);
    if (response.ok) {
      alert('Producto Agregado');
      form.reset();
    } else {
      alert(response.data?.error || 'Error al agregar el producto');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
