<template>
  <div>
    <LazyHydrate when-visible>
      <TopBarSlider class="desktop-only" />
    </LazyHydrate>

    <AppHeader />

    <div id="layout">
      <nuxt :key="$route.fullPath"/>

      <!-- <BottomNavigation /> -->
      <CartSidebar />
      <WishlistSidebar />
      <LoginModal />
      <Notification />
    </div>
    <LazyHydrate when-visible>
      <AppFooter />
    </LazyHydrate>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue';
import BottomNavigation from '~/components/BottomNavigation.vue';
import AppFooter from '~/components/AppFooter.vue';
import TopBar from '~/components/TopBar.vue';
import TopBarSlider from '~/components/TopBarSlider.vue';
import CartSidebar from '~/components/CartSidebar.vue';
import WishlistSidebar from '~/components/WishlistSidebar.vue';
import LoginModal from '~/components/LoginModal.vue';
import LazyHydrate from 'vue-lazy-hydration';
import Notification from '~/components/Notification';
import { onSSR } from '@vue-storefront/core';
import { useRoute } from '@nuxtjs/composition-api';
import { useCart, useStore, useUser, useWishlist, useBootstrap } from '@vue-storefront/prestashop';

export default {
  name: 'DefaultLayout',

  components: {
    LazyHydrate,
    TopBar,
    TopBarSlider,
    AppHeader,
    BottomNavigation,
    AppFooter,
    CartSidebar,
    WishlistSidebar,
    LoginModal,
    Notification
  },

  setup() {
    const route = useRoute();
    const { load: loadStores } = useStore();
    const { load: loadUser } = useUser();
    const { load: loadCart } = useCart();
    const { load: loadWishlist } = useWishlist();

    const {
      boot: boot
    } = useBootstrap();

    onSSR(async () => {
      await Promise.all([
        boot(),
        loadStores(),
        loadUser(),
        loadCart(),
        loadWishlist()
      ]);
    });

    return {
      route
    };
  }
};
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";

#layout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 100%;
    margin: auto;
  }
}

.no-scroll {
  overflow: hidden;
  height: 100vh;
}

// Reset CSS
html {
  width: auto;
  @include for-mobile {
    overflow-x: hidden;
  }
}
body {
  overflow-x: hidden;
  color: var(--c-text);
  font-size: var(--font-size--base);
  font-family: var(--font-family--primary);
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: var(--c-link);
  &:hover {
    color: var(--c-link-hover);
  }
}
h1 {
  font-family: var(--font-family--secondary);
  font-size: var(--h1-font-size);
  line-height: 1.6;
  margin: 0;
}
h2 {
  font-family: var(--font-family--secondary);
  font-size: var(--h2-font-size);
  line-height: 1.6;
  margin: 0;
}
h3 {
  font-family: var(--font-family--secondary);
  font-size: var(--h3-font-size);
  line-height: 1.6;
  margin: 0;
}
h4 {
  font-family: var(--font-family--secondary);
  font-size: var(--h4-font-size);
  line-height: 1.6;
  margin: 0;
}

.sf-overlay{
  background: #1d1d1b4f !important;
}


.sf-modal__close {
  margin-top: auto;
  margin-bottom: auto;
  padding-top: 4%;
  padding-right: 8%;
}

.sf-modal__container{
  padding: 1rem;
  width: 33rem;
  border-radius: 25px;
  z-index: 9999;
}

nav .sf-modal__container{
  border-radius: unset;
  width: 80%;
}

.sf-modal__container .sf-input input{
  background: #F2F2F2;
  border: unset;
  border-radius: 15px;
  padding: 1rem;
}



.sf-modal__container .sf-input input::placeholder{
  padding: 1rem;
}

.form form span .form__element input{
  background: #F2F2F2;
    padding: 13px;
    border: unset;
    border-radius: 15px;
}

.form form span .form__element .sf-input__wrapper{
  margin: 0;
}

.modal .sf-input__wrapper{
  overflow: hidden;
  border-radius: 10px;
}

.sf-header__navigation{
  margin: 0;
}

.sf-search-bar{
  max-width: 500px;
}

.sf-header__actions{
  justify-content: space-around;
}

.items-listing.container{
  margin-left: 10px;
}

@media(max-width: 1020px){
  .sf-modal__container{
    width: 100%;
  }
}

.carousel-counter .carousel-counter-logo{
  width: 65%;
  justify-content: start;
  display: flex;
    
}

.carousel-counter .carousel-counter-logo img{
    width: 30%;
    text-align: start;
    margin-top: 1rem;
}

.sf-add-to-cart__select-quantity{
  border-radius: 25px;
  width: 35%;
  background: #fff;
  border: 1px solid;
}
.sf-quantity-selector__button{
  width: 35%;
  font-weight: bold;
}

.sf-quantity-selector__input{
  width: 30%;
}

#category .sf-accordion {
  border-top: 1px solid #333333;
}

#category .sf-accordion .sf-accordion-item{
  border-bottom: none;
}

#category .sf-accordion .sf-accordion-item button{
  padding: 2px;
  justify-content: start;
}

#category .sf-accordion-item__chevron, .sf-chevron--righ{
  text-align: end;
    margin-left: auto;
}

#category .sf-chevron__bar:after{
 background: #0caa91; 
}

.cart-content .sf-collected-product__quantity-wrapper{
  display: none;
}

.cart-content .sf-collected-product__main{
  display: none;
}

img{
    outline-color: unset !important;
    outline-width: unset !important;
    outline-style: unset !important;
}

.cart-content .sf-collected-product__quantity-selector{
  background: #fff;
    border: 2px solid #0caa91;
    border-radius: 25px;
    width: 80%;
}



