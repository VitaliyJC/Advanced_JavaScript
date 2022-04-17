Vue.component('cart', {
  data() {
    return {
      // cartUrl: './getBasket.json',
      cartItems: [],
      showCart: false
    }
  },
  mounted() {
    this.$parent.getJson(`/api/cart`)
      .then(data => {
        for (let item of data.contents) {
          this.$data.cartItems.push(item);
        }
      });
  },
  methods: {
    addProduct(item) {
      let find = this.cartItems.find(el => el.id_product === item.id_product);
      if (find) {
        this.$parent.putJson(`/api/cart/${find.id_product}`, {
            quantity: 1
          })
          .then(data => {
            if (data.result === 1) {
              find.quantity++
            }
          })
      } else {
        const prod = Object.assign({
          quantity: 1
        }, item);
        this.$parent.postJson(`/api/cart`, prod)
          .then(data => {
            if (data.result === 1) {
              this.cartItems.push(prod)
            }
          })
      }

      // this.$parent.getJson(`addToBasket.json`)
      //   .then(data => {
      //     if (data.result === 1) {
      //       let find = this.cartItems.find(el => el.id_product === item.id_product);
      //       if (find) {
      //         find.quantity++;
      //       } else {
      //         const prod = Object.assign({
      //           quantity: 1
      //         }, item); //создание нового объекта на основе двух, указанных в параметрах
      //         this.cartItems.push(prod)
      //       }
      //     }
      //   })
    },

    remove(item) {
      if (item.quantity > 1) {
        this.$parent.putJson(`/api/cart/${item.id_product}`, {
            quantity: -1
          })
          .then(data => {
            if (data.result) {
              item.quantity--;
            }
          })
      } else {
        this.$parent.delJson(`/api/cart/${item.id_product}`, item)
          .then(data => {
            if (data.result) {
              this.cartItems.splice(this.cartItems.indexOf(item), 1);
            } else {
              console.log('error');
            }
          })
      }
    },
  },
  template: `
            <div class="header__basket">
              <div class="header__basket__row basketHeader">
              <div>Название товара</div>
              <div>Количество</div>
              <div>Цена за шт.</div>
              <div>Итого</div>
              </div>

              <cartItem v-for="item of cartItems" 
              :key="item.id_product" 
              :cartItem="item" 
              @remove="remove"
              @add="addProduct">
              </cartItem>
            </div>
  `
});

Vue.component('cartItem', {
  props: ['cartItem'],
  template: `
            <div class="header__basket__row">
                <div>{{ cartItem.product_name }}</div>
              <div>
                <span class="productCount">{{ cartItem.quantity }}</span> шт.
              </div>
              <div>$ {{ cartItem.price }}</div>
              <div>
                $<span class="productTotalRow">{{cartItem.quantity*cartItem.price}}</span>
                <button class="header__basket__row-btn" @click="$emit('remove', cartItem)">&times;</button>
              </div>
            </div>
  `
})