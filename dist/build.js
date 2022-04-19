/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/CartComponent.js":
/*!************************************!*\
  !*** ./public/js/CartComponent.js ***!
  \************************************/
/***/ (() => {

eval("Vue.component('cart', {\n  data() {\n    return {\n      // cartUrl: './getBasket.json',\n      cartItems: [],\n      showCart: false\n    };\n  },\n\n  mounted() {\n    this.$parent.getJson(`/api/cart`).then(data => {\n      for (let item of data.contents) {\n        this.$data.cartItems.push(item);\n      }\n    });\n  },\n\n  methods: {\n    addProduct(item) {\n      let find = this.cartItems.find(el => el.id_product === item.id_product);\n\n      if (find) {\n        this.$parent.putJson(`/api/cart/${find.id_product}`, {\n          quantity: 1\n        }).then(data => {\n          if (data.result === 1) {\n            find.quantity++;\n          }\n        });\n      } else {\n        const prod = Object.assign({\n          quantity: 1\n        }, item);\n        this.$parent.postJson(`/api/cart`, prod).then(data => {\n          if (data.result === 1) {\n            this.cartItems.push(prod);\n          }\n        });\n      } // this.$parent.getJson(`addToBasket.json`)\n      //   .then(data => {\n      //     if (data.result === 1) {\n      //       let find = this.cartItems.find(el => el.id_product === item.id_product);\n      //       if (find) {\n      //         find.quantity++;\n      //       } else {\n      //         const prod = Object.assign({\n      //           quantity: 1\n      //         }, item); //создание нового объекта на основе двух, указанных в параметрах\n      //         this.cartItems.push(prod)\n      //       }\n      //     }\n      //   })\n\n    },\n\n    remove(item) {\n      if (item.quantity > 1) {\n        this.$parent.putJson(`/api/cart/${item.id_product}`, {\n          quantity: -1\n        }).then(data => {\n          if (data.result) {\n            item.quantity--;\n          }\n        });\n      } else {\n        this.$parent.delJson(`/api/cart/${item.id_product}`, item).then(data => {\n          if (data.result) {\n            this.cartItems.splice(this.cartItems.indexOf(item), 1);\n          } else {\n            console.log('error');\n          }\n        });\n      }\n    }\n\n  },\n  template: `\n            <div class=\"header__basket\">\n              <div class=\"header__basket__row basketHeader\">\n              <div>Название товара</div>\n              <div>Количество</div>\n              <div>Цена за шт.</div>\n              <div>Итого</div>\n              </div>\n\n              <cartItem v-for=\"item of cartItems\" \n              :key=\"item.id_product\" \n              :cartItem=\"item\" \n              @remove=\"remove\"\n              @add=\"addProduct\">\n              </cartItem>\n            </div>\n  `\n});\nVue.component('cartItem', {\n  props: ['cartItem'],\n  template: `\n            <div class=\"header__basket__row\">\n                <div>{{ cartItem.product_name }}</div>\n              <div>\n                <span class=\"productCount\">{{ cartItem.quantity }}</span> шт.\n              </div>\n              <div>$ {{ cartItem.price }}</div>\n              <div>\n                $<span class=\"productTotalRow\">{{cartItem.quantity*cartItem.price}}</span>\n                <button class=\"header__basket__row-btn\" @click=\"$emit('remove', cartItem)\">&times;</button>\n              </div>\n            </div>\n  `\n});\n\n//# sourceURL=webpack://homework_8/./public/js/CartComponent.js?");

/***/ }),

/***/ "./public/js/ErrorComp.js":
/*!********************************!*\
  !*** ./public/js/ErrorComp.js ***!
  \********************************/
/***/ (() => {

eval("Vue.component('error', {\n  data() {\n    return {\n      text: ''\n    };\n  },\n\n  computed: {\n    isVisible() {\n      return this.text !== '';\n    }\n\n  },\n  template: `\n    <div class=\"error-block\" v-if=\"isVisible\">\n        <p class=\"error-msg\">\n        <button class=\"close-btn\" @click=\"text=''\">&times;</button>\n        {{ text }}\n</p>\n</div>\n    `\n});\n\n//# sourceURL=webpack://homework_8/./public/js/ErrorComp.js?");

/***/ }),

/***/ "./public/js/ProductComponent.js":
/*!***************************************!*\
  !*** ./public/js/ProductComponent.js ***!
  \***************************************/
