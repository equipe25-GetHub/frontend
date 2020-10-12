<template>
  <div class="search-box">
    <div class="fixed-filter">
      <div class="filter-box">
        <h3>Filtre seus interesses:</h3>
        <SelectSearch :items="filters.filters" @select="selected($event)" />
      </div>
      <div class="recommendation">
        <div class="icon-recommendation">
          <span class="mdi mdi-account-multiple-plus"></span>
        </div>
        <strong>Indique um parceiro</strong>
      </div>
    </div>
    <template v-if="page == 'category'">
      <div class="category-box">
        <h3>Filtre pela categoria:</h3>
        <SelectSearch :items="filters.categories" @select="search($event)" />
      </div>
    </template>
    <template v-if="page == 'product'">
      <div class="products-box">
        <h3>Filtre por produtos:</h3>
        <SelectSearch :items="filters.products" @select="search($event)" />
      </div>
    </template>
    <template v-if="page == 'locality'">
      <div class="locality-box">
        <InputDefault title="Estado" icon="city" />
        <InputDefault title="Cidade" icon="city-variant" />
        <div class="button-search">
          <ButtonDefault name="Buscar" @clicked="search()" />
        </div>
      </div>
    </template>
    <template v-if="page == 'all' || hasSearch">
      <div class="search">
        <ul>
          <li>
            <div class="provider-box">
              <div class="provider-infos">
                <img src="/img/logo_empresa1.png" alt="logo" />
                <div class="text-provider">
                  <h2>Nome da Empresa</h2>
                  <span>Categoria: Minha categoria é tal</span>
                  <span>Localidade: Sou do lugar tal</span>
                  <span>Produtos: Meus produtos são tais</span>
                </div>
              </div>

              <ButtonDefault name="Contatar" @clicked="search()" />
            </div>
          </li>
          <li>
            <div class="provider-box">
              <div class="provider-infos">
                <img src="/img/logo_empresa1.png" alt="logo" />
                <div class="text-provider">
                  <h2>Nome da Empresa</h2>
                  <span>Categoria: Minha categoria é tal</span>
                  <span>Localidade: Sou do lugar tal</span>
                  <span>Produtos: Meus produtos são tais</span>
                </div>
              </div>

              <ButtonDefault name="Contatar" @clicked="search()" />
            </div>
          </li>
          <li>
            <div class="provider-box">
              <div class="provider-infos">
                <div class="image-box">
                  <img src="/img/logo_empresa1.png" alt="logo" />
                </div>
                <div class="text-provider">
                  <h2>Nome da Empresa</h2>
                  <span>Categoria: Minha categoria é tal</span>
                  <span>Localidade: Sou do lugar tal</span>
                  <span>Produtos: Meus produtos são tais</span>
                </div>
              </div>

              <ButtonDefault name="Contatar" @clicked="search()" />
            </div>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from '@vue/composition-api';
import VueRouter from 'vue-router';
import SelectSearch from './../../components/select/SelectDefault.vue';
import InputDefault from './../../components/inputs/InputDefault.vue';
import ButtonDefault from './../../components/buttons/ButtonDefault.vue';
import { filters } from './../../utils';

export default defineComponent({
  components: { SelectSearch, InputDefault, ButtonDefault },
  setup(props, context) {
    const page = ref('');
    const hasSearch = ref(false);
    function selected(item: string, router: VueRouter) {
      if (item == 'Categoria') {
        page.value = 'category';
        hasSearch.value = false;
      } else if (item == 'Produto') {
        page.value = 'product';
        hasSearch.value = false;
      } else if (item == 'Localidade') {
        page.value = 'locality';
        hasSearch.value = false;
      } else if (item == 'Todos') page.value = 'all';
    }
    function search() {
      hasSearch.value = true;
    }
    console.log(filters);
    return { selected, page, filters, search, hasSearch };
  }
});
</script>

<style lang="scss">
.search-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  .fixed-filter {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    width: 100%;
    height: 13%;
    justify-content: space-evenly;
    justify-content: baseline;
    border-bottom: 1px solid var(--color-button-border);
    .filter-box {
      display: flex;
      flex-direction: column;
      h3 {
        margin-bottom: 5px;
      }
    }
    .recommendation {
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon-recommendation {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--color-primary);
        cursor: pointer;
        &:hover {
          background: var(--color-primary-dark);
        }
        span {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 3rem;
          color: var(--color-secundary);
        }
      }
      strong {
        font-size: 1.8rem;
      }
    }
  }
  .category-box,
  .products-box,
  .locality-box {
    display: flex;
    flex-direction: column;
    height: auto;
    align-items: center;
    margin: 30px;
    h3 {
      margin-bottom: 5px;
    }
    .button-search {
      margin-top: 20px;
    }
  }
  .search {
    border-top: 1px solid var(--color-button-border);
    overflow: auto;
    height: 100%;
    min-width: 400px;
    li {
      list-style: none;
      &:not(:last-child) {
        border-bottom: 1px solid #cccccc77;
      }
    }
    .provider-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: var(--color-primary);
      border: 1px solid var(--color-input-border);
      border-radius: 25px;
      box-shadow: 0 3px 6px 0 #00000029;
      margin: 20px;
      .provider-infos {
        img {
          height: 100px;
          width: 100px;
          padding: 5px;
        }
        display: flex;
        width: 100%;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        color: var(--color-secundary);

        .text-provider {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin: 10px;
          h2 {
            margin: 5px 0 20px 0;
          }
          span {
            font-size: 1.8rem;
            &:not(:last-child) {
              border-bottom: 1px solid #cccccc77;
              margin-bottom: 5px;
            }
          }
        }
      }
      .button-box {
        margin: 20px 0 20px 0;
      }
    }
  }
}
@media (min-width: 700px) {
  .search {
    width: 600px;
  }
}
</style>