<template>


  <div class="products-page">
    <!-- <div class="navbar section">
      <div class="navbar__aside desktop-only">
        <LazyHydrate never>
          <SfHeading
            :level="3"
            title="Cateogorías principales"
            class="navbar__title" />
        </LazyHydrate>
      </div>
      
    </div> -->
    <div id="category">
      <SfBreadcrumbs
        class="breadcrumbs desktop-only"
        :breadcrumbs="breadcrumbs"
      />


      <div class="main section">
        
        <div class="sidebar desktop-only">
          <div class="categories-header">
                      <h3>Resultados para: <span class="search-term">{{ th.getFacetsFromURL().rootCatSlug.replace('-', ' ') }}</span></h3>
                      <p>Se han encontrado {{ pagination.totalItems }} productos</p>
                  </div>
              <LazyHydrate when-idle>
                  <SfLoader
                  :class="{ 'loading--categories': loading }"
                  :loading="loading">

                  <SfAccordion
                      v-e2e="'categories-accordion'"
                      :show-chevron="true"
                  >
                      <SfAccordionItem
                      v-for="(cat, i) in categoryTree && categoryTree.items"
                      :key="i"
                      :header="cat.label"
                      :class="'image-'+cat.label.toLowerCase()"
                      :img="cat.label.toLowerCase() == 'grow'? '/icons/SVG/categorias/grow.svg': cat.label.toLowerCase() == 'smoke'? '/icons/SVG/categorias/smoke.svg': cat.label.toLowerCase() == 'semillas'? '/icons/SVG/categorias/semillas.svg':cat.label.toLowerCase() == 'extractores'? '/icons/SVG/categorias/extraccion.svg':cat.label.toLowerCase() == 'tabaqueria'? '/icons/SVG/categorias/tabaqueria.svg': ''"
                    
                      >
                      <template>
                          <SfList class="list">
                          <SfListItem class="list__item">
                              <SfMenuItem
                              :count="cat.count || ''"
                              :label="cat.label"
                              >
                              <template #label>
                                  <nuxt-link
                                  :to="localePath(th.getCatLink(cat))"
                                  :class="cat.isCurrent ? 'sidebar--cat-selected' : ''"
                                  >
                                  Ver {{ cat.label }}
                                  </nuxt-link>
                              </template>
                              </SfMenuItem>
                          </SfListItem>
                          <SfListItem
                              class="list__item"
                              v-for="(subCat, j) in cat.items"
                              :key="j"
                          >
                              <SfMenuItem
                              :count="subCat.count || ''"
                              :label="subCat.label"
                              >
                              <template #label="{ label }">
                                  <nuxt-link
                                  :to="localePath(th.getCatLink(subCat))"
                                  :class="subCat.isCurrent ? 'sidebar--cat-selected' : ''"
                                  >
                                  {{ label }}
                                  </nuxt-link>
                              </template>
                              </SfMenuItem>
                          </SfListItem>
                          </SfList>
                      </template>
                      </SfAccordionItem>
                  </SfAccordion>
                  </SfLoader>
              </LazyHydrate>
        </div>
        <SfLoader :class="{ loading }" :loading="loading">
          <div class="products" v-if="!loading">
            <!-- <CategoryPageHeader :pagination="pagination"/> -->
            <transition-group
              v-if="isCategoryGridView"
              appear
              name="products__slide"
              tag="div"
              class="products__grid"
            >
            

              <SfProductCard
                v-e2e="'category-product-card'"
                v-for="(product, i) in products"
                :key="productGetters.getSlug(product)"
                :style="{ '--index': i }"
                :title="productGetters.getName(product)"
                :image="product.coverImageLarge"
                :regular-price="$n(product.regularPrice, 'currencyNoCents', 'cl').replace('CLP', '$').replace(',', '.')"
                :special-price="productGetters.getPrice(product).regular == productGetters.getPrice(product).special? '': productGetters.getPrice(product).special == 0?'': $n(productGetters.getPrice(product).special, 'currencyNoCents', 'cl').replace('CLP', '$').replace(',', '.')"
                :max-rating="5"
                :score-rating="productGetters.getAverageRating(product)"
                :show-add-to-cart-button="true"
                :is-in-wishlist="isInWishlist({ product })"
                :is-added-to-cart="isInCart({ product })"
                :link="localePath(`/p/${productGetters.getId(product)}/${product.slug}`)"
                :badgeLabel="product.percentage?product.percentage+'%':''"
                class="products__product-card"
                @click:wishlist="!isInWishlist({ product }) ? addItemToWishlist({ product }) : removeProductFromWishlist(product)"
                @click:add-to-cart="HandleAddToCart({ product, quantity: 1 })"
              />
            </transition-group>
            <transition-group
              v-else
              appear
              name="products__slide"
              tag="div"
              class="products__list"
            >
              <SfProductCardHorizontal
                v-e2e="'category-product-card'"
                v-for="(product, i) in products"
                class="products__product-card-horizontal"
                :key="productGetters.getSlug(product)"
                :style="{ '--index': i }"
                :title="productGetters.getName(product)"
                :description="productGetters.getDescription(product)"
                :image="product.coverImageLarge"
                :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
                :special-price="productGetters.getPrice(product).special && $n(productGetters.getPrice(product).special, 'currency')"
                :max-rating="5"
                :score-rating="3"
                :qty="1"
                :is-in-wishlist="isInWishlist({ product })"
                :link="localePath(`/p/${productGetters.getId(product)}/${product.slug}`)"
                @input="productsQuantity[product._id] = $event"
                @click:wishlist="!isInWishlist({ product }) ? addItemToWishlist({ product }) : removeProductFromWishlist(product)"
                @click:add-to-cart="HandleAddToCart({ product, quantity: 1})"
              >

                <template #configuration>
                  <SfProperty
                    class="desktop-only"
                    name="Size"
                    value="XS"
                    style="margin: 0 0 1rem 0;"
                  />
                  <SfProperty class="desktop-only" name="Color" value="white" />
                </template>
                <template #actions>
                  <SfButton
                    class="sf-button--text desktop-only"
                    style="margin: 0 0 1rem auto; display: block;"
                    @click="() => {}"
                  >
                    {{ $t('Save for later') }}
                  </SfButton>
                </template>
              </SfProductCardHorizontal>
            </transition-group>

            <LazyHydrate on-interaction>
              <SfPagination
                v-if="!loading"
                class="products__pagination"
                v-show="pagination.totalPages > 1"
                :current="pagination.currentPage"
                :total="pagination.totalPages"
                :visible="5"
              />
            </LazyHydrate>

          </div>
        </SfLoader>
      </div> 
    </div>

    <div id="related">

      <LazyHydrate when-visible>
        <div class="similar-products">
          <SfHeading title="- Podría interesarte - " :level="2"/>
        </div>
      </LazyHydrate>

      <LazyHydrate when-visible>
        <SfCarousel class="carousel" :settings="{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }">
          <template #prev="{go}">
            <SfArrow
              aria-label="prev"
              class="sf-arrow--left sf-arrow--long"
              @click="go('prev')"
            />
          </template>
          <template #next="{go}">
            <SfArrow
              aria-label="next"
              class="sf-arrow--right sf-arrow--long"
              @click="go('next')"
            />
          </template>
          <SfCarouselItem class="carousel__item" v-for="(product, i) in featured" :key="i" style="margin-right: 10px;">
            <SfProductCard
              :title="productGetters.getName(product)"
              :image="productGetters.getCoverImage(product)"
              :regular-price="$n(product.regularPrice, 'currencyNoCents', 'cl').replace('CLP', '$').replace(',', '.')"
              :special-price="$n(productGetters.getPrice(product).regular, 'currencyNoCents', 'cl') === $n(productGetters.getPrice(product).special, 'currencyNoCents', 'cl')? '': $n(productGetters.getPrice(product).special, 'currencyNoCents', 'cl').replace('CLP', '$').replace(',', '.')"
              :show-add-to-cart-button="true"
              :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
              class="carousel__item__product"
              :badgeLabel="product.percentage?product.percentage+'%':''"
              @click:add-to-cart="HandleAddToCart({ product, quantity:1 })"
            />
          </SfCarouselItem>
        </SfCarousel>
      </LazyHydrate>


    </div>

  </div>


