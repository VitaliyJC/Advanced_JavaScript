'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this._getProducts()
      .then(data => {
        this.goods = data;
        // console.log(data);
        this.render()
      });
  }

  _getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const item = new ProductItem(product);
      block.insertAdjacentHTML("beforeend", item.render());
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
    this.title = product.product_name;
    this.id = product.id_product;
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

//Добавление объектов в корзину
class ProductBasket {
  constructor(container = '.header__basket') {
    this.container = container;
    this.goods = [];
    this._btnBasket(); //Появление информации по клику корзины
    this._getBasket()
      .then(data => {
        this.goods = data.contents;
        this.render()
      });
  }

  //Появление информации по клику корзины
  _btnBasket() {
    document.getElementById('basket').addEventListener('click', () => {
      document.querySelector(this.container).classList.toggle('visually-hidden');
    });
  }

  _getBasket() {
    return fetch(`${API}/getBasket.json`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const item = new ProductBasketItem(product);
      block.insertAdjacentHTML("beforeend", item.render());
    }
  }
}

//Товары в корзине
class ProductBasketItem {
  constructor(product) {
    this.title = product.product_name;
    this.id = product.id_product;
    this.price = product.price;
  }
  render() {
    return `  <div class="header__basket__row">
                <div>${this.title}</div>
                <div>
                  <span>1</span> шт.
                </div>
                <div>$${this.price}</div>
                <div class="price__wrp">
                  $<span>${this.price}</span>
                </div>
                <button class="btn-del" type="button">Удалить</button>
              </div>
          `
  }
}

let bsk = new ProductBasket();

// list.sumItem();