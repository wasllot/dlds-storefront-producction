<template>
  <div id="cart">
    <SfSidebar
      v-e2e="'sidebar-cart'"
      :visible="isCartSidebarOpen"
      title="Carrito"
      class="sf-sidebar--right"
      @close="toggleCartSidebar"
    >
      <template #content-top>
        <SfProperty
          v-if="totalItems"
          class="sf-property--large cart-summary desktop-only"
          name="Cantidad"
          :value="totalItems"
        />
      </template>
      <transition name="sf-fade" mode="out-in">
        <div v-if="totalItems" key="my-cart" class="my-cart">
          <div class="collected-product-list">
            <transition-group name="sf-fade" tag="div">
              <SfCollectedProduct
                v-for="product in products"
                v-e2e="'collected-product'"
                :key="cartGetters.getItemSku(product)"
                :image="addBasePath(cartGetters.getItemImage(product))"
                :title="cartGetters.getItemName(product)"
                :regular-price="$n(cartGetters.getItemPrice(product).regular, 'currency')"
                :special-price="cartGetters.getItemPrice(product).special && $n(cartGetters.getItemPrice(product).special, 'currency')"
                :stock="99999"
                @click:remove="removeItem({ product })"
                class="collected-product"
              >
                <template #configuration>
                  <div class="collected-product__properties">
                    <SfProperty
                      v-for="(attribute, key) in cartGetters.getItemAttributes(product, ['color', 'size'])"
                      :key="key"
                      :name="key"
                      :value="attribute"
                    />
                  </div>
                </template>
                <template #input>
                  <div class="sf-collected-product__quantity-wrapper">
                    <SfQuantitySelector
                      :disabled="loading"
                      :qty="cartGetters.getItemQty(product)"
                      class="sf-collected-product__quantity-selector"
                      @input="updateItemQty({ product, quantity: $event })"
                    />
                  </div>
                </template>
                <!-- @TODO: remove if https://github.com/vuestorefront/storefront-ui/issues/2022 is done -->
                <template #more-actions>{{  }}</template>
              </SfCollectedProduct>
            </transition-group>
          </div>
        </div>
        <div v-else key="empty-cart" class="empty-cart">
          <div class="empty-cart__banner">
            <SfImage
              :alt="$t('Empty bag')"
              class="empty-cart__image"
              :src="addBasePath('/icons/empty-cart.svg')"
            />
            <SfHeading
              title="Tu carrito está vacío"
              :level="2"
              class="empty-cart__heading"
            />
          </div>
        </div>
      </transition>
      <template #content-bottom>
        <transition name="sf-fade">
          <div v-if="totalItems">
            <div v-if="errors.length > 0" class="cart-error">
              {{errors[0]}}
            </div>
            <SfProperty
              name="Subtotal"
              class="sf-property--full-width sf-property--large my-cart__total-price"
            >
              <template #value>
                <SfPrice
                  :regular="$n(totals.subtotal, 'currency')"
                  :special="(totals.special !== totals.subtotal) ? $n(totals.special, 'currency') : 0"
                />
              </template>
            </SfProperty>
            <nuxt-link :to="isAuthenticated ? localePath({ name: 'shipping' }) : localePath({ name: 'user-account' })" :class="{ disabled: errors.length > 0 }">
              <SfButton
                class="sf-button--full-width color-secondary"
                @click="toggleCartSidebar"
                :disabled="errors.length > 0"
              >
                Ir a pagar
              </SfButton>
            </nuxt-link>
            <br>
            <nuxt-link :to="isAuthenticated ? localePath({ name: 'cart' }) : localePath({ name: 'user-account' })" :class="{ disabled: errors.length > 0 }">
              <SfButton
                class="sf-button--full-width color-secondary"
                @click="toggleCartSidebar"
                :disabled="errors.length > 0"
              >
                Ir al carrito
              </SfButton>
            </nuxt-link>
          </div>
          <div v-else>
            <SfButton
              class="sf-button--full-width color-primary"
              @click="toggleCartSidebar"
            >Seguir comprando</SfButton
            >
          </div>
        </transition>
      </template>
    </SfSidebar>
  </div>
</template>
<script>
import {
  SfSidebar,
  SfHeading,
  SfButton,
  SfIcon,
  SfProperty,
  SfPrice,
  SfCollectedProduct,
  SfImage,
  SfQuantitySelector
} from '@storefront-ui/vue';
import { computed } from '@nuxtjs/composition-api';
import { useCart, useUser, cartGetters } from '@vue-storefront/prestashop';
import { useUiState } from '~/composables';
import { onSSR } from '@vue-storefront/core';
import { addBasePath } from '@vue-storefront/core';

export default {
  name: 'Cart',
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfIcon,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfImage,
    SfQuantitySelector
  },
  setup() {
    const { isCartSidebarOpen, toggleCartSidebar } = useUiState();
    const { cart, removeItem, updateItemQty, load: loadCart, loading } = useCart();
    const { isAuthenticated } = useUser();
    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const errors = computed(() => cartGetters.getErrors(cart.value));

    onSSR(async () => {
      await loadCart();
    });

    return {
      addBasePath,
      loading,
      isAuthenticated,
      products,
      removeItem,
      updateItemQty,
      isCartSidebarOpen,
      toggleCartSidebar,
      totals,
      totalItems,
      cartGetters,
      errors
    };
  }
};
</script>

<style lang="scss" scoped>
#cart {
  --sidebar-z-index: 3;
  --overlay-z-index: 3;
  @include for-desktop {
    & > * {
      --sidebar-bottom-padding: var(--spacer-base);
      --sidebar-content-padding: var(--spacer-base);
    }
  }
}
.cart-summary {
  margin-top: var(--spacer-xl);
}
.my-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  &__total-items {
    margin: 0;
  }
  &__total-price {
    --price-font-size: var(--font-size--xl);
    --price-font-weight: var(--font-weight--medium);
    margin: 0 0 var(--spacer-base) 0;
  }
}
.empty-cart {
  --heading-description-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-color: var(--c-primary);
  --heading-title-font-weight: var(--font-weight--semibold);
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  &__banner {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }
  &__heading {
    padding: 0 var(--spacer-base);
  }
  &__image {
    --image-width: 16rem;
    margin: 0 0 var(--spacer-2xl) 7.5rem;
  }
  @include for-desktop {
    --heading-title-font-size: var(--font-size--xl);
    --heading-title-margin: 0 0 var(--spacer-sm) 0;
  }
}
.collected-product-list {
  flex: 1;
}
.collected-product {
  margin: 0 0 var(--spacer-sm) 0;
  &__properties {
    margin: var(--spacer-xs) 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 2;
    &:first-child {
      margin-bottom: 8px;
    }
  }
  &__actions {
    transition: opacity 150ms ease-in-out;
  }
  &__save,
  &__compare {
    --button-padding: 0;
    &:focus {
      --cp-save-opacity: 1;
      --cp-compare-opacity: 1;
    }
  }
  &__save {
    opacity: var(--cp-save-opacity, 0);
  }
  &__compare {
    opacity: var(--cp-compare-opacity, 0);
  }
  &:hover {
    --cp-save-opacity: 1;
    --cp-compare-opacity: 1;
    @include for-desktop {
      .collected-product__properties {
        display: none;
      }
    }
  }
}

.cart-error{
  margin-bottom: 2rem;
  padding: 10px;
  background-color: #ebcccc;
  color: #a94442;
  border-radius: 2px;
}

.disabled {
  pointer-events: none
}

.color-secondary{
  background-color: #0caa91;
}
</style>
