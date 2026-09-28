let cartCount = 0;

async function loadProducts() {
  try {
    const response = await fetch('http://localhost:3001/products');

    if (!response.ok) {
      throw new Error('Ошибка сервера: ' + response.status);
    }

    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error(error);
    const catalog = document.querySelector('.catalog');
    catalog.innerHTML += `
      <p class="error">Не удалось загрузить товары. Проверьте, запущен ли json-server.</p>
    `;
  }
}

function renderProducts(products) {
  const catalog = document.querySelector('.catalog');
  const counter = document.getElementById('cart-count');

  products.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price} тг</p>
      <button>В корзину</button>
    `;

    // обработчик клика на кнопку внутри forEach
    card.querySelector('button').addEventListener('click', () => {
      cartCount++;
      counter.textContent = cartCount;
    });

    catalog.appendChild(card);
  });
}

loadProducts();