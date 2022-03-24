class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this._fetchProducts();//рекомендация, чтобы метод был вызван в текущем классе
    this.render();//вывод товаров на страницу
  }
  _fetchProducts() {
    this.goods = [
      { id: 1, title: 'Notebook', price: 2000 },
      { id: 2, title: 'Mouse', price: 20 },
      { id: 3, title: 'Keyboard', price: 200 },
      { id: 4, title: 'Gamepad', price: 50 },
    ];
  }
  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const item = new ProductItem(product);
      block.insertAdjacentHTML("beforeend", item.render());
      //           block.innerHTML += item.render();
    }
  }
  sumItem() {
    let sum = 0;
    for (let product of this.goods) {
      sum += product.price;
    }
    alert(sum);
  }
}

class ProductItem {
  constructor(product) {
    this.title = product.title;
    this.id = product.id;
    this.price = product.price;
  }
  render() {
    return `<div class="product-item">
         <img src='https://picsum.photos/300?${this.id || 'здесь должна быть картинка с отсутстием товара'}' alt='${this.title || 'no pictures'}'>
         <h3 class="item__title">${this.title || 'Данный товар отсутствует'}</h3>
         <p class="item__price">${this.price || '<br>'}</p>
         <div class="buy-btn__wrp">
           <button class="buy-btn">Купить</button>
         </div>
     </div>`
  }
}

let list = new ProductList();
list.sumItem();

class Cart {
  addToCart() {

  }
  rmFromCart() {

  }
  mvInCart() {

  }
  render() {

  }
}

class ElemCart {
  render() {

  }
}