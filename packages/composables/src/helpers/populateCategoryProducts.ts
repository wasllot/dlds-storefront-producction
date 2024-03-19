// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const populateCategoryProducts = (psProducts: Array<any>) => {
  return psProducts.map((product) => ({
    id: product.id_product,
    name: product.name,
    slug: product.link_rewrite,
    regularPrice: product.regular_price_amount?product.regular_price_amount:product.price,
    discountPrice: product.price_drop == 'null'? 0:product.price_drop,
    coverImageSmall: product.cover,
    coverImageMedium: product.cover,
    coverImageLarge: product.cover,
    images: [],
    description: null,
    shortDescription: null,
    brand: product.brand_name,
    category: null,
    productInfo: null,
    quantity: product.quantity,
    cover: product.cover,
    percentage: product.reduction? product.reduction: ''
  }));
};

export default populateCategoryProducts;
