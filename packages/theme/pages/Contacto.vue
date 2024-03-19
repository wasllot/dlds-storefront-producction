<template>
  <div id="nosotros">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />

    <div class="page-title">
      <h2>Contacto</h2>
    </div>

    <div class="page-content">

      <form class="flex flex-col gap-y-4 text-neutral-900">
        <h3 class="font-bold typography-headline-4 md:typography-headline-3">Contacto</h3>
        <div class="gap-y-0.5 label">
          <label class="gap-y-0.5 ">
            <span class="text-sm font-medium">Correo</span>
            <SfInput
              v-model="value"
              name="email"
              placeholder="email address"
              :invalid="invalid"
              auto-complete="email"
            />
          </label>
          <p v-if="invalid" class="typography-error-sm text-negative-700 font-medium mt-0.5">
            Correo invalido
          </p>
        </div>
        <label class="flex flex-col gap-y-0.5 label">
          <span class="font-medium typography-text-sm">Telefono</span>
          <div class="flex">
            <SfSelect name="phone-country-code" class="w-16 mr-4" placeholder="--" auto-complete="tel-country-code">
              <option v-for="option in options" :key="option" :value="option">
                {{ option }}
              </option>
              ))}
            </SfSelect>
            <SfInput
              name="phone-national"
              wrapper-class="w-full"
              type="tel"
              input-mode="tel"
              auto-complete="tel-national"
            />
          </div>
        </label>
        <div class="flex justify-between gap-4 md:justify-end">
          <SfButton class="w-full md:w-auto" type="reset" variant="secondary">Limpiar </SfButton>
          <SfButton class="w-full md:w-auto" type="submit">Guardar</SfButton>
        </div>
      </form>
       
    </div>


  </div>
</template>
<script>
import { SfBreadcrumbs, SfContentPages, SfCarousel, SfArrow, SfProductCard, SfHeading, SfInput, SfButton, SfSelect } from '@storefront-ui/vue';
import { computed, onBeforeUnmount, useRoute, useRouter } from '@nuxtjs/composition-api';
import { useUser } from '@vue-storefront/prestashop';
import MyProfile from './MyAccount/MyProfile';
import Addresses from './MyAccount/Addresses';
import BillingDetails from './MyAccount/BillingDetails';
import MyNewsletter from './MyAccount/MyNewsletter';
import OrderHistory from './MyAccount/OrderHistory';
import LazyHydrate from 'vue-lazy-hydration';
import { useUiNotification } from '~/composables';
import {
  mapMobileObserver,
  unMapMobileObserver
} from '@storefront-ui/vue/src/utilities/mobile-observer.js';

import {
  useProduct,
  productGetters,
  useCart
} from '@vue-storefront/prestashop';

import { ref } from 'vue';

export default {
  name: 'Nosotros',
  components: {
    SfBreadcrumbs,
    SfContentPages,
    MyProfile,
    Addresses,
    BillingDetails,
    MyNewsletter,
    OrderHistory,
    SfCarousel,
    SfArrow,
    SfProductCard,
    LazyHydrate,
    SfHeading,
    SfInput, 
    SfButton, 
    SfSelect
  },
  middleware: [
    'is-authenticated'
  ],
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();

    const { logout } = useUser();
    const isMobile = computed(() => mapMobileObserver().isMobile.get());
    const activePage = computed(() => {
    const { pageName } = route.value.params;

    const invalid = ref(true);
    const options = [1, 7, 20, 27, 30, 30, 31, 32, 33, 34, 36, 39, 40, 41, 43, 44, 45, 46, 47, 48, 49, 51];
    const emailRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const value = ref('');

      if (pageName) {
        return (pageName.charAt(0).toUpperCase() + pageName.slice(1)).replace('-', ' ');
      } else if (!isMobile.value) {
        return 'My profile';
      } else {
        return '';
      }
    });

    const changeActivePage = async (title) => {
      if (title === 'Log out') {
        await logout();
        router.push(context.root.localePath({ name: 'home' }));
        return;
      }

      const slugifiedTitle = (title || '').toLowerCase().replace(' ', '-');
      const transformedPath = `/my-account/${slugifiedTitle}`;
      const localeTransformedPath = context.root.localePath(transformedPath);

      router.push(localeTransformedPath);
    };

    onBeforeUnmount(() => {
      unMapMobileObserver();
    });

    const toggleWishlist = (index) => {
      products.value[index].isInWishlist = !products.value[index].isInWishlist;
    };

    const {
      products: featureProducts,
      search: productsSearch,
      loading: productsLoading
    } = useProduct('relatedProducts');

    const { send: sendNotification } = useUiNotification();
    const { addItem: addItemToCart, isInCart } = useCart();

    return {       
      sendNotification,
      isInCart,
      addItemToCart,
      changeActivePage,
      productGetters,
      productsLoading,
      toggleWishlist,
      activePage};
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
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Inicio',
          route: { link: '#' }
        },
        {
          text: 'Sobre nosotros',
          route: { link: '#' }
        }
      ]
    };
  }
};
</script>

