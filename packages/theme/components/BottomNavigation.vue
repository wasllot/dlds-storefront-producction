<template>
  <!-- TODO: create logic with isActive prop for BottomNavigationItems -->
  <SfBottomNavigation class="navigation-bottom smartphone-only">
    <div>
      <SfButton class="sf-button--pure sf-header__action">
        <template>
          <SfIcon
            icon="list"
            size="lg"
            color="#fff"
            viewBox="0 0 24 24"
            :coverage="1"
            @click="toggleMobileMenu"
            
          />
        </template>
      </SfButton>
    </div>
    <div class="cart-account">
      <SfButton
            class="sf-button--pure sf-header__action my-account"
            color="#2f9393"
            aria-label="Ir a mi cuenta"
            @click="handleAccountClick"
          >
            <SfIcon
              :icon="accountIcon"
              color="#fff"
              size="30px"
            />
      </SfButton>
      
      <SfButton
          
          class="sf-button--pure sf-header__action cart-button"
          aria-label="Toggle cart sidebar"
          @click="toggleCartSidebar"
        >
          <SfIcon
            class="sf-header__icon"
            icon="empty_cart"
            color="#fff"
            size="30px"
          />
          <SfBadge v-if="cartTotalItems" class="sf-badge--number cart-badge">{{cartTotalItems}}</SfBadge>
      </SfButton>
    </div>

  </SfBottomNavigation>
</template>

<script>
import { SfBottomNavigation, SfIcon, SfCircleIcon, SfBadge, SfButton } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { useUser, useCart, cartGetters } from '@vue-storefront/prestashop';
import { computed, useRoute, useRouter } from '@nuxtjs/composition-api';

export default {
  components: {
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon,
    SfBadge,
    SfButton
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal, toggleMobileMenu, isMobileMenuOpen } = useUiState();
    const { isAuthenticated } = useUser();
    const { cart } = useCart();
    const accountIcon = computed(() => isAuthenticated.value ? 'profile_fill' : 'profile');

    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        return router.push('/my-account');
      }
      toggleLoginModal();
    };

    const handleHomeClick = () => {
      isMobileMenuOpen.value ? toggleMobileMenu() : false;
      router.push('/');
    };

    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);

      return count ? count.toString() : null;
    });

    return {
      route,
      isMobileMenuOpen,
      toggleWishlistSidebar,
      toggleCartSidebar,
      toggleMobileMenu,
      cartTotalItems,
      handleAccountClick,
      handleHomeClick,
      accountIcon
    };
  }
};
</script>
<style lang="scss" scoped>
.navigation-bottom {
  --bottom-navigation-z-index: 3;
}
.cart-button {
  position: relative;
}
.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
}

.my-account{
  margin-right: 15px !important;
}

.cart-button{
  margin: 0;
}

.cart-account{
  display: flex;
}

.sf-header__action{
  margin: 0;
}
</style>
