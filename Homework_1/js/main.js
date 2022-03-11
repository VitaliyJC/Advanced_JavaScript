const products = [
  { id: 1, title: 'Notebook', price: 2000 },
  { id: 2, title: 'Mouse', price: 20 },
  { id: 3, title: 'Keyboard', price: 200 },
  { id: 4, title: 'Gamepad', price: 50 },
];

//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (x) => {
  return `<div class="product-item">
                <img src='https://picsum.photos/300?${x.id || 'здесь должна быть картинка с отсутстием товара'}' alt='${x.title || 'no pictures'}'>
                <h3 class="item__title">${x.title || 'Данный товар отсутствует'}</h3>
                <p class="item__price">${x.price || '<br>'}</p>
                <div class="buy-btn__wrp">
                  <button class="buy-btn">Купить</button>
                </div>
            </div>`
};
const renderPage = (list) => {
  const productsList = list.map(item => renderProduct(item));
  console.log(productsList);
  document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products);