</template>

<script>
import {
  SfSidebar,
  SfButton,
  SfList,
  SfIcon,
  SfHeading,
  SfMenuItem,
  SfFilter,
  SfProductCard,
  SfProductCardHorizontal,
  SfPagination,
  SfAccordion,
  SfSelect,
  SfBreadcrumbs,
  SfLoader,
  SfColor,
  SfProperty,
  SfCarousel,
  SfArrow
} from '@storefront-ui/vue';
import { computed, ref, onMounted } from '@nuxtjs/composition-api';
import { useCart, useWishlist, productGetters, useFacet, facetGetters, wishlistGetters } from '@vue-storefront/prestashop';
import { useUiHelpers, useUiState, useUiNotification } from '~/composables';
import { onSSR } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';
import Vue from 'vue';
import cacheControl from './../helpers/cacheControl';
import CategoryPageHeader from '~/components/CategoryPageHeader';
import { addBasePath } from '@vue-storefront/core';

// TODO(addToCart qty, horizontal): https://github.com/vuestorefront/storefront-ui/issues/1606
export default {
  transition: 'fade',
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5
  }),
  setup(props, context) {
    const th = useUiHelpers();
    const uiState = useUiState();
    const { addItem: addItemToCart, isInCart } = useCart();
    const { result: productResult, search: productSearch, loading } = useFacet();
    const result = ref(null);
    const { send: sendNotification } = useUiNotification();
    const { addItem: addItemToWishlist, isInWishlist, removeItem: removeItemFromWishlist, wishlist } = useWishlist();

    const productsQuantity = ref({});
    const products = computed(() => facetGetters.getProducts(productResult.value));
    const categoryTree = computed(() => facetGetters.getCategoryTree(productResult.value));

    const breadcrumbs = computed(() => facetGetters.getBreadcrumbs(productResult.value));
    const sortBy = computed(() => facetGetters.getSortOptions(productResult.value));
    const facets = computed(() => facetGetters.getGrouped(productResult.value));
    const pagination = computed(() => facetGetters.getPagination(productResult.value));

    const selectedFilters = ref({});
    const setSelectedFilters = () => {
      if (!facets.value.length || Object.keys(selectedFilters.value).length) return;
      selectedFilters.value = facets.value.reduce((prev, curr) => ({
        ...prev,
        [curr.id]: curr.options
          .filter(o => o.selected)
          .map(o => o.id)
      }), {});
    };

    onSSR(async () => {
      await productSearch({ 
        type: 'search',
        page: th.getFacetsFromURL().page,
        term: th.getFacetsFromURL().rootCatSlug
      });

      result.value = facetGetters.getProducts(productResult.value);
      
      // setSelectedFilters();
    });

    const { changeFilters, isFacetColor } = useUiHelpers();
    const { toggleFilterSidebar } = useUiState();

    onMounted(() => {
      context.root.$scrollTo(context.root.$el, 2000);
      setSelectedFilters();
    });

    const isFilterSelected = (facet, option) => (selectedFilters.value[facet.id] || []).includes(option.id);

    const selectFilter = (facet, option) => {
      if (!selectedFilters.value[facet.id]) {
        Vue.set(selectedFilters.value, facet.id, []);
      }

      if (selectedFilters.value[facet.id].find(f => f === option.id)) {
        selectedFilters.value[facet.id] = selectedFilters.value[facet.id].filter(f => f !== option.id);
        changeFilters(selectedFilters.value);
        return;
      }

      selectedFilters.value[facet.id].push(option.id);
      changeFilters(selectedFilters.value);
    };

    const clearFilters = () => {
      toggleFilterSidebar();
      selectedFilters.value = {};
      changeFilters(selectedFilters.value);
    };

    const applyFilters = () => {
      toggleFilterSidebar();
    };

    const removeProductFromWishlist = (productItem) => {
      const productsInWhishlist = computed(() => wishlistGetters.getItems(wishlist.value));
      const product = productsInWhishlist.value.find(wishlistProduct => wishlistProduct.variant.sku === productItem.sku);
      removeItemFromWishlist({ product });
    };

    return {
      ...uiState,
      sendNotification,
      th,
      products,
      categoryTree,
      loading,
      productGetters,
      pagination,
      sortBy,
      facets,
      breadcrumbs,
      addItemToWishlist,
      removeProductFromWishlist,
      isInWishlist,
      addItemToCart,
      isInCart,
      productsQuantity,
      isFacetColor,
      selectFilter,
      isFilterSelected,
      selectedFilters,
      clearFilters,
      applyFilters,
      addBasePath,
      featured: computed(() =>
        facetGetters.getFeaturedProducts(productResult.value)
      ),
    };
  },
  methods: {
    HandleAddToCart(productObj) {
      this.addItemToCart(productObj).then(() => {
        this.sendNotification({
          key: 'added_to_cart',
          message: '¡Se agregó a tu carrito!',
          type: 'success',
          title: '¡Producto agregado!',
          icon: 'check'
        });
      });
    }
  },
  components: {
    CategoryPageHeader,
    SfButton,
    SfSidebar,
    SfIcon,
    SfList,
    SfFilter,
    SfProductCard,
    SfProductCardHorizontal,
    SfPagination,
    SfMenuItem,
    SfAccordion,
    SfSelect,
    SfBreadcrumbs,
    SfLoader,
    SfColor,
    SfHeading,
    SfProperty,
    LazyHydrate,
    SfCarousel,
    SfArrow
  }
};
</script>

