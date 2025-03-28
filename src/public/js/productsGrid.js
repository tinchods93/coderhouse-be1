const fetchProducts = async (apiUrl) => {
  const response = await fetch(apiUrl).then((response) => response.json());

  return response;
};
const loadProducts = async (productsPayload, components) => {
  console.log('MARTIN_LOG=> page', productsPayload);

  const { productsGrid, nextPageLink, prevPageLink, currentPage } = components;

  const productGridContent = document.createElement('div');

  productsPayload?.payload?.forEach((product) => {
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
              <button class="btn btn-primary">Carrito</button>
          </div>
          `;

    productGridContent.appendChild(productCard);
  });

  productsGrid.innerHTML = productGridContent.innerHTML;

  if (productsPayload.hasNextPage) {
    const queries = productsPayload.nextLink.split('/api/products?')[1];
    nextPageLink.href = `?${queries}`;
    nextPageLink.style.display = 'block';
    nextPageLink.innerHTML = 'Siguiente';
  }

  if (productsPayload.hasPrevPage) {
    const queries = productsPayload.prevLink.split('/api/products?')[1];
    prevPageLink.href = `?${queries}`;
    prevPageLink.style.display = 'block';
    prevPageLink.innerHTML = 'Anterior';
  }

  // currentPage.innerHTML = productsPayload.page;
};

const buildApiUrl = () => {
  let apiUrl = 'http://localhost:8080/api/products?page=:page';
  // obtener los query params de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page');
  const limit = urlParams.get('limit');
  const sort = urlParams.get('sort');
  const query = urlParams.get('query');

  apiUrl = apiUrl.replace(':page', page || 1);

  if (limit) {
    apiUrl = apiUrl + `&limit=${limit}`;
  }
  if (sort) {
    apiUrl = apiUrl + `&sort=${sort}`;
  }
  if (query) {
    apiUrl = apiUrl + `&query=${query}`;
  }

  console.log('MARTIN_LOG=> apiUrl', apiUrl);
  return {
    apiUrl,
    currentPageNumber: page || 1,
  };
};

const reloadPage = async () => {
  const productsGrid = document.getElementById('products');
  const nextPageLink = document.getElementById('next-page');
  const prevPageLink = document.getElementById('prev-page');
  const currentPage = document.getElementById('page-number');
  //   const restockForm = document.getElementById('restock-products');

  productsGrid.innerHTML = '';

  // obtener los query params de la URL

  const { apiUrl, currentPageNumber } = buildApiUrl();
  currentPage.innerHTML = currentPageNumber;
  console.log('MARTIN_LOG=> RELOAD', apiUrl);

  const products = await fetchProducts(apiUrl);

  await loadProducts(products, {
    productsGrid,
    nextPageLink,
    prevPageLink,
    currentPage,
  });
};

document.addEventListener('DOMContentLoaded', async () => {
  await reloadPage();
});