<style lang='scss' scoped>
#nosotros {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.my-account {
  @include for-mobile {
    --content-pages-sidebar-category-title-font-weight: var(
      --font-weight--normal
    );
    --content-pages-sidebar-category-title-margin: var(--spacer-sm)
      var(--spacer-sm) var(--spacer-sm) var(--spacer-base);
  }
  @include for-desktop {
    --content-pages-sidebar-category-title-margin: var(--spacer-xl) 0 0 0;
  }
}

.similar-products{
  margin-top: 2rem;
}
.breadcrumbs {
  margin: var(--spacer-base) 0 var(--spacer-lg);
}

.page-title{
  background-color: #0CAA91;
  padding: 5px;
  width: 100%;
  margin-bottom: 20px;
}

.page-title h2{
  font-size: 15px;
  color: #fff;
}

.page-content{
  display: flex;
  text-align: center;
  padding-top: 2rem;
}

.page-content .page-content-image{
  width: 50%;
  padding: 10px;
}
.page-content .page-content-image img{
  width: 100%;
  
}
.page-content .page-content-text{
  width: 50%;
  padding: 0 10px;
}

.page-content .page-content-item{
  margin-bottom: 10px;
  width: 20%;
  padding: 10px;
}

.page-content .page-content-item h3, .page-content .page-content-item h4{
  color: #8c8c8c;
  font-weight: 400;
}

.page-content .page-content-item p{
  color: #0caa91;
}

.page-content .page-content-item img{
  height: 50px;
}

.page-content .page-content-text .page-content-item h3{
  color: #0CAA91;
  text-transform: capitalize;
  font-size: 15px;
}

.page-content .page-content-text .page-content-item p{
  color: #000;
  font-size: 13px;
  font-weight: 500;
  text-align: justify;
}

.carousel__item{
  text-align: center;
  justify-content: center;

}


.carousel__item .carousel__item__product{
  border: 2px solid #eee;

}
.carousel__item img{
  margin-bottom: 10px;
}

#nosotros .carousel-cats .glide__track{
    background: #f7f7f7;
    border-radius: 15px;
}

#nosotros .carousel{
  margin-top: 2rem;
}

.sf-arrow--long, .sf-arrow{
background-color: #2F9393;
}

.page-content .page-content-image img{
    width: 50%;
    
}

.page-content-item-block{
  text-align: center;
}

.page-content form{
  width: 50%;
    margin: 0 auto;
}

 .label{
  text-align: start !important;
  display: block;
  padding-bottom: 1rem;
}

.page-content-item-block h3{
  color: #8c8c8c;
  font-size: 20px;
  text-align: center;
  font-weight:400;
}

.page-content-item-block p{
  color: #2F9393;
  font-size: 15px;
  text-align: center;
  padding-bottom: 1rem;
}

.page-content-item-block a{
  background: #2F9393;
  padding: 10px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  color: #fff;
  text-align: center;
  font-size: 20px;
  text-transform: uppercase;
}

@media(max-width: 720px){

  .page-content{
    flex-direction: column;
  }

  .page-content .page-content-image{
    width: 100%;
    padding: 10px;
    margin-bottom: 1rem;
    max-width: fit-content;
  }

  .page-content .page-content-text{
    width: 100%;
    padding: 10px;
    max-width: fit-content;
  }

  .page-content .page-content-item{
    margin-bottom: 10px;
    width: 100%;
    padding: 10px;
  }

}

</style>
