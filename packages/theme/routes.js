const path = require('path');

export function getRoutes(themeDir = __dirname) {
  return [{
    name: 'home',
    path: '/',
    component: path.resolve(themeDir, 'pages/Home.vue')
  },
  {
    name: 'product',
    path: '/p/:id/:slug/',
    component: path.resolve(themeDir, 'pages/Product.vue')
  },
  {
    name: 'category',
    path: '/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?',
    component: path.resolve(themeDir, 'pages/Category.vue')
  },
  {
    name: 'brand',
    path: '/marcas/:slug_1/',
    component: path.resolve(themeDir, 'pages/Brand.vue')
  },
  {
    name: 'search',
    path: '/resultados/:slug_1/',
    component: path.resolve(themeDir, 'pages/ResultadosBusqueda.vue')
  },
  {
    name: 'productos-rebajados',
    path: '/productos-rebajados',
    component: path.resolve(themeDir, 'pages/ProductosRebajados.vue')
  },
  {
    name: 'productos-nuevos',
    path: '/productos-nuevos',
    component: path.resolve(themeDir, 'pages/ProductosNuevos.vue')
  },
  {
    name: 'brands',
    path: '/marcas',
    component: path.resolve(themeDir, 'pages/Brand.vue')
  },
  {
    name: 'my-account',
    path: '/my-account/:pageName?',
    component: path.resolve(themeDir, 'pages/MyAccount.vue')
  },
  {
    name: 'nosotros',
    path: '/nosotros',
    component: path.resolve(themeDir, 'pages/Nosotros.vue')
  },
  {
    name: 'contacto',
    path: '/contacto',
    component: path.resolve(themeDir, 'pages/Contacto.vue')
  },
  {
    name: 'como-comprar',
    path: '/como-comprar',
    component: path.resolve(themeDir, 'pages/ComoComprar.vue')
  },
  {
    name: 'registration',
    path: '/registro',
    component: path.resolve(themeDir, 'pages/Register.vue')
  },
  {
    name: 'login',
    path: '/ingresar',
    component: path.resolve(themeDir, 'pages/Login.vue')
  },
  {
    name: 'categories',
    path: '/categorias',
    component: path.resolve(themeDir, 'pages/Categories.vue')
  },
  {
    name: 'cart',
    path: '/carrito',
    component: path.resolve(themeDir, 'pages/cartPage.vue')
  },
  {
    name: 'checkout',
    path: '/checkout',
    component: path.resolve(themeDir, 'pages/Checkout.vue'),
    children: [
      {
        path: 'user-account',
        name: 'user-account',
        component: path.resolve(themeDir, 'pages/Checkout/UserAccount.vue')
      },
      {
        path: 'shipping',
        name: 'shipping',
        component: path.resolve(themeDir, 'pages/Checkout/Shipping.vue')
      },
      {
        path: 'payment',
        name: 'payment',
        component: path.resolve(themeDir, 'pages/Checkout/Payment.vue')
      },
      {
        path: 'thank-you',
        name: 'thank-you',
        component: path.resolve(themeDir, 'pages/Checkout/ThankYou.vue')
      }
    ]
  },
  {
    name: 'reset-password',
    path: '/reset-password',
    component: path.resolve(themeDir, 'pages/ResetPassword.vue')
  }
  ];
}