<style lang="scss" scoped>
#category {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 95%;
    margin: 0 auto;
  }
}
.main {
  &.section {
    padding: var(--spacer-xs);
    @include for-desktop {
      padding: 0;
    }
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
.navbar {
  position: relative;
  display: flex;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 1px 0 1px 0;
  }
  &.section {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
      background: #006E6C;
      margin-bottom: 2rem;
    }
  }
  &__aside {
    align-items: center;
    padding: var(--spacer-sm) 0;
    flex: 0 0 15%;
    padding: 5px;
    max-width: 95%;
    display: block;
    width: 100%;
    margin: 0 auto;
  }
  &__title {
    --heading-title-font-weight: var(--font-weight--semibold);
    --heading-title-font-size: var(--font-size--xl);
  }
}
.main {
  display: flex;
}
.list {
  --menu-item-font-size: var(--font-size--sm);
  &__item {
    &:not(:last-of-type) {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }
    .nuxt-link-exact-active {
      text-decoration: underline;
    }
  }
}
.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0;
  &__grid {
    justify-content: center;
    @include for-desktop {
      justify-content: flex-start;
    }
  }
  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__product-card {
    --product-card-title-margin: var(--spacer-base) 0 0 0;
    --product-card-title-font-weight: var(--font-weight--medium);
    --product-card-title-margin: var(--spacer-xs) 0 0 0;
    flex: 1 1 50%;
    @include for-desktop {
      --product-card-title-font-weight: var(--font-weight--normal);
      --product-card-add-button-bottom: var(--spacer-base);
      --product-card-title-margin: var(--spacer-sm) 0 0 0;
    }
  }
  &__product-card-horizontal {
    flex: 0 0 100%;
    @include for-mobile {
      ::v-deep .sf-image {
        --image-width: 5.3125rem;
        --image-height: 7.0625rem;
      }
    }
  }
  &__slide-enter {
    opacity: 0;
    transform: scale(0.5);
  }
  &__slide-enter-active {
    transition: all 0.2s ease;
    transition-delay: calc(0.1s * var(--index));
  }
  @include for-desktop {
    &__grid {
      margin: var(--spacer-sm) 0 0 var(--spacer-sm);
    }
    &__pagination {
      display: flex;
      justify-content: center;
      margin: var(--spacer-xl) 0 0 0;
    }
    &__product-card-horizontal {
      margin: var(--spacer-lg) 0;
    }
    &__product-card {
      flex: 1 1 25%;
    }
    &__list {
      margin: 0 0 0 var(--spacer-sm);
    }
  }
  &__show-on-page {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    &__label {
      font-family: var(--font-family--secondary);
      font-size: var(--font-size--sm);
    }
  }
}
.sidebar {
  flex: 0 0 20%;
  padding: var(--spacer-sm);
  border: 1px solid var(--c-light);
  border-width: 0 1px 0 0;
}
.loading {
  margin: var(--spacer-3xl) auto;
  @include for-desktop {
    margin-top: 6.25rem;
  }
  &--categories {
    @include for-desktop {
      margin-top: 3.75rem;
    }
  }
}

.navbar.section{
  margin-top: 2rem;
}

.navbar.section h3{
  color: #fff;
  font-size: 16px;
}


#category .sf-accordion .sf-accordion-item button{
  padding: 1rem 0.5rem;
}

#category .similar-products {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: var(--spacer-2xs);
  padding-top: 3rem;
  --heading-padding: 0;
  padding-top: 5rem;
  padding-bottom: 5rem;

  border-bottom: 1px var(--c-light) solid;
  @include for-desktop {
    border-bottom: 0;
    justify-content: center;
    padding-bottom: 0;
  }

  h2{
    color: #808080;
    font-weight: 500;
  }
}

#category .sidebar{
    padding: 0px;
    border-radius: 5px;
    border: 1px solid #333333;
    margin-top: 10px;
  }

#category .categories-header{
    padding: 1rem;
    text-align: start;
  }

  #category .search-term{
    width: 100%;
    display: block;
    font-size: 15px;
    color: #0caa91;
  }
  
  
  #category .sf-accordion .sf-accordion-item{
    border-bottom: none;
    padding: 5px 20px;
  }
  
  #category .sf-accordion .sf-accordion-item button{
    padding: 2px 1rem;
  }
</style>
