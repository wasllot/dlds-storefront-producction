// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const populateCategoryProducts = (psProducts: Array<any>) => {
  return psProducts.map((product) => ({
    id: product.id_product,
    name: product.name,
    slug: product.link_rewrite,
    regularPrice: product.regular_price_amount?product.regular_price_amount:product.price,
    discountPrice: product.price_amount? product.price_amount:product.price_drop,
    coverImageSmall: product.cover.url?product.cover.url:product.cover,
    coverImageMedium: product.cover.url?product.cover.url:product.cover,
    coverImageLarge: product.cover.large?product.cover.large.url:product.cover,
    images: [],
    description: null,
    shortDescription: null,
    brand: null,
    category: null,
    productInfo: null,
    quantity: product.quantity,
    cover: product.cover
  }));
};

export default populateCategoryProducts;
