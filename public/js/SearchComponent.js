Vue.component('search', {
  data() {
    return {
      userSearch: '',
      showSerch: false,
    }
  },
  template: `
              <section class="header__search">
                <h2 class="visually-hidden">Header search</h2>
                <button class="header__search-btn" type="submit" id="header__search-btn" aria-label="search"
                  @click="showSerch = !showSerch">
                  <svg class="white-icon">
                    <use xlink:href="./img/sprite.svg#loupe"></use>
                  </svg>
                </button>
                <form class="header__search-form" action="#" id="header__search-input" @submit.prevent="$parent.$refs.products.filter(userSearch)" v-show="showSerch">
                  <label for="search__form" class="visually-hidden">search</label>
                  <input class="header__search-input" type="search" placeholder="Search" id="search__form" v-model="userSearch">
               </form>
              </section>
        
          `
})