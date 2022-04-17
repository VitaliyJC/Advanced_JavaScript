Vue.component('products', {
  data() {
    return {
      // catalogUrl: '/catalogData.json',
      filtered: [],
      products: []
    }
  },
  mounted() {
    this.$parent.getJson(`/api/products`)
      .then(data => {
        for (let item of data) {
          item.webpPath = `img/${item.id_product}.webp`;
          item.jpgPath = `img/${item.id_product}.jpg`;
          this.products.push(item);
          this.filtered.push(item);
        }
      })
  },
  methods: {
    filter(userSearch) {
      let regexp = new RegExp(userSearch, 'i');
      this.filtered = this.products.filter(el => regexp.test(el.product_name));
    }
  },
  template: `
            <ul class="products__list">
              <product v-for="item of filtered" 
              :key="item.id_product" 
              :img = "item.imgPath"
              :product="item" @add-product="$parent.$refs.cart.addProduct"></product> 
            </ul>`
});
Vue.component('product', {
  props: ['product', 'img'],
  template: `
            <li class="products__item">
              <section class="products__list-overlay">
                <a href="#" class="products__link">
                  <picture>
                    <source :srcset="product.webpPath" type="image/webp">
                    <img class="products__item-img" :src="product.jpgPath" :alt="product.product_name">
                  </picture>
                  <div class="products__item-wrapper">
                    <h3 class="products__item-title">{{product.product_name}}</h3>
                    <p class="products__item-text">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                    <p class="products__item-price">$<span class="products__item-value">{{product.price}}</span></p>
                  </div>
                </a>
                <button class="products__item-cart" type="button" aria-label="cart" data-productId="0" @click="$emit('add-product', product)">
                  <svg class="white-icon">
                    <use xlink:href="./img/sprite.svg#cart"></use>
                 </svg>
                  <span class="products__item-cart-text">Add to cart</span>
                </button>
              </section>
            </li>
   `
})