/***/ (() => {

eval("Vue.component('products', {\n  data() {\n    return {\n      // catalogUrl: '/catalogData.json',\n      filtered: [],\n      products: []\n    };\n  },\n\n  mounted() {\n    this.$parent.getJson(`/api/products`).then(data => {\n      for (let item of data) {\n        item.webpPath = `img/${item.id_product}.webp`;\n        item.jpgPath = `img/${item.id_product}.jpg`;\n        this.products.push(item);\n        this.filtered.push(item);\n      }\n    });\n  },\n\n  methods: {\n    filter(userSearch) {\n      let regexp = new RegExp(userSearch, 'i');\n      this.filtered = this.products.filter(el => regexp.test(el.product_name));\n    }\n\n  },\n  template: `\n            <ul class=\"products__list\">\n              <product v-for=\"item of filtered\" \n              :key=\"item.id_product\" \n              :img = \"item.imgPath\"\n              :product=\"item\" @add-product=\"$parent.$refs.cart.addProduct\"></product> \n            </ul>`\n});\nVue.component('product', {\n  props: ['product', 'img'],\n  template: `\n            <li class=\"products__item\">\n              <section class=\"products__list-overlay\">\n                <a href=\"#\" class=\"products__link\">\n                  <picture>\n                    <source :srcset=\"product.webpPath\" type=\"image/webp\">\n                    <img class=\"products__item-img\" :src=\"product.jpgPath\" :alt=\"product.product_name\">\n                  </picture>\n                  <div class=\"products__item-wrapper\">\n                    <h3 class=\"products__item-title\">{{product.product_name}}</h3>\n                    <p class=\"products__item-text\">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>\n                    <p class=\"products__item-price\">$<span class=\"products__item-value\">{{product.price}}</span></p>\n                  </div>\n                </a>\n                <button class=\"products__item-cart\" type=\"button\" aria-label=\"cart\" data-productId=\"0\" @click=\"$emit('add-product', product)\">\n                  <svg class=\"white-icon\">\n                    <use xlink:href=\"./img/sprite.svg#cart\"></use>\n                 </svg>\n                  <span class=\"products__item-cart-text\">Add to cart</span>\n                </button>\n              </section>\n            </li>\n   `\n});\n\n//# sourceURL=webpack://homework_8/./public/js/ProductComponent.js?");

/***/ }),

/***/ "./public/js/SearchComponent.js":
/*!**************************************!*\
  !*** ./public/js/SearchComponent.js ***!
  \**************************************/
/***/ (() => {

eval("Vue.component('search', {\n  data() {\n    return {\n      userSearch: '',\n      showSerch: false\n    };\n  },\n\n  template: `\n              <section class=\"header__search\">\n                <h2 class=\"visually-hidden\">Header search</h2>\n                <button class=\"header__search-btn\" type=\"submit\" id=\"header__search-btn\" aria-label=\"search\"\n                  @click=\"showSerch = !showSerch\">\n                  <svg class=\"white-icon\">\n                    <use xlink:href=\"./img/sprite.svg#loupe\"></use>\n                  </svg>\n                </button>\n                <form class=\"header__search-form\" action=\"#\" id=\"header__search-input\" @submit.prevent=\"$parent.$refs.products.filter(userSearch)\" v-show=\"showSerch\">\n                  <label for=\"search__form\" class=\"visually-hidden\">search</label>\n                  <input class=\"header__search-input\" type=\"search\" placeholder=\"Search\" id=\"search__form\" v-model=\"userSearch\">\n               </form>\n              </section>\n        \n          `\n});\n\n//# sourceURL=webpack://homework_8/./public/js/SearchComponent.js?");

/***/ }),

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/***/ (() => {

eval("const app = new Vue({\n  el: '#app',\n  data: {\n    showCart: false,\n    showMenu: false\n  },\n  methods: {\n    getJson(url) {\n      return fetch(url).then(result => result.json()).catch(error => console.log(error));\n    },\n\n    postJson(url, data) {\n      return fetch(url, {\n        method: 'POST',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => {\n        this.$refs.error.text = error;\n      });\n    },\n\n    putJson(url, data) {\n      return fetch(url, {\n        method: 'PUT',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => {\n        this.$refs.error.text = error;\n      });\n    },\n\n    delJson(url, data) {\n      return fetch(url, {\n        method: 'DELETE',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => {\n        this.$refs.error.text = error;\n      });\n    }\n\n  },\n\n  mounted() {}\n\n});\n\n//# sourceURL=webpack://homework_8/./public/js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_modules__["./public/js/main.js"]();
/******/ 	__webpack_modules__["./public/js/CartComponent.js"]();
/******/ 	__webpack_modules__["./public/js/ErrorComp.js"]();
/******/ 	__webpack_modules__["./public/js/ProductComponent.js"]();
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/SearchComponent.js"]();
/******/ 	
/******/ })()
;