.cart-content .sf-quantity-selector__button, .cart-content .sf-input input[type=number]{
    font-size: 24px;
    color: #0caa91;
    font-weight: bolder;
}

.sf-steps__header{
    height: 60px;
    margin-top: -60px;
    background: #009688;
}

.sf-steps__title{
  color: #fff;
}

.sf-collected-product__remove--circle-icon{
  display: none !important;
}

#cart .sf-image{
  width: 60%;
}

#cart .sf-collected-product__image{
  background: none;
    justify-content: center;
    align-items: center;
    display: flex;
}

.sf-accordion-item__header.is-open {
    --accordion-item-header-border-width: 0;
    --accordion-item-header-color: #0caa91;
    --chevron-color: #0caa91;
}

#category .sf-accordion-item__content{
  padding: 10px 5px;
}

.sf-product-card__title{
  font-weight: bold;
    color: #808080;
    font-size: 12px;
}

.sf-product-card__pr{
  text-align: start;
  justify-content: start;
  margin: 0;
  flex-direction: column-reverse;
}

.sf-price__old{
  text-align: start;
  width: 100%;
  margin-right: -2px;
  font-size: 10px;
  text-decoration: none;
  color: #7f7f7f;
  font-weight: 600;
}

.sf-price__special{
  text-align: start;
    width: 100%;
    margin: 0;
    padding: 0;
}

.sf-price__regular{
  color: #009688;
    font-weight: bold;
    font-size: 15px;
}

.sf-menu-item.is-active{
  color: #009688 !important;
}

.form__button{
  background: #009688;
}

.container_menu_bottom .sf-bottom-navigation{
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 2rem;
  background-color: #0caa91;
  background: #0caa91;
}

.menu-item-img .sf-menu-item__mobile-nav-icon{
    display: none !important;
  }

  .sf-menu-item:hover{
    color: #0caa91 !important;
    --menu-item-label-color:#0caa91;
  }

  .sf-footer__container{
    margin: 0;
  }

  .sf-input input:focus ~ *, .sf-input input:placeholder-shown ~ *, .sf-input input:-webkit-autofill ~ *, .sf-input input:-webkit-autofill:hover ~ *, .sf-input input:-webkit-autofill:focus ~ * {
    --icon-color: #0caa91;
    --input-password-icon-background: #0caa91;
    --input-label-top: 0;
    --input-label-color: #0caa91;
    --input-label-font-size: var(--font-size--xs);
    --input-bar-width: 50%;
    --input-error-message-color: #0caa91;
}

.sf-tabs__title.is-active {
    --tabs-title-border-width: 0;
    --tabs-title-color: #0caa91;
    --chevron-color: #0caa91;
}

.sf-menu-item.is-active {
    --menu-item-label-color: #0caa91;
}

.sf-button.color-primary {
    --button-background: #0caa91;
}

.empty-cart[data-v-31930aca] {
    --heading-description-margin: 0 0 var(--spacer-xl) 0;
    --heading-title-margin: 0 0 var(--spacer-xl) 0;
    --heading-title-color: #0caa91;
    --heading-title-font-weight: var(--font-weight--semibold);
    display: flex;
    flex: 1;
    align-items: center;
    flex-direction: column;
}

.form__action-button, .no-orders__button{
  background: #0caa91;
}

#checkout .sf-button{
  background: #0caa91;
}

.topbar .sf-carousel__controls{
  display: none;
}

.sf-circle-icon{
  background: #0caa91;
  --button-background: #0caa91;
  --button-box-shadow: 0 0 0 0.3125rem #0caa91;
  bottom: 15% !important;

}

.sf-product-card__wishlist-icon{
  display: none;
}

.sf-product-card__image-wrapper{

    height: 260px;
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-direction: column;
    align-items: start;

}

.sf-product-card__badge{
  bottom: 0;
  top: auto;
  padding: 2px 5px;
  background: #0caa91;
}

.image-grow, .image-smoke, .image-semillas, .image-extractores{
    border-bottom: 1px solid #333333 !important;
  }

.sf-product-card__price{
  text-align: start;
  flex-direction: column-reverse;
}

.sf-price__special{
  color: #0caa91;
  font-weight: 600;
  width: 100%;
  text-align: start;
}

#category .sidebar{
    padding: 0px;
    border-radius: 5px;
    border: 1px solid #333333;
    margin-top: 10px;
    height: 100%;
  }

  .products__product-card{
    border: 1px solid rgba(128, 128, 128, 0.18824);
    margin: 10px;
}

.loading--categories{
  height: 70vh;
}

.sf-price__regular{
  width: 100%;
  text-align: start;
}

.products__pagination{
  justify-content: end !important;
  margin: 4rem 2rem !important;
}

#related{
  margin-top: 5rem;
  border-top: 5rem solid #F2F2F2;
}

#related .carousel{
  width: 75%;
  margin: 0 auto !important;
}


#related .carousel {
  margin: 0 calc(0 - var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;
  }
  &__item {
    margin: 1.375rem 0 2.5rem 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
    }
    &__product {
      --product-card-add-button-transform: translate3d(0, 30%, 0);
    }
  }
  ::v-deep .sf-arrow--long .sf-arrow--right {
    --arrow-icon-transform: rotate(180deg);
    -webkit-transform-origin: center;
    transform-origin: center;
  }
}


#category .similar-products, #related .similar-products{
  display: flex;
  justify-content: center;
  align-items: center;

  --heading-padding: 0;
  padding-top: 5rem !important;
  padding-bottom: 5rem !important;

  border-bottom: 1px var(--c-light) solid;
  @include for-desktop {
    border-bottom: 0;
    justify-content: center;
    padding-bottom: 0;
  }

  h2{
    color: #808080 !important;
    font-weight: 500 !important;
  }
}

</